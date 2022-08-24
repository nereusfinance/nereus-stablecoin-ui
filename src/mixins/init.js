import poolsInfo from "@/utils/contracts/pools.js";
import masterContractInfo from "@/utils/contracts/master.js";
import oracleContractsInfo from "@/utils/contracts/oracle.js";
import whitelistContractInfo from "@/utils/contracts/whitelistManager";
import MulticallContractInfo from "@/utils/contracts/Multicall";

export default {
  computed: {
    chainId() {
      return this.$store.getters.getChainId;
    },
    signer() {
      return this.$store.getters.getSigner;
    },
    account() {
      return this.$store.getters.getAccount;
    },
  },
  methods: {
    async initBlockRefresh() {
      const provider = this.$store.getters.getProvider;
      const blockNumber = await provider.getBlockNumber();
      this.$store.commit("setBlockNumber", blockNumber);

      const timeout = process.env.BLOCK_REFRESH_TIMEOUT;
      provider.once("block", () => {
        setTimeout(() => this.initBlockRefresh(), timeout);
      });
    },
    async initContracts() {
      const chainMasterContract = masterContractInfo.find(
        (contract) => contract.contractChain === this.chainId
      );
      if (!chainMasterContract) {
        console.log("No master Contract");
        return false;
      }
      this.createMulticall();
      const masterContract = new this.$ethers.Contract(
        chainMasterContract.address,
        JSON.stringify(chainMasterContract.abi),
        this.signer
      );

      const masterContractInterface = new this.$ethers.utils.Interface(
        chainMasterContract.abi
      );
      await this.initPools(masterContract, masterContractInterface);
    },

    async initPools(masterContract, masterContractInterface) {
      const chainPools = poolsInfo.filter(
        (pool) => pool.contractChain === this.chainId
      );
      const pools = await Promise.all(
        chainPools.map((pool) =>
          this.initPool(pool, masterContract, masterContractInterface)
        )
      );

      this.$store.commit("setPools", pools);
    },

    createMulticall() {
      const MulticallContractInfoByChainId = MulticallContractInfo.find(
        (contract) => contract.contractChain === this.chainId
      );
      const multicallContract = new this.$ethers.Contract(
        MulticallContractInfoByChainId.address,
        JSON.stringify(MulticallContractInfoByChainId.abi),
        this.signer
      );

      this.$store.commit("setMulticallContract", multicallContract);
    },
    createWhitelistManager(address) {
      const whitelistContract = new this.$ethers.Contract(
        address,
        JSON.stringify(whitelistContractInfo.abi),
        this.signer
      );
      return whitelistContract;
    },
    /**
     * Creates pool token contract instance
     * @param {*pool address} pool
     * @returns contract instance and it's ABI Interface
     */
    createPoolTokenContract(pool) {
      const tokenContract = new this.$ethers.Contract(
        pool.token.address,
        JSON.stringify(pool.token.abi),
        this.signer
      );

      const tokenContractInterface = new this.$ethers.utils.Interface(
        pool.token.abi
      );

      return {
        tokenContract,
        tokenContractInterface,
      };
    },
    /**
     * Creates pool pair token contract instance (NXUSD)
     * @param {*pool address} pool
     * @returns contract instance and it's ABI Interface
     */
    createPoolPairToken(pool) {
      const pairTokenContract = new this.$ethers.Contract(
        pool.pairToken.address,
        JSON.stringify(pool.pairToken.abi),
        this.signer
      );
      // NXUSD token interface
      const pairTokenContractInterface = new this.$ethers.utils.Interface(
        pool.pairToken.abi
      );

      return {
        pairTokenContract,
        pairTokenContractInterface,
      };
    },
    /**
     * Creates pool swap contract instance
     * @param {*pool address} pool
     * @returns contract instance and it's ABI Interface
     */
    createSwapContract(pool) {
      const swapContract = new this.$ethers.Contract(
        pool.swapContractInfo.address,
        JSON.stringify(pool.swapContractInfo.abi),
        this.signer
      );

      const swapContractInterface = new this.$ethers.utils.Interface(
        pool.swapContractInfo.abi
      );

      return {
        swapContract,
        swapContractInterface,
      };
    },
    /**
     * Creates pool reverse swap contract instance
     * @param {*pool address} pool
     * @returns contract instance and it's ABI Interface
     */
    createReverseSwapContract(pool) {
      const reverseSwapContract = new this.$ethers.Contract(
        pool.reverseSwapContractInfo.address,
        JSON.stringify(pool.reverseSwapContractInfo.abi),
        this.signer
      );

      const reverseSwapContractInterface = new this.$ethers.utils.Interface(
        pool.reverseSwapContractInfo.abi
      );

      return {
        reverseSwapContract,
        reverseSwapContractInterface,
      };
    },
    /**
     * Creates pool token oracle contract instance
     * @param {*pool address} pool
     * @returns contract instance and it's ABI Interface
     */
    createOracleContract(pool) {
      const oracleContractInfo = oracleContractsInfo.find(
        (item) => item.id === pool.token.oracleId
      );

      const oracleContract = new this.$ethers.Contract(
        oracleContractInfo.address,
        JSON.stringify(oracleContractInfo.abi),
        this.signer
      );
      const oracleContractInterface = new this.$ethers.utils.Interface(
        oracleContractInfo.abi
      );

      return {
        oracleContract,
        oracleContractInterface,
      };
    },
    async initPool(pool, masterContract, masterContractInterface) {
      const poolContract = new this.$ethers.Contract(
        pool.contract.address,
        JSON.stringify(pool.contract.abi),
        this.signer
      );
      const poolContractInterface = new this.$ethers.utils.Interface(
        pool.contract.abi
      );
      pool.isEnabled = true;
      if (pool.name === "WXT") {
        const whitelistContract = this.createWhitelistManager(
          pool.whitelistManager
        );
        pool.isEnabled = (await whitelistContract.info(this.account)).isAllowed;
      }

      const poolTokenInfo = this.createPoolTokenContract(pool);
      const pairTokenInfo = this.createPoolPairToken(pool);
      const swapContractInfo = this.createSwapContract(pool);
      const reverseSwapContractInfo = this.createReverseSwapContract(pool);
      const oracleContractInfo = this.createOracleContract(pool);

      return {
        name: pool.name,
        id: pool.id,
        isEnabled: pool.isEnabled,
        contractInstance: poolContract,
        contractInterface: poolContractInterface,
        oracleInstance: oracleContractInfo.oracleContract,
        oracleInterface: oracleContractInfo.oracleContractInterface,
        masterContractInstance: masterContract,
        masterContractInterface,
        stabilityFee: pool.stabilityFee,
        interest: pool.interest,
        ltv: pool.ltv,
        initialMax: pool.initialMax,
        pairToken: pool.pairToken,
        pairTokenContract: pairTokenInfo.pairTokenContract,
        pairTokenContractInterface: pairTokenInfo.pairTokenContractInterface,
        token: {
          contract: poolTokenInfo.tokenContract,
          contractInterface: poolTokenInfo.tokenContractInterface,
          name: pool.token.name,
          address: pool.token.address,
          decimals: pool.token.decimals,
          oracleId: pool.token.oracleId,
          oracleDatas: pool.token.oracleDatas,
        },
        swapContract: swapContractInfo.swapContract,
        reverseSwapContract: reverseSwapContractInfo.reverseSwapContract,
      };
    },
  },
};
