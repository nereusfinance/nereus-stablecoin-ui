import { ethers } from "ethers";
export default {
  state: {
    tableRewards: [],
    totalTableRewards: [
      ethers.BigNumber.from("0"),
      ethers.BigNumber.from("0"),
      ethers.BigNumber.from("0"),
      ethers.BigNumber.from("0"),
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
    userCurrentRewards: ethers.BigNumber.from("0"),
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
    setTotalTableRewards(state, payload) {
      state.totalTableRewards = payload;
    },
    setAPYDataConfig(state, payload) {
      state.apyDataConfig = payload;
    },
    setConfig(state, payload) {
      state.config = payload;
    },
  },
  actions: {
    async calculateTableRewards({ getters, commit }, periods) {
      const tableRewards =
        await getters.getNXUSDStakingCalculationContract.calculateTableRewards(
          getters.getAccount,
          periods
        );
      const totalTableRewards = tableRewards.map((rewards) => {
        return rewards[0].add(rewards[1]);
      });
      commit("setTotalTableRewards", totalTableRewards);
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
    getTotalTableRewards: (state) => state.totalTableRewards,
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
  },
};
