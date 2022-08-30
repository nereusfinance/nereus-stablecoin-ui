import multiCallMixin from "@/mixins/multicall.js";

export default {
  computed: {},
  mixins: [multiCallMixin],
  methods: {
    /**
     * Refreshes dashboard pools info on block update and dashboard component render
     * @param {*current user account} account 
     */
    async refreshDashboardPools(account) {
      // get pools from configuration
      const pools = this.$store.getters.getPools;

      // build multicall query
      const multiCallData = await this.buildDashboardMulticallData(
        pools,
        account
      );

      // perform multicall
      const multicallResult = await this.aggregate(multiCallData);

      // handle multicall result
      const dashboardPoolsFetchData = this.getDashboardPoolData(
        pools,
        multiCallData,
        multicallResult
      );

      let dashboardPools = pools.map((pool) => {
        let poolInfo = {
          id: pool.id,
          name: pool.name,
          token: pool.token,
          ltv: pool.ltv,
          pairToken: pool.pairToken,
        };

        poolInfo.userCollateralShare = this.$ethers.utils.formatUnits(
          dashboardPoolsFetchData[pool.id].userCollateralShare.toString()
        );
        poolInfo.userBorrowPart = this.$ethers.utils.formatUnits(
          dashboardPoolsFetchData[pool.id].userBorrowPart.toString()
        );

        poolInfo.token.oracleExchangeRate =
          dashboardPoolsFetchData[pool.id].oracleExchangeRate;

        poolInfo.token.price = Number(
          this.$ethers.utils.formatUnits(
            poolInfo.token.oracleExchangeRate,
            poolInfo.token.decimals
          )
        );

        return poolInfo;
      });

      // refresh stand pools
      this.$store.commit("setDashboardPools", dashboardPools);
    },
    async buildDashboardMulticallData(pools, account) {
      let multicallData = [];

      for (let i = 0; i < pools.length; i++) {
        multicallData.push({
          function: "userCollateralShare",
          arguments: [account],
          target: pools[i].contractInstance.address,
          interface: pools[i].contractInterface,
          decimals: pools[i].token.decimals,
          id: pools[i].id,
        });

        multicallData.push({
          function: "userBorrowPart",
          arguments: [account],
          target: pools[i].contractInstance.address,
          interface: pools[i].contractInterface,
          id: pools[i].id,
        });

        // contract exchange rate
        multicallData.push({
          function: "exchangeRate",
          arguments: [],
          target: pools[i].contractInstance.address,
          interface: pools[i].contractInterface,
          decimals: pools[i].token.decimals,
          id: pools[i].id,
        });
        // oracle exchange rate
        multicallData.push(this.buildOracleExchangeRateMulticall(pools[i]));
      }

      return multicallData;
    },
    getDashboardPoolData(pools, multicallData, multicallResult) {
      let dashboardPools = {};

      for (let i = 0; i < pools.length; i++) {
        const userCollateralShareResult = this.getMulticallResult(
          multicallData,
          multicallResult,
          pools[i].id,
          "userCollateralShare"
        );

        const userBorrowPartResult = this.getMulticallResult(
          multicallData,
          multicallResult,
          pools[i].id,
          "userBorrowPart"
        );

        const poolExchangeRateResult = this.getMulticallResult(
          multicallData,
          multicallResult,
          pools[i].id,
          "exchangeRate"
        );

        const oracleExchangeRateResult = this.getMulticallResult(
          multicallData,
          multicallResult,
          pools[i].id,
          "peekSpot"
        );

        const oracleExchangeRate = this.getOracleExchangeRate(
          poolExchangeRateResult[0],
          oracleExchangeRateResult[0]
        );

        dashboardPools[pools[i].id] = {
          userCollateralShare: userCollateralShareResult[0],
          userBorrowPart: userBorrowPartResult[0],
          oracleExchangeRate,
        };
      }

      return dashboardPools;
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
      if (oracleExchangeRate.toString() < poolExchangeRate.toString()) {
        tokenPairRate = poolExchangeRate;
      } else if (
        oracleExchangeRate.toString() !== poolExchangeRate.toString()
      ) {
        tokenPairRate = oracleExchangeRate;
      } else {
        tokenPairRate = oracleExchangeRate;
      }

      return tokenPairRate;
    },
  },
};
