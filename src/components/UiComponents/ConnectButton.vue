<template>
  <div class="btn-text" v-if="isConnected">
    <button
      class="btn mini connected-btn"
      :class="{ load: connectLoader, connected: isConnected }"
      @click="disconnect"
      @mouseenter="itsHover = true"
      @mouseleave="itsHover = false"
    >
      <ButtonLoader v-if="connectLoader" />
      <template v-else-if="itsHover">Disconnect</template>
      <template v-else>
        <div>
          {{ walletBtnText }}
          <p class="slicedAddress">{{ slicedAccountAddress }}</p>
        </div>
      </template>
    </button>
  </div>

  <div v-else>
    <button
      class="btn mini connect-btn"
      :class="{ load: connectLoader, connected: isConnected }"
      @click="walletBtnHandler"
    >
      <ButtonLoader v-if="connectLoader" />
      <template v-else>
        {{ connectBtnText }}
      </template>
    </button>
  </div>
</template>

<script>
// import ethIcon from "@/assets/images/networks/ethereum-icon.svg";
// import binanceIcon from "@/assets/images/networks/binance-icon.svg";
// import fantomIcon from "@/assets/images/networks/fantom-icon.svg";
import avaxIcon from "@/assets/images/networks/avalanche-avax-icon.svg";
import WalletConnectProvider from "@walletconnect/client";

const ButtonLoader = () => import("@/components/UiComponents/ButtonLoader");

export default {
  props: {
    networkType: {
      type: String,
      default: "0xa86a",
    },
  },
  data() {
    return {
      itsHover: false,
      connectLoader: false,
      btnText: "Connect",

      networks: [
        // {
        //   chainid: "0x1",
        //   title: "ERC-20",
        //   icon: ethIcon,
        // },
        // {
        //   chainid: "0x38",
        //   title: "BSC",
        //   icon: binanceIcon,
        // },
        // {
        //   chainid: "0xfa",
        //   title: "FANTOM",
        //   icon: fantomIcon,
        // },
        {
          chainid: "0xa86a",
          title: "Avax Network",
          icon: avaxIcon,
        },
        {
          chainid: "0xa869",
          title: "Avax Fuji",
          icon: avaxIcon,
        },
        // {
        //   chainid: "0x539",
        //   title: "Avax local",
        //   icon: avaxIcon,
        // },
      ],
    };
  },
  computed: {
    walletBtnText() {
      let networkType = this.$store.getters.getChainId;
      let networkName = this.networks.find(
        (item) => item.chainid == networkType
      );

      return `${networkName.title}`;
    },
    slicedAccountAddress() {
      let account = this.$store.getters.getAccount;
      let startAddr = account.slice(0, 4);
      let endAddr = account.slice(-4);

      return `${startAddr}...${endAddr}`;
    },
    connectBtnText() {
      return this.btnText;
    },
    isConnected() {
      return this.$store.getters.getWalletIsConnected;
    },
  },
  methods: {
    async walletBtnHandler() {
      if (this.isConnected) {
        return false;
      }
      this.$store.commit("setPopupState", {
        type: "connectWallet",
        isShow: true,
      });
    },
    async disconnect() {
      const walletType = localStorage.getItem("walletType");
      if (walletType === "walletConnect") {
        const walletConnectProvider = new WalletConnectProvider({
          bridge: "https://bridge.walletconnect.org",
          rpc: {
            43113: "https://api.avax-test.network/ext/bc/C/rpc",
            43114: "https://api.avax.network/ext/bc/C/rpc",
          },
        });
        await walletConnectProvider.killSession();
      }
      delete window.localStorage.walletType;
      window.location.reload();
    },
  },
  components: {
    ButtonLoader,
  },
};
</script>
<style lang="scss" scoped>
.slicedAddress {
  height: 16px;
  width: 65px;
  opacity: 0.5;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
}

.connected-btn {
  height: 40px;
  width: 104px;
  border-radius: 100px;
  margin: 24px 0;

  //Typography
  font-family: Work Sans, sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;

  line-height: 16px;
  letter-spacing: 0;
  text-align: center;
  padding: 4px 12px;
  background: rgba(28, 28, 28, 0.16);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

.connect-btn {
  background: #e7fc6e;
  border-radius: 21px;

  height: 32px;
  width: 90px;
  padding: 6px 16px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;

  text-align: center;
  color: #000000;
}

@media screen and(max-width: 980px) {
  .btn-text {
    height: 31px;
    margin: 0;
  }
  .connected-btn {
    width: auto;
    padding: 0;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    margin: 0;
  }
  .slicedAddress {
    width: auto;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
