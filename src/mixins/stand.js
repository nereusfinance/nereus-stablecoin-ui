import multiCallMixin from "@/mixins/multicall.js";

export default {
  computed: {},
  mixins: [multiCallMixin],
  methods: {
    async refreshStandPools() {
      // get pools from configuration
      const pools = this.$store.getters.getPools;

      // build multicall query
      const multiCallData = await this.buildStandMulticallData(pools);
      // perform multicall
      const multicallResult = await this.aggregate(multiCallData);
      // handle multicall result
      const standPoolsFetchData = await this.getStandPoolData(
        pools,
        multiCallData,
        multicallResult
      );

      // build stand pools object
      let standPools = pools.map((pool) => {
        let poolInfo = {
          id: pool.id,
          name: pool.name,
          stabilityFee: pool.stabilityFee,
          isEnabled: pool.isEnabled,
          token: pool.token,
          vaultAsset: pool.vaultAsset,
          pairToken: pool.pairToken,
          masterContractInstance: pool.masterContractInstance,
          masterContractInterface: pool.masterContractInterface,
        };

        poolInfo.totalBorrow = standPoolsFetchData[pool.id].totalBorrow;
        poolInfo.balanceOfPool = standPoolsFetchData[pool.id].balanceOfPool;

        return poolInfo;
      });

      // dynamic borrow amount
      standPools = await this.updateDynamicBorrow(standPools);

      // refresh stand pools
      this.$store.commit("setStandPools", standPools);
    },
    async buildStandMulticallData(pools) {
      let multicallData = [];

      for (let i = 0; i < pools.length; i++) {
        multicallData.push({
          function: "totalBorrow",
          arguments: [],
          target: pools[i].contractInstance.address,
          interface: pools[i].contractInterface,
          id: pools[i].id,
        });
        multicallData.push({
          function: "balanceOf",
          arguments: [
            pools[i].pairToken.address,
            pools[i].contractInstance.address,
          ],
          target: pools[i].masterContractInstance.address,
          interface: pools[i].masterContractInterface,
          id: pools[i].id,
        });
      }

      return multicallData;
    },
    async getStandPoolData(pools, multicallData, multicallResult) {
      let standPools = {};

      for (let i = 0; i < pools.length; i++) {
        const totalBorrowResult = this.getMulticallResult(
          multicallData,
          multicallResult,
          pools[i].id,
          "totalBorrow"
        );

        const poolBalanceOfBentoResult = this.getMulticallResult(
          multicallData,
          multicallResult,
          pools[i].id,
          "balanceOf"
        );

        standPools[pools[i].id] = {
          totalBorrow: totalBorrowResult.base,
          balanceOfPool: poolBalanceOfBentoResult[0],
        };
      }

      return standPools;
    },
    async updateDynamicBorrow(pools) {
      let multicallData = [];
      for (let i = 0; i < pools.length; i++) {
        multicallData.push({
          function: "toAmount",
          arguments: [
            pools[i].pairToken.address,
            pools[i].balanceOfPool,
            false,
          ],
          target: pools[i].masterContractInstance.address,
          interface: pools[i].masterContractInterface,
          id: pools[i].id,
        });
      }

      const multicallResult = await this.aggregate(multicallData);

      for (let i = 0; i < pools.length; i++) {
        const toAmountResult = this.getMulticallResult(
          multicallData,
          multicallResult,
          pools[i].id,
          "toAmount"
        );

        pools[i].dynamicBorrowAmount = this.$ethers.utils.formatUnits(
          toAmountResult[0],
          18
        );
      }

      return pools;
    },
  },
};
