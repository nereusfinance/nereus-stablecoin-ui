export default {
  state: {
    poolInfo: {},
  },
  mutations: {
    setPoolInfo(state, payload) {
      state.poolInfo = payload;
    },
  },
  getters: {
    getPoolInfo: (state) => state.poolInfo,
  },
};
