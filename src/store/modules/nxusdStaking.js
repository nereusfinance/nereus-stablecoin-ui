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
    NXUSDStakingInterface: {},
    MulticallContract: {},
    NXUSDStakingCalculationContract: {},
    MultiFeeDistributionContract: {},
    NXUSDStakingCalculationInterface: {},
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
    setNXUSDStakingInterface(state, payload) {
      state.NXUSDStakingInterface = payload;
    },
    setMulticallContract(state, payload) {
      state.MulticallContract = payload;
    },
    setNXUSDStakingCalculationContract(state, payload) {
      state.NXUSDStakingCalculationContract = payload;
    },
    setNXUSDStakingCalculationInterface(state, payload) {
      state.NXUSDStakingCalculationInterface = payload;
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
    async multicall({ commit, getters }, data) {
      const callData = data.map((item) => {
        return {
          target: item.target,
          callData: item.interface.encodeFunctionData(
            item.function,
            item.arguments
          ),
        };
      });

      const tryAggregate =
        await getters.getMulticallContract.callStatic.tryAggregate(
          true,
          callData
        );

      for (let i = 0; i < tryAggregate.length; i++) {
        const result = data[i].interface.decodeFunctionResult(
          data[i].function,
          tryAggregate[i].returnData
        );

        switch (data[i].function) {
          case "userData":
            commit("setUserData", result);
            break;
          case "getAPYDataConfig":
            commit("setAPYDataConfig", result[0]);
            break;
          case "config":
            commit("setConfig", result);
            break;
          case "getWXTLockBalance":
            commit("setUserWXTLock", result[0]);
            break;
          case "historyUserRewards":
            commit("setHistoryUserRewards", result);
            break;
          case "getUserRewards":
            commit("setUserCurrentRewards", result);
            break;
          case "calculateTableRewards":
            commit("setTableRewards", result[0]);
            break;
        }
      }
    },
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
      const userWXTLock =
        await getters.getNXUSDStakingContract.getWXTLockBalance(
          getters.getAccount
        );
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
    getNXUSDStakingInterface: (state) => state.NXUSDStakingInterface,
    getMulticallContract: (state) => state.MulticallContract,
    getNXUSDStakingCalculationContract: (state) =>
      state.NXUSDStakingCalculationContract,
    getNXUSDStakingCalculationInterface: (state) =>
      state.NXUSDStakingCalculationInterface,
    getMultiFeeDistributionContract: (state) =>
      state.MultiFeeDistributionContract,
    getConfigCurrentVersion: (state) => state.configCurrentVersion,
    getUserCurrentRewards: (state) => state.userCurrentRewards,
    getHistoryUserRewards: (state) => state.historyUserRewards,
  },
};
