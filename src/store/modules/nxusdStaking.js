export default {
  state: {
    userBalanceStaked: "0",
    userRewards: "0",
    apyDataConfig: {},
  },
  mutations: {
    setUserBalanceStaked(state, payload) {
      state.userBalanceStaked = payload;
    },
    setUserRewards(state, payload) {
      state.userRewards = payload.userRewards;
    },
    setAPYConfig(state, payload) {
      state.apyDataConfig = {
        ...state.apyDataConfig,
        [payload.version]: payload.apyDataConfig,
      };
    },
  },
  actions: {
    async checkUserBalance({ getters, commit }, address) {
      const userBalance = await getters.getProvider.getUserBalanceStaked(getters.getAccount);
      commit("setUserBalanceStaked", { userBalance, address });
    },
    async checkUserRewards({ getters, commit }, address) {
      const userRewards = await getters.getProvider.getUserRewards(getters.getAccount);
      commit("setUserRewards", { userRewards, address });
    },
    // async checkUserRewards({ getters, commit }, {address }) {
    //   const userRewards = await contract.getUserRewards(getters.getAccount);
    //   commit("setUserRewards", { userRewards, address });
    // },
    // async checkAPYDataConfig({ getters, commit }, { version }) {
    //   //Set version in this file or set it in another and then call commit?
    //   //What arguments? Need payload?
    //   const apyDataConfig = await contract.getAPYDataConfig(version);
    //   commit("setAPYDataConfig", { apyDataConfig, version });
    // },
  },
  getters: {
    getUserBalanceStaked: (state) => state.userBalanceStaked,
    getUserRewards: (state) => state.userRewards,
    getAPYDataConfig: (state) => (version) => state.apyDataConfig[version],
  },
};
