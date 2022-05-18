<template>
  <div class="popup-wrap" v-if="popupActiveType">
    <SwapPopup @close="closePopup" v-if="popupActiveType === 'swap'" />
    <TokenStakePupup
      @close="closePopup"
      v-if="popupActiveType === 'token-stake'"
    />
    <DepositPopup @close="closePopup" v-if="popupActiveType === 'deposit'" />
    <BrowserPopup @close="closePopup" v-if="popupActiveType === 'browser'" />
    <ConnectWalletModal v-if="popupActiveType === 'connectWallet'" />
    <DevicePopup
      @close="closePopup"
      v-if="popupActiveType === 'device-error'"
    />
    <TransactionSuccessPopup
      @close="closePopup"
      v-if="popupActiveType === 'transaction'"
    />
    <NetworkPopup @close="closePopup" v-if="popupActiveType === 'network'" />
    <DeleveragePopup
      @close="closePopup"
      v-if="popupActiveType === 'deleverage'"
    />
    <WrongNetworkPopup
      @close="closePopup"
      v-if="popupActiveType === 'wrong-network'"
    />
    <StakePopup @close="closePopup" v-if="popupActiveType === 'stake'" />
    <UnstakePopup @close="closePopup" v-if="popupActiveType === 'unstake'" />
    <MobileMenu v-if="popupActiveType === 'sidemenu'" />
  </div>
</template>

<script>
const SwapPopup = () => import("@/components/Popups/SwapPopup");
const StakePopup = () => import("@/components/Popups/StakePopup");
const UnstakePopup = () => import("@/components/Popups/UnstakePopup");
const TokenStakePupup = () => import("@/components/Popups/TokenStakePupup");
const DepositPopup = () => import("@/components/Popups/DepositPopup");
const BrowserPopup = () => import("@/components/Popups/BrowserPopup");
const DevicePopup = () => import("@/components/Popups/DeviceError");
const WrongNetworkPopup = () => import("@/components/Popups/WrongNetworkPopup");
const ConnectWalletModal = () =>
  import("@/components/UiComponents/ConnectWalletModal");
const TransactionSuccessPopup = () =>
  import("@/components/Popups/TransactionSuccess");
const NetworkPopup = () => import("@/components/Popups/NetworkPopup");
const MobileMenu = () => import("@/components/MobileMenu");
const DeleveragePopup = () => import("@/components/Popups/DeleveragePopup");

export default {
  methods: {
    closePopup() {
      this.$store.commit("closePopups");
    },
  },
  computed: {
    popupActiveType() {
      return this.$store.getters.getPopupType;
    },
  },
  components: {
    SwapPopup,
    DepositPopup,
    BrowserPopup,
    TransactionSuccessPopup,
    NetworkPopup,
    MobileMenu,
    TokenStakePupup,
    WrongNetworkPopup,
    StakePopup,
    UnstakePopup,
    DevicePopup,
    ConnectWalletModal,
    DeleveragePopup,
  },
};
</script>

<style lang="scss" scoped>
.popup-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding-bottom: 60px;
  padding-top: $headerHeight;
  background-color: transparentize(#000000, 0.3);
}

@media screen and(max-width: 640px) {
  .popup-wrap {
    display: block;
    padding-bottom: 30px;
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
