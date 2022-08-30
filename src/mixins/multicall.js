export default {
  computed: {},
  methods: {
    async aggregate(data) {
      const callData = data.map((item) => {
        return {
          target: item.target,
          callData: item.interface.encodeFunctionData(
            item.function,
            item.arguments
          ),
        };
      });

      let tryAggregate = [];
      try {
        tryAggregate =
          await this.$store.getters.getMulticallContract.callStatic.tryAggregate(
            true,
            callData
          );
      } catch (e) {
        console.log("Aggregate Error:", e);
      }

      return tryAggregate;
    },
    getMulticallResult(multicallData, multicallResult, poolId, functionName) {
      const multiCallMethodData = multicallData.find(
        (x) => x.id == poolId && x.function == functionName
      );
      const multiCallMethodDataIndex =
        multicallData.indexOf(multiCallMethodData);

      return multiCallMethodData.interface.decodeFunctionResult(
        multiCallMethodData.function,
        multicallResult[multiCallMethodDataIndex].returnData
      );
    },
  },
};
