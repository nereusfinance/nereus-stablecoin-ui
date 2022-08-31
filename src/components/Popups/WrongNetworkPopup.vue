<template>
  <div class="browser-popup">
    <img
      src="@/assets/images/close-popup.svg"
      alt=""
      class="close-btn"
      @click="closePopup"
    />

    <p class="title">Please change the network to use the applications</p>

    <button class="switch-btn" @click="switchNetwork">
      Change to Avalanche Network
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    closePopup() {
      this.$emit("close");
    },
    async switchNetwork() {
      const targetChain = "0xa86a";
      const web3Provider = this.$store.getters.getMetamaskProvider;
      if (web3Provider) {
        try {
          await web3Provider.provider.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: targetChain,
              },
            ],
          });
        } catch (e) {
          console.log(e);
          console.log(e.code);
          if (e.code === 4902 || e.code === undefined) {
            await web3Provider.provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainName: "Avalanche Mainnet C-Chain",
                  chainId: targetChain,
                  rpcUrls: [
                    process.env.VUE_APP_TESTING
                      ? "http://localhost:8545"
                      : "https://api.avax.network/ext/bc/C/rpc",
                  ],
                },
              ],
            });
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.browser-popup {
  padding: 35px 20px;
  background: $clrBg2;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  max-width: 500px;
  max-height: 208px;
  position: relative;
  margin-left: auto;
  margin-right: auto;

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 13px;
    height: 13px;
    cursor: pointer;
    object-fit: contain;
  }

  .switch-btn {
    cursor: pointer;
    text-align: center;
    padding: 8px 16px;

    height: 40px;

    background: $clrBg3;
    border: none;
    border-radius: 16px;

    font-size: 18px;
    color: black;
  }

  .title {
    font-size: 20px;
    line-height: 24px;
    margin: 0 12px 40px 12px;
  }
}

@media screen and(max-width: 540px) {
  .browser-popup {
    max-width: 100%;
    margin-top: 35%;
    width: 328px;
    height: 232px;
    .title {
      margin: 21px 0 40px 0;
      font-size: 18px;
    }
    .switch-btn {
      padding: 12px 12px;
      line-height: 12px;
    }
  }
}
</style>
