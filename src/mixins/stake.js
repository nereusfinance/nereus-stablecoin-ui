import NXUSDStakingContractInfo from "@/utils/contracts/NXUSDStaking";
import MulticallContractInfo from "@/utils/contracts/Multicall";
import NXUSDStakingCalculationInfo from "@/utils/contracts/NXUSDStakingCalculation";
import MultiFeeDistributionInfo from "@/utils/contracts/MultiFeeDistribution";

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
    createNXUSDStaking() {
      const NXUSDStakingContractInfoByChainId = NXUSDStakingContractInfo.find(
        (contract) => contract.contractChain === this.chainId
      );
      const nxusdStakingContract = new this.$ethers.Contract(
        NXUSDStakingContractInfoByChainId.address,
        JSON.stringify(NXUSDStakingContractInfoByChainId.abi),
        this.signer
      );

      const nxusdStakingInterface = new this.$ethers.utils.Interface(
        NXUSDStakingContractInfoByChainId.abi
      );

      this.$store.commit("setNXUSDStakingInterface", nxusdStakingInterface);
      this.$store.commit("setNXUSDStakingContract", nxusdStakingContract);

      return nxusdStakingContract;
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

      return multicallContract;
    },
    createNXUSDStakingCalculation() {
      const NXUSDStakingCalculationInfoByChainId =
        NXUSDStakingCalculationInfo.find(
          (contract) => contract.contractChain === this.chainId
        );

      const nxusdStakingCalculationContract = new this.$ethers.Contract(
        NXUSDStakingCalculationInfoByChainId.address,
        JSON.stringify(NXUSDStakingCalculationInfoByChainId.abi),
        this.signer
      );

      const nxusdStakingCalculationInterface = new this.$ethers.utils.Interface(
        NXUSDStakingCalculationInfoByChainId.abi
      );

      this.$store.commit(
        "setNXUSDStakingCalculationInterface",
        nxusdStakingCalculationInterface
      );
      this.$store.commit(
        "setNXUSDStakingCalculationContract",
        nxusdStakingCalculationContract
      );

      return nxusdStakingCalculationContract;
    },
    createMultiFeeDistribution() {
      const MultiFeeDistributionInfoByChainId = MultiFeeDistributionInfo.find(
        (contract) => contract.contractChain === this.chainId
      );

      const multiFeeDistributionContract = new this.$ethers.Contract(
        MultiFeeDistributionInfoByChainId.address,
        JSON.stringify(MultiFeeDistributionInfoByChainId.abi),
        this.signer
      );

      this.$store.commit(
        "setMultiFeeDistributionContract",
        multiFeeDistributionContract
      );

      return multiFeeDistributionContract;
    },

    async getAllParameters() {
      this.createNXUSDStaking();
      this.createMulticall();
      this.createNXUSDStakingCalculation();
      this.createMultiFeeDistribution();

      const account = this.$store.getters.getAccount;
      const NXUSDStakingInterface =
        this.$store.getters.getNXUSDStakingInterface;
      const NXUSDStakingAddress =
        this.$store.getters.getNXUSDStakingContract.address;

      const configCurrentVersion = await this.$store.dispatch(
        "checkConfigCurrentVersion"
      );

      console.log("NXUSDStakingInterface", NXUSDStakingInterface);
      console.log(
        "this.$store.getters.getNXUSDStakingCalculationInterface",
        this.$store.getters.getNXUSDStakingCalculationInterface
      );

      const funcAndArgs = [
        {
          function: "userData",
          arguments: [account],
          target: NXUSDStakingAddress,
          interface: NXUSDStakingInterface,
        },
        {
          function: "getAPYDataConfig",
          arguments: [configCurrentVersion],
          target: NXUSDStakingAddress,
          interface: NXUSDStakingInterface,
        },
        {
          function: "config",
          arguments: [configCurrentVersion],
          target: NXUSDStakingAddress,
          interface: NXUSDStakingInterface,
        },
        {
          function: "getWXTLockBalance",
          arguments: [account],
          target: NXUSDStakingAddress,
          interface: NXUSDStakingInterface,
        },
        {
          function: "historyUserRewards",
          arguments: [account],
          target: NXUSDStakingAddress,
          interface: NXUSDStakingInterface,
        },
        {
          function: "getUserRewards",
          arguments: [account],
          target: NXUSDStakingAddress,
          interface: NXUSDStakingInterface,
        },
        {
          function: "calculateTableRewards",
          arguments: [account, [86400, 604800, 2629746, 31556952]],
          target:
            this.$store.getters.getNXUSDStakingCalculationContract.address,
          interface: this.$store.getters.getNXUSDStakingCalculationInterface,
        },
      ];

      const callData = funcAndArgs.map((item) => {
        return {
          target: item.target,
          callData: item.interface.encodeFunctionData(
            item.function,
            item.arguments
          ),
        };
      });

      const tryAggregate =
        await this.$store.getters.getMulticallContract.callStatic.tryAggregate(
          true,
          callData
        );

      for (let i = 0; i < tryAggregate.length; i++) {
        const result = funcAndArgs[i].interface.decodeFunctionResult(
          funcAndArgs[i].function,
          tryAggregate[i].returnData
        );
        if (funcAndArgs[i].function === "userData") {
          this.$store.commit("setUserData", result);
        } else if (funcAndArgs[i].function === "getAPYDataConfig") {
          this.$store.commit("setAPYDataConfig", result[0]);
        } else if (funcAndArgs[i].function === "config") {
          this.$store.commit("setConfig", result);
        } else if (funcAndArgs[i].function === "getWXTLockBalance") {
          this.$store.commit("setUserWXTLock", result[0]);
        } else if (funcAndArgs[i].function === "historyUserRewards") {
          this.$store.commit("setHistoryUserRewards", result);
        } else if (funcAndArgs[i].function === "getUserRewards") {
          this.$store.commit("setUserCurrentRewards", result);
        } else if (funcAndArgs[i].function === "calculateTableRewards") {
          this.$store.commit("setTableRewards", result[0]);
        }
      }

      // await this.$store.dispatch("checkUserData");
      //
      // await this.$store.dispatch("getAPYDataConfig", configCurrentVersion);
      //
      // await this.$store.dispatch("getConfig", configCurrentVersion);
      //
      // await this.$store.dispatch("checkUserWXTLock");
      //
      // await this.$store.dispatch("checkHistoryUserRewards");
      //
      // await this.$store.dispatch("checkUserCurrentRewards");

      // await this.$store.dispatch(
      //   "calculateTableRewards",
      //   [86400, 604800, 2629746, 31556952]
      // );
    },
  },
};
