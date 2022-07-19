export default {
  state: {
    MulticallContract: {},
  },
  mutations: {
    setMulticallContract(state, payload) {
      state.MulticallContract = payload;
    },
  },
  actions: {
    async multicallStaking({ commit, getters }, data) {
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
          await getters.getMulticallContract.callStatic.tryAggregate(
            true,
            callData
          );
      } catch (e) {
        console.log("multicallStaking Err:", e);
      }

      for (let i = 0; i < tryAggregate.length; i++) {
        const result = data[i].interface.decodeFunctionResult(
          data[i].function,
          tryAggregate[i].returnData
        );

        switch (data[i].function) {
          case "userData":
            commit("setUserData", result);
            break;
          case "getAPYDataConfig":
            commit("setAPYDataConfig", result[0]);
            break;
          case "config":
            commit("setConfig", result);
            break;
          case "getWXTLockBalance":
            commit("setUserWXTLock", result[0]);
            break;
          case "historyUserRewards":
            commit("setHistoryUserRewards", result);
            break;
          case "getUserRewards":
            commit("setUserCurrentRewards", result);
            break;
          case "calculateTableRewards":
            commit("setTableRewards", result[0]);
            break;
        }
      }
    },
    async multicallMarkets({ dispatch, commit, getters }, data) {
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
          await getters.getMulticallContract.callStatic.tryAggregate(
            true,
            callData
          );
      } catch (e) {
        console.log("multicallMarkets Err:", e);
      }

      for (let i = 0; i < tryAggregate.length; i++) {
        const result = data[i].interface.decodeFunctionResult(
          data[i].function,
          tryAggregate[i].returnData
        );

        switch (data[i].function) {
          case "balanceOf":
            dispatch("checkBalance", {
              balance: result[0],
              type: data[i].type,
              id: data[i].id,
            });
            break;
          case "userCollateralShare":
            dispatch("checkUserCollateralShare", {
              userCollateralShare: result[0],
              decimals: data[i].decimals,
              id: data[i].id,
            });
            break;
          case "userBorrowPart":
            dispatch("checkUserBorrowPart", {
              userBorrowPart: result[0],
              id: data[i].id,
            });
            break;
          case "totalBorrow":
            commit("setTotalBorrow", {
              totalBorrow: result.base,
              id: data[i].id,
            });
            break;
          case "totalCollateralShare":
            commit("setTotalCollateralShare", {
              totalCollateralShare: result[0],
              id: data[i].id,
            });
            break;
          case "peekSpot":
            commit("setPeekSpot", { rate: result[0], id: data[i].id });
            break;
          case "exchangeRate":
            dispatch("checkTokenPairRateAndPrice", {
              contractExchangeRate: result[0],
              decimals: data[i].decimals,
              id: data[i].id,
            });
            break;
          case "BORROW_OPENING_FEE":
            commit("setBorrowFee", {
              fee: result[0].toString() / 1000,
              id: data[i].id,
            });
            break;
        }
      }
    },
  },
  getters: {
    getMulticallContract: (state) => state.MulticallContract,
  },
};
