<template>
  <div class="mobile-menu">
    <div class="side-menu">
      <img
        src="@/assets/images/mobile-menu.svg"
        alt=""
        class="mobile-btn"
        @click="hideMenu"
      />
      <div class="connect-btn">
        <ConnectButton />
      </div>

      <hr class="hr-top"/>
      <nav>
        <router-link :to="{ name: 'Stand' }" class="nav-link"
          >Markets</router-link
        >
        <router-link :to="{ name: 'Dashboard' }" class="nav-link"
          >My Dashboard</router-link
        >
        <router-link :to="{ name: 'Stake' }" class="nav-link">Earn</router-link>
      </nav>
      <hr/>
      <Footer />
    </div>
  </div>
</template>

<script>
const Footer = () => import("@/components/Footer");
const ConnectButton = () => import("@/components/UiComponents/ConnectButton");
export default {
  watch: {
    $route() {
      this.hideMenu();
    },
  },
  methods: {
    hideMenu() {
      this.$store.commit("closePopups");
    },
    networkClickHandler() {
      this.$store.commit("setPopupState", {
        type: "network",
        isShow: true,
      });
    },
    showSwapPopup() {
      this.$store.commit("setPopupState", {
        type: "swap",
        isShow: true,
      });
    },
  },
  components: {
    ConnectButton,
    Footer,
  },
};
</script>

<style lang="scss" scoped>

.mobile-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.side-menu {
  flex: 1;
  padding-top: 20px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 304px;
  background-color: #262626;
  z-index: 400;
  display: flex;
  flex-direction: column;

  .mobile-btn {
    width: 24px;
    height: auto;
    margin-left: auto;
    margin-right: 20px;
    margin-bottom: 25px;
    object-fit: contain;
    cursor: pointer;
  }

  .connect-btn {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
  }

  nav {
    display: flex;
    flex-direction: column;
    text-align: center;
    overflow-y: auto;
  }

  .nav-link {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 1.2;
    text-transform: none;
    color: #ffffff;
    margin-bottom: 30px;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: $clrNavHover;
    }
  }

  hr {
    border-color: #1C1C1C;
    margin: auto 0 63px 0;
  }
  .hr-top {
    margin: 20px 0 30px 0;
  }
}
</style>