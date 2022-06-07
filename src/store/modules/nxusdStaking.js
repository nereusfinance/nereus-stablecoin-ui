export default {
  state: {
    userBalanceStaked: "0",
    userRewards: "0",
    apyDataConfig: {},
    tierOne: [],
    tierTwo: "",
    apyTierOne: "0",
    apyTierTwo: "0",
    lockedToken: [],
  },
  mutations: {
    setUserBalanceStaked(state, payload) {
      state.userBalanceStaked = payload;
    },
    setUserRewards(state, payload) {
      state.userRewards = payload.userRewards;
    },
    setAPYConfig(state, payload) {
      state.apyDataConfig = payload;
    },
    setTierOne(state, payload) {
      state.tierOne = payload;
    },
    setAPYTierOne(state, payload) {
      state.apyTierOne = payload;
    },
    setAPYTierTwo(state, payload) {
      state.apyTierTwo = payload;
    },
    setLockedToken(state, payload) {
      state.lockedToken = payload;
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
    async checkAPYDataConfig({ getters, commit }, address) {
      const apyDataConfig = await getters.getProvider.getAPYDataConfig(1);
      commit("setAPYConfig", { apyDataConfig, address });
    },
    async checkTierOne({ getters, commit }, address) {
      const tierOne = await getters.getProvider.getTierOne;
      commit("setTierOne", { tierOne, address });
    },
    async checkTierTwo({ getters, commit }, address) {
      const tierTwo = await getters.getProvider.getTierTwo;
      commit("setTierTwo", { tierTwo, address });
    },
    async checkAPYTierOne({ getters, commit }, address) {
      const apy = await getters.getProvider.getAPYTierOne;
      commit("setAPYTierOne", { apy, address });
    },
    async checkAPYTierTwo({ getters, commit }, address) {
      const apy = await getters.getProvider.getAPYTierTwo;
      commit("setAPYTierTwo", { apy, address });
    },
    async checkLockedToken({ getters, commit }, address) {
      const lockedToken = await getters.getProvider.getLockedToken;
      commit("setLockedToken", { lockedToken, address });
    },
  },
  getters: {
    getUserBalanceStaked: (state) => state.userBalanceStaked,
    getUserRewards: (state) => state.userRewards,
    getAPYDataConfig: (state) => state.apyDataConfig,
    getTierOne: (state) => state.tierOne,
    getTierTwo: (state) => state.tierTwo,
    getLockedToken: (state) => state.lockedToken,
    getAPYTierOne: (state) => state.apyTierOne,
    getAPYTierTwo: (state) => state.apyTierTwo,
  },
};
