import multiCallMixin from "@/mixins/multicall.js";

export default {
  computed: {},
  mixins: [multiCallMixin],
  methods: {
    async refreshPoolInfo(poolId, account) {
      // get pools from configuration
      const pools = this.$store.getters.getPools;
      const pool = pools.find((x) => x.id == poolId);

      let poolInfo = {
        isEnabled: pool.isEnabled,
        id: pool.id,
        name: pool.name,
        token: pool.token,
        ltv: pool.ltv,
        stabilityFee: pool.stabilityFee,
        pairToken: pool.pairToken,
        pairTokenContract: pool.pairTokenContract,
        pairTokenContractInterface: pool.pairTokenContractInterface,
        masterContractInstance: pool.masterContractInstance,
        masterContractInterface: pool.masterContractInterface,
        swapContract: pool.swapContract,
        contractInstance: pool.contractInstance,
      };

      // build multicall query
      const multiCallData = await this.buildPoolMulticallData(pool, account);
      const multicallResult = await this.aggregate(multiCallData);
      // handle multicall result
      poolInfo = this.getPoolInfoData(
        multiCallData,
        multicallResult,
        pool.id,
        poolInfo
      );

      if (poolInfo.name === "AVAX") {
        await this.$store.dispatch("checkBalanceNativeToken", poolInfo.id);
      }

      this.$store.commit("setPoolInfo", poolInfo);
    },
    buildPoolMulticallData(pool, account) {
      let multicallData = [];

      multicallData.push({
        function: "userCollateralShare",
        arguments: [account],
        target: pool.contractInstance.address,
        interface: pool.contractInterface,
        decimals: pool.token.decimals,
        id: pool.id,
      });

      multicallData.push({
        function: "userBorrowPart",
        arguments: [account],
        target: pool.contractInstance.address,
        interface: pool.contractInterface,
        id: pool.id,
      });

      // contract exchange rate
      multicallData.push({
        function: "exchangeRate",
        arguments: [],
        target: pool.contractInstance.address,
        interface: pool.contractInterface,
        decimals: pool.token.decimals,
        id: pool.id,
      });

      // oracle exchange rate
      multicallData.push(this.buildOracleExchangeRateMulticall(pool));

      multicallData.push({
        function: "balanceOf",
        arguments: [account],
        target: pool.token.contract.address,
        interface: pool.token.contractInterface,
        type: "checkBalanceToken",
        id: pool.id,
      });

      multicallData.push({
        function: "balanceOf",
        arguments: [account],
        target: pool.pairTokenContract.address,
        interface: pool.pairTokenContractInterface,
        type: "checkBalancePairToken",
        id: pool.id,
      });

      multicallData.push({
        function: "totalBorrow",
        arguments: [],
        target: pool.contractInstance.address,
        interface: pool.contractInterface,
        id: pool.id,
      });

      multicallData.push({
        function: "BORROW_OPENING_FEE",
        arguments: [],
        target: pool.contractInstance.address,
        interface: pool.contractInterface,
        id: pool.id,
      });

      return multicallData;
    },
    buildOracleExchangeRateMulticall(pool) {
      const parsedDecimals = this.$ethers.BigNumber.from(
        Math.pow(10, pool.token.oracleDatas.decimals).toLocaleString(
          "fullwide",
          {
            useGrouping: false,
          }
        )
      );

      return {
        function: "peekSpot",
        arguments: [
          this.$ethers.utils.defaultAbiCoder.encode(
            ["address", "address", "uint256"],
            [
              pool.token.oracleDatas.multiply,
              pool.token.oracleDatas.divide,
              parsedDecimals,
            ]
          ),
        ],
        target: pool.oracleInstance.address,
        interface: pool.oracleInterface,
        id: pool.id,
      };
    },
    getOracleExchangeRate(poolExchangeRate, oracleExchangeRate) {
      let tokenPairRate;
      let askUpdatePrice = false;
      if (oracleExchangeRate.toString() < poolExchangeRate.toString()) {
        tokenPairRate = poolExchangeRate;
      } else if (
        oracleExchangeRate.toString() !== poolExchangeRate.toString()
      ) {
        tokenPairRate = oracleExchangeRate;
        askUpdatePrice = true;
      } else {
        tokenPairRate = oracleExchangeRate;
      }

      return { tokenPairRate, askUpdatePrice };
    },
    getPoolInfoData(multicallData, multicallResult, poolId, poolInfo) {
      const userCollateralShareResult = this.getMulticallResult(
        multicallData,
        multicallResult,
        poolId,
        "userCollateralShare"
      );

      const userBorrowPartResult = this.getMulticallResult(
        multicallData,
        multicallResult,
        poolId,
        "userBorrowPart"
      );

      const poolExchangeRateResult = this.getMulticallResult(
        multicallData,
        multicallResult,
        poolId,
        "exchangeRate"
      );

      const oracleExchangeRateResult = this.getMulticallResult(
        multicallData,
        multicallResult,
        poolId,
        "peekSpot"
      );

      const borrowOpeningFeeResult = this.getMulticallResult(
        multicallData,
        multicallResult,
        poolId,
        "BORROW_OPENING_FEE"
      );

      const oracleExchangeRate = this.getOracleExchangeRate(
        poolExchangeRateResult[0],
        oracleExchangeRateResult[0]
      );

      const tokenBalanceOfResult = this.getBalanceOfMulticallResult(
        multicallData,
        multicallResult,
        poolId,
        "balanceOf",
        "checkBalanceToken"
      );

      const pairTokenBalanceOfResult = this.getBalanceOfMulticallResult(
        multicallData,
        multicallResult,
        poolId,
        "balanceOf",
        "checkBalancePairToken"
      );

      poolInfo.userCollateralShare = this.$ethers.utils.formatUnits(
        userCollateralShareResult[0],
        poolInfo.token.decimals
      );
      poolInfo.userBorrowPart = this.$ethers.utils.formatUnits(
        userBorrowPartResult[0]
      );
      poolInfo.token.oracleExchangeRate = oracleExchangeRate.tokenPairRate;
      poolInfo.token.price = Number(
        this.$ethers.utils.formatUnits(
          poolInfo.token.oracleExchangeRate,
          poolInfo.token.decimals
        )
      );
      poolInfo.askUpdatePrice = oracleExchangeRate.askUpdatePrice;
      poolInfo.borrowFee = borrowOpeningFeeResult[0].toString() / 1000;

      poolInfo.mainInfo = this.getMainInfo(
        poolInfo.ltv,
        poolInfo.stabilityFee,
        poolInfo.borrowFee
      );

      poolInfo.tokenPairPrice = 1;

      poolInfo.tokenBalance = tokenBalanceOfResult[0];
      poolInfo.pairTokenBalance = pairTokenBalanceOfResult[0];
      poolInfo.collateralInfo = this.createCollateralInfo(
        poolInfo.userCollateralShare,
        poolInfo.userBorrowPart,
        poolInfo.token.price,
        poolInfo.ltv,
        poolInfo.token.decimals
      );

      return poolInfo;
    },
    getMainInfo(ltv, stabilityFee, borrowFee) {
      return [
        {
          title: "Maximum collateral ratio",
          value: `${ltv} %`,
          tooltip:
            "Maximum collateral ratio (MCR) - MCR represents the maximum amount of debt a user can borrow with a selected collateral token. So as not to be liquidated.",
          additional: `Maximum collateral ratio (MCR) - MCR represents the maximum amount of debt a user can borrow with a selected collateral token. So as not to be liquidated.`,
        },
        {
          title: "Liquidation fee",
          value: `${stabilityFee} %`,
          tooltip:
            "This is the discount a liquidator gets when buying collateral flagged for liquidation.",
          additional:
            "This is the discount a liquidator gets when buying collateral flagged for liquidation.",
        },
        {
          title: "Borrow fee",
          value: `${borrowFee} %`,
          tooltip:
            "This fee is added to your debt every time you borrow NXUSD.",
          additional:
            "This fee is added to your debt every time you borrow NXUSD.",
        },
      ];
    },
    getBalanceOfMulticallResult(
      multicallData,
      multicallResult,
      poolId,
      functionName,
      type
    ) {
      const multiCallMethodData = multicallData.find(
        (x) => x.id == poolId && x.function == functionName && x.type == type
      );
      const multiCallMethodDataIndex =
        multicallData.indexOf(multiCallMethodData);

      return multiCallMethodData.interface.decodeFunctionResult(
        multiCallMethodData.function,
        multicallResult[multiCallMethodDataIndex].returnData
      );
    },
    createCollateralInfo(userCollateralShare, userBorrowPart, tokenPrice, ltv) {
      const tokenInUsd = userCollateralShare / tokenPrice;

      const maxNUSDBorrow = (tokenInUsd / 100) * (ltv - 1);

      const borrowLeft = parseFloat(maxNUSDBorrow - userBorrowPart).toFixed(20);
      let re = new RegExp(
        // eslint-disable-next-line no-useless-escape
        `^-?\\d+(?:\.\\d{0,` + (4 || -1) + `})?`
      );
      const borrowLeftParsed = borrowLeft.toString().match(re)[0];
      const collateralDeposited = userCollateralShare.toString().match(re)[0];

      const liquidationPrice =
        userBorrowPart / ((userCollateralShare * ltv) / 100) || 0;

      return [
        {
          title: "Collateral deposited",
          value: collateralDeposited,
          tooltip: "Amount of Tokens Deposited as Collaterals",
          additional: "",
          cyData: "collateral-deposited",
        },
        {
          title: "Collateral value",
          value: `$ ${parseFloat(tokenInUsd).toFixed(4)}`,
          tooltip: "USD Value of the Collateral Deposited in your Position",
          additional: "",
          cyData: "collateral-value",
        },
        {
          title: "NXUSD borrowed",
          value: `$ ${parseFloat(userBorrowPart).toFixed(4)}`,
          tooltip: "NXUSD Currently Borrowed in your Position",
          additional: "",
          cyData: "borrowed-value",
        },
        {
          title: "Liquidation price",
          value: `$ ${parseFloat(liquidationPrice.toString()).toFixed(6)}`,
          tooltip: "Collateral Price at which your Position will be Liquidated",
          additional: "",
          cyData: "liquidation-value",
        },
        {
          title: "NXUSD left to borrow",
          value: `${borrowLeftParsed}`,
          tooltip: "NXUSD Borrowable Given the Collateral Deposited",
          additional: "",
          cyData: "available-borrow",
        },
      ];
    },
  },
};
