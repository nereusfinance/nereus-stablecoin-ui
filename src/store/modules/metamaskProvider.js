import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import web3 from "web3";

export default {
  state: {
    provider: null,
    signer: null,
    account: null,
    chainId: null,
    isMetamaskActive: false,
    isWalletConnected: false,
  },
  mutations: {
    setProvider(state, payload) {
      state.provider = payload;
    },
    setSigner(state, payload) {
      state.signer = payload;
    },
    setAccount(state, payload) {
      state.account = payload;
    },
    setChainId(state, payload) {
      state.chainId = payload;
    },
    setWalletConnection(state, payload) {
      state.isWalletConnected = payload;
    },
    setMetamaskActive(state, payload) {
      state.isMetamaskActive = payload;
    },
  },
  actions: {
    async fetchAccount({ commit }, provider) {
      const accounts = await provider.request({ method: "eth_accounts" });

      if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log("Please connect to MetaMask.");
        return false;
      } else {
        commit("setAccount", accounts[0]);
        return accounts[0];
      }
    },
    async fetchChainId({ commit }, provider) {
      // const chainId = await provider.request({ method: "eth_chainId" });
      const chainId = web3.utils.toHex((await provider.getNetwork()).chainId);

      if (chainId) {
        commit("setChainId", chainId);
        return chainId;
      }

      return false;
    },
    async connectAccount({ commit, dispatch }, ) {
      try {
        // const accounts = await provider.request({
        //   method: "eth_requestAccounts",
        // });
        //
        // if (accounts.length === 0) {
        //   // MetaMask is locked or the user has not connected any accounts
        //   console.log("Please connect to MetaMask.");
        //   return false;
        // }

        const walletConnectProvider = new WalletConnectProvider({
          rpc: {
            43113: "https://api.avax-test.network/ext/bc/C/rpc",
            43114: "https://api.avax.network/ext/bc/C/rpc",
          },
        });
        const accounts = await walletConnectProvider.enable();

        const provider = new providers.Web3Provider(walletConnectProvider);
        commit('setProvider', provider);
        const signer = await provider.getSigner();
        commit('setSigner', signer)

        const chainId = await dispatch("fetchChainId", provider);
        commit("setWalletConnection", true);
        console.log("connectAccount", accounts[0], chainId);
        commit("setAccount", accounts[0]);
        commit("setWalletConnection", true);
        return true;
      } catch (err) {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
        return false;
      }
    },
  },
  getters: {
    getProvider: (state) => state.provider,
    getSigner: (state) => state.signer,
    getAccount: (state) => state.account,
    getChainId: (state) => state.chainId,
    getWalletIsConnected: (state) => state.isWalletConnected,
    getMetamaskActive: (state) => state.isMetamaskActive,
  },
};
