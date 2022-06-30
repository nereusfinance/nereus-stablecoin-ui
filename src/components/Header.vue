<template>
  <header :class="{ transparent: itsTransparent }" class="app-header">
    <div class="container">
      <div class="containerS">
        <div>
          <router-link :to="{ name: 'Stand' }" class="logo-wrap">
            <img alt="" class="logo" src="@/assets/images/text-logo.svg" />
          </router-link>
        </div>
        <a class="nereus-btn" href="https://app.nereus.finance/#/markets"
          >Nereus Markets</a
        >
      </div>

      <nav>
        <div>
          <router-link
            :to="{ name: 'Stand' }"
            active="onclick"
            class="markets-btn"
          >
            Markets
          </router-link>
          <router-link
            :to="{ name: 'Stake' }"
            active="onclick"
            class="stake-btn"
          >
            Earn
          </router-link>
          <router-link
            :to="{ name: 'Dashboard' }"
            active="onclick"
            class="dashboard-btn"
          >
            My Dashboard
          </router-link>
        </div>
        <div class="btn-margin">
          <ConnectButton />
        </div>
      </nav>
      <div class="mobile-connect-btn">
        <img
            src="@/assets/images/mobile-menu.svg"
            alt=""
            class="mobile-btn"
            @click="menuClickHandler"
        />
        <ConnectButton :class="'connected'"/>
      </div>
    </div>
  </header>
</template>

<script>
const ConnectButton = () => import("@/components/UiComponents/ConnectButton");

export default {
  computed: {
    itsTransparent() {
      const pages = ["Docs", "Tech", "Liquidations"];

      return pages.indexOf(this.$route.name) !== -1;
    },
    // activeNetwork() {
    //   return this.$store.getters.getActiveNetwork;
    // },
    // itsDashboard() {
    //   return this.$route.name === "Dashboard";
    // },
  },
  methods: {
    showSwapPopup() {
      this.$store.commit("setPopupState", {
        type: "swap",
        isShow: true,
      });
    },
    // networkClickHandler() {
    //   this.$store.commit("setPopupState", {
    //     type: "network",
    //     isShow: true,
    //   });
    // },
    menuClickHandler() {
      const isAlreadyOpen = this.$store.getters.getPopupState;
      const openPopupType = this.$store.getters.getPopupType;

      if (isAlreadyOpen && openPopupType === "sidemenu") {
        this.$store.commit("closePopups");
        return;
      }

      this.$store.commit("setPopupState", {
        type: "sidemenu",
        isShow: true,
      });
    },
  },
  components: {
    ConnectButton,
    //TokenButton,
  },
};
</script>

<style lang="scss" scoped>
@import "../mixins/screen-size";

.app-header {
  background: #4d4aec;
  height: $headerHeight;
  z-index: 2;

  &.transparent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;

    //.logo-bg {
    //  display: block;
    //}
  }

  //.logo-bg {
  //  display: none;
  //
  //  position: absolute;
  //  top: -30px;
  //  left: -125px;
  //  width: auto;
  //  z-index: 1;
  //}

  .container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 0 16px;
    width: 100%;
  }

  .mobile-connect-btn {
    display: none;
    .connected{
      margin-left: 20px;
    }
  }

  .containerS {
    display: flex;
    align-items: center;
  }

  .logo {
    height: 32px;
    width: 146px;
    object-fit: contain;
    z-index: 2;
  }

  router-link:active {
    background: rgba(28, 28, 28, 0.16);
  }

  nav {
    display: flex;
    align-items: center;
    flex-direction: row;
    z-index: 2;
    justify-content: space-between;

    .btn-margin {
      margin-left: 12px;
    }
  }

  .stake-btn {
    color: #ffffff;
    font-size: 16px;
    font-style: normal;
    text-align: center;
    align-items: center;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    padding: 8px 9px 8px 15px;
    width: auto;
    height: 32px;
    border-radius: 21px;
    margin-right: 12px;

    &:hover {
      color: $clrNavHover;
      background: rgba(28, 28, 28, 0.16);
    }
  }

  a.stake-btn.router-link-exact-active.router-link-active,
  a.markets-btn.router-link-exact-active.router-link-active,
  a.dashboard-btn.router-link-exact-active.router-link-active {
    background: rgba(28, 28, 28, 0.16);
  }

  .dashboard-btn {
    color: #ffffff;
    font-size: 16px;
    font-style: normal;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    padding: 8px 15px;
    width: auto;
    height: 32px;
    border-radius: 21px;

    &:hover {
      color: $clrNavHover;
      background: rgba(28, 28, 28, 0.16);
    }
  }

  .markets-btn {
    color: #ffffff;
    font-size: 16px;
    font-style: normal;
    text-align: center;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    padding: 8px 9px 8px 15px;
    width: auto;
    height: 32px;
    border-radius: 21px;
    margin-right: 12px;

    &:hover {
      background: rgba(28, 28, 28, 0.16);
      color: $clrNavHover;
    }
  }

  .nereus-btn {
    padding: 6px 16px;
    height: 32px;
    width: 139px;
    border-radius: 16px;

    margin-left: 40px;
    top: 24px;
    background: #55bcc0;
    font-family: "Work Sans", sans-serif;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;

    color: #ffffff;
    flex: none;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;

    @include respond-to(sm) {
      margin-left: 16px;
    }

    &:hover {
      color: black;
      background: #e7fc6e;
    }
  }

  @media screen and(min-width: 1201px) {
    .mobile-btn {
      display: none;
    }
  }
}

@media screen and(max-width: 1200px) {
  .app-header .logo {
    width: 170px;
  }
  .app-header .mobile-connect-btn {
    display: flex;
  }

  .btn-margin {
    margin-left: 15px;
  }
  .app-header.transparent .logo-bg {
    display: none;
  }
  .app-header nav {
    display: none;
  }
}

@media screen and(max-width: 980px) {
  .app-header.transparent .logo-bg {
    display: none;
  }
  .app-header nav {
    display: none;
  }
  .mobile-btn {
    margin-right: 6px;
  }
  .app-header .mobile-connect-btn {
    display: flex;
  }

  .app-header .logo {
    width: 130px;
  }
}

@media screen and(max-width: 500px) {
  .app-header .connected {
    display: none;
  }
}
</style>
