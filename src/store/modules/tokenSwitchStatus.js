export default {
  state: {
    useAVAX: false,
    useVaultAsset: true,
  },
  mutations: {
    setUseAVAX(state, payload) {
      state.useAVAX = payload;
    },
    setUseVaultAsset(state, payload) {
      state.useVaultAsset = payload;
    },
  },
  actions: {},
  getters: {
    getUseAVAX: (state) => state.useAVAX,
    getUseVaultAsset: (state) => state.useVaultAsset,
  },
};
