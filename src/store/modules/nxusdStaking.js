import { ethers } from "ethers";
export default {
  state: {
    tableRewards: [
      {
        rewardsTier1: ethers.BigNumber.from("0"),
        rewardsTier2: ethers.BigNumber.from("0"),
        rewardsTotal: ethers.BigNumber.from("0"),
      },
      {
        rewardsTier1: ethers.BigNumber.from("0"),
        rewardsTier2: ethers.BigNumber.from("0"),
        rewardsTotal: ethers.BigNumber.from("0"),
      },
      {
        rewardsTier1: ethers.BigNumber.from("0"),
        rewardsTier2: ethers.BigNumber.from("0"),
        rewardsTotal: ethers.BigNumber.from("0"),
      },
      {
        rewardsTier1: ethers.BigNumber.from("0"),
        rewardsTier2: ethers.BigNumber.from("0"),
        rewardsTotal: ethers.BigNumber.from("0"),
      },
    ],
    apyDataConfig: [],
    config: [],
    userData: [
      [
        ethers.BigNumber.from("0"),
        ethers.BigNumber.from("0"),
        ethers.BigNumber.from("0"),
      ],
      ethers.BigNumber.from("0"),
      ethers.BigNumber.from("0"),
      ethers.BigNumber.from("0"),
    ],
    NXUSDStakingContract: {},
    NXUSDStakingCalculationContract: {},
    MultiFeeDistributionContract: {},
    userWXTLock: ethers.BigNumber.from("0"),
    configCurrentVersion: ethers.BigNumber.from("0"),
    userCurrentRewards: {
      rewards: ethers.BigNumber.from("0"),
      historyRewards: {
        rewardsTier1: ethers.BigNumber.from("0"),
        rewardsTier2: ethers.BigNumber.from("0"),
      },
    },
    historyUserRewards: {
      rewardsTier1: ethers.BigNumber.from("0"),
      rewardsTier2: ethers.BigNumber.from("0"),
    },
  },
  mutations: {
    setConfigCurrentVersion(state, payload) {
      state.configCurrentVersion = payload;
    },
    setUserCurrentRewards(state, payload) {
      state.userCurrentRewards = payload;
    },
    setUserWXTLock(state, payload) {
      state.userWXTLock = payload;
    },
    setNXUSDStakingContract(state, payload) {
      state.NXUSDStakingContract = payload;
    },
    setNXUSDStakingCalculationContract(state, payload) {
      state.NXUSDStakingCalculationContract = payload;
    },
    setMultiFeeDistributionContract(state, payload) {
      state.MultiFeeDistributionContract = payload;
    },
    setUserData(state, payload) {
      state.userData = payload;
    },
    setTableRewards(state, payload) {
      state.tableRewards = payload;
    },
    setAPYDataConfig(state, payload) {
      state.apyDataConfig = payload;
    },
    setConfig(state, payload) {
      state.config = payload;
    },
    setHistoryUserRewards(state, payload) {
      state.historyUserRewards = payload;
    },
  },
  actions: {
    async calculateTableRewards({ getters, commit }, periods) {
      console.log(
        "Calculating start time in seconds:",
        (new Date().getTime() / 1000).toFixed(0)
      );
      const tableRewards =
        await getters.getNXUSDStakingCalculationContract.calculateTableRewards(
          getters.getAccount,
          periods
        );
      console.log(
        "Calculating finish time in seconds:",
        (new Date().getTime() / 1000).toFixed(0)
      );
      console.log("Table rewards data", tableRewards);
      commit("setTableRewards", tableRewards);
    },
    async checkConfigCurrentVersion({ getters, commit }) {
      const configCurrentVersion =
        await getters.getNXUSDStakingContract.configCurrentVersion();
      commit("setConfigCurrentVersion", configCurrentVersion);
      return configCurrentVersion;
    },
    async checkUserData({ getters, commit }) {
      const userData = await getters.getNXUSDStakingContract.userData(
        getters.getAccount
      );
      commit("setUserData", userData);
      return userData;
    },
    async checkUserCurrentRewards({ getters, commit }) {
      const userCurrentRewards =
        await getters.getNXUSDStakingContract.getUserRewards(
          getters.getAccount
        );
      commit("setUserCurrentRewards", userCurrentRewards);
    },
    async checkHistoryUserRewards({ getters, commit }) {
      const historyUserRewards =
        await getters.getNXUSDStakingContract.historyUserRewards(
          getters.getAccount
        );
      commit("setHistoryUserRewards", historyUserRewards);
    },
    async getAPYDataConfig({ getters, commit }, configVersion) {
      const apyDataConfig =
        await getters.getNXUSDStakingContract.getAPYDataConfig(configVersion);
      commit("setAPYDataConfig", apyDataConfig);
    },
    async getConfig({ getters, commit }, configVersion) {
      const config = await getters.getNXUSDStakingContract.config(
        configVersion
      );
      commit("setConfig", config);
    },
    async checkUserWXTLock({ getters, commit }) {
      const userWXTLock = (
        await getters.getMultiFeeDistributionContract.lockedBalances(
          getters.getAccount
        )
      ).total;
      commit("setUserWXTLock", userWXTLock);
    },
  },
  getters: {
    getUserWXTLock: (state) => state.userWXTLock,
    getTableRewards: (state) => state.tableRewards,
    getUserData: (state) => state.userData,
    getAPYDataConfig: (state) => state.apyDataConfig,
    getConfig: (state) => state.config,
    getNXUSDStakingContract: (state) => state.NXUSDStakingContract,
    getNXUSDStakingCalculationContract: (state) =>
      state.NXUSDStakingCalculationContract,
    getMultiFeeDistributionContract: (state) =>
      state.MultiFeeDistributionContract,
    getConfigCurrentVersion: (state) => state.configCurrentVersion,
    getUserCurrentRewards: (state) => state.userCurrentRewards,
    getHistoryUserRewards: (state) => state.historyUserRewards,
  },
};
