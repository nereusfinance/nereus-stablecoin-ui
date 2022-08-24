export default {
  state: {
    dashboardPools: [],
  },
  mutations: {
    setDashboardPools(state, payload) {
      state.dashboardPools = payload;
    },
  },
  getters: {
    getDashboardPools: (state) => state.dashboardPools,
  },
};
