export default {
  state: {
    balanceNativeToken: {},
  },
  mutations: {
    setBalanceNativeToken(state, payload) {
      state.balanceNativeToken = {
        ...state.balanceNativeToken,
        [payload.id]: payload.balance,
      };
    },
  },
  actions: {
    async checkBalanceNativeToken({ getters, commit }, id) {
      const balance = await getters.getProvider.getBalance(getters.getAccount);
      commit("setBalanceNativeToken", { balance, id });
    },
  },
  getters: {
    getBalanceNativeToken: (state) => (id) => state.balanceNativeToken[id],
  },
};
