export default {
  state: {
    standPools: [],
  },
  mutations: {
    setStandPools(state, payload) {
      state.standPools = payload;
    },
  },
  getters: {
    getStandPools: (state) => state.standPools,
  },
};
