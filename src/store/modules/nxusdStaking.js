export default {
  state: {
    userBalanceStaked: "0",
    userStoredRewards: "0",
    apyDataConfig: {},
    tierOne: [],
    tierTwo: "",
    apyTierOne: "0",
    apyTierTwo: "0",
    lockedToken: [],
    NXUSDStakingContractInstance: {},
  },
  mutations: {
    setNXUSDStakingContractInstance(state, payload) {
      state.NXUSDStakingContractInstance = payload;
    },
    setUserBalanceStaked(state, payload) {
      state.userBalanceStaked = payload;
    },
    setUserStoredRewards(state, payload) {
      state.userStoredRewards = payload;
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

    async checkUserBalance({ getters, commit }) { //add Staking to name
      const userBalance = await getters.getNXUSDStakingContract.getUserBalanceStaked(getters.getAccount);
      commit("setUserBalanceStaked", userBalance);
    },
    async checkUserRewards({ getters, commit }, address) {
      const userRewards = await getters.getUserRewards(getters.getAccount);
      commit("setUserStoredRewards", { userRewards, address });
    },
    async checkAPYDataConfig({ getters, commit }, address) {
      const apyDataConfig = await getters.getAPYDataConfig(1);
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
    getNXUSDStakingContract: (state) => state.NXUSDStakingContractInstance,


  },
};
