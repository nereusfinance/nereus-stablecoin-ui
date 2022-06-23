<template>
  <div class="mobile-menu">
<!--    <div class="like-header">-->
<!--      <img-->
<!--        src="@/assets/images/mobile-menu.svg"-->
<!--        alt=""-->
<!--        class="mobile-btn"-->
<!--        @click="hideMenu"-->
<!--      />-->
<!--    </div>-->

    <div class="blur"/>
    <div class="side-menu">
      <div class="btn-wrap">
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
mobile-menu {
  width: 100%;
}
.blur {
  z-index: 2;
  position: absolute;
  width: 100%;
  top: -20px;
  height: 200%;
  background: #1C1C1C;
  opacity: 0.5;
}

.side-menu {
  flex: 1;
  padding-top: 20px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 85%;
  background-color: #262626;
  z-index: 400;
  display: flex;
  flex-direction: column;

  .like-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 90px;
    min-height: 90px;

    .mobile-btn {
      width: 24px;
      height: auto;
      object-fit: contain;
      cursor: pointer;
    }
  }

  .btn-wrap {
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
