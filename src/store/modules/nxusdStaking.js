export default {
  state: {
    userBalanceStaked: "0",
    userStoredRewards: "0",
    tableRewards: [],
    apyDataConfig: {},
    userData: {},
    tierOne: [],
    tierTwo: "",
    apyTierOne: "0",
    apyTierTwo: "0",
    lockedToken: [],
    NXUSDStakingContractInstance: {},
    userWXTLock: 0,
    yearlyEarn: "0",
  },
  mutations: {
    setYearlyEarnReward(state, payload) {
      state.yearlyEarn = payload;
    },
    setUserWXTLock(state, payload) {
      state.userWXTLock = payload;
    },
    setNXUSDStakingContractInstance(state, payload) {
      state.NXUSDStakingContractInstance = payload;
    },
    setUserData(state, payload) {
      state.userData = payload;
    },
    setTableRewards(state, payload) {
      state.tableRewards = payload;
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
    async checkUserBalanceStaked({ getters, commit }) {
      const userBalance = await getters.getNXUSDStakingContract.getUserBalanceStaked;
      commit("setUserBalanceStaked", userBalance);
    },
    async checkTableRewards({ getters, commit }) {
      const tableRewards = await getters.getNXUSDStakingContract.getTableRewards;
      commit("setTableRewards", tableRewards);
    },
    async checkUserData({ getters, commit }) {
      const userData = await getters.getNXUSDStakingContract.getUserData(getters.getAccount);
      commit("setUserData", userData);
    },
    async checkUserRewards({ getters, commit }) {
      const userRewards = await getters.getNXUSDStakingContract.getUserStoredRewards(getters.getAccount);
      commit("setUserStoredRewards", userRewards);
    },
    async checkAPYDataConfig({ getters, commit }) {
      const apyDataConfig = getters.getNXUSDStakingContract.getAPYDataConfig(1);
      commit("setAPYConfig", apyDataConfig );
    },
    async checkTierOne({ getters, commit }) {
      const tierOne = await getters.getNXUSDStakingContract.getProvider.getTierOne;
      commit("setTierOne", tierOne);
    },
    async checkTierTwo({ getters, commit }) {
      const tierTwo = await getters.getNXUSDStakingContract.getTierTwo;
      commit("setTierTwo", tierTwo);
    },
    async checkAPYTierOne({ getters, commit }) {
      const apy = await getters.getNXUSDStakingContract.getAPYTierOne;
      commit("setAPYTierOne", apy);
    },
    async checkAPYTierTwo({ getters, commit }) {
      const apy = await getters.getNXUSDStakingContract.getAPYTierTwo;
      commit("setAPYTierTwo", apy);
    },
    async checkLockedToken({ getters, commit }) {
      const lockedToken = await getters.getNXUSDStakingContract.getLockedToken;
      commit("setLockedToken", lockedToken);
    },
  },
  getters: {
    getYearlyEarn: (state) => state.yearlyEarn,
    getUserWXTLock: (state) => state.userWXTLock,
    getUserBalanceStaked: (state) => state.userBalanceStaked,
    getTableRewards: (state) => state.tableRewards,
    getUserStoredRewards: (state) => state.userStoredRewards,
    getUserData: (state) => state.userData,
    getAPYDataConfig: (state) => state.apyDataConfig,
    getTierOne: (state) => state.tierOne,
    getTierTwo: (state) => state.tierTwo,
    getLockedToken: (state) => state.lockedToken,
    getAPYTierOne: (state) => state.apyTierOne,
    getAPYTierTwo: (state) => state.apyTierTwo,
    getNXUSDStakingContract: (state) => state.NXUSDStakingContractInstance,
  },
};
