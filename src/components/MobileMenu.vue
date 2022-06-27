<template>
  <div class="mobile-menu">
    <div class="like-header">
      <NetworkButton @click="networkClickHandler" v-if="isConnected" />
      <ConnectButton class="btn-connect" v-else />
    </div>

    <nav>
      <router-link :to="{ name: 'Stand' }" class="nav-link"
        >Markets</router-link
      >
      <router-link :to="{ name: 'Dashboard' }" class="nav-link"
        >My Dashboard</router-link
      >
      <router-link :to="{ name: 'Stake' }" class="nav-link">Earn</router-link>
    </nav>
    <div class="footer">
        <div class="leftLinks">
          <SocialLink
            v-for="(item, index) in filteredLeftIcons"
            :key="index"
            :data="item.data"
            :link="item.link"
            :type="item.type"
            class="git-book"
          />
        </div>
        <div class="rightLinks">
          <SocialLink
            v-for="(item, index) in filteredRightIcons"
            :key="index"
            :data="item.data"
            :link="item.link"
            :type="item.type"
            class="media"
          />
        </div>
      </div>
  </div>
</template>

<script>
import DiscordWhite from "@/assets/images/DiscordWhite.svg";
import TwitterWhite from "@/assets/images/TwitterWhite.svg";
import MediumWhite from "@/assets/images/MediumWhite.svg";

const NetworkButton = () => import("@/components/UiComponents/NetworkButton");
const ConnectButton = () => import("@/components/UiComponents/ConnectButton");
const SocialLink = () => import("@/components/SocialLink");
export default {
  data() {
    return {
      socialLink: [
        {
          data: "GitBook",
          link: "https://docs.nereus.finance/",
          position: "left",
          type: "text",
        },
        {
          data: DiscordWhite,
          link: "https://discord.gg/4tw3VsuTf9",
          position: "right",
          type: "image",
        },
        {
          data: TwitterWhite,
          link: "https://twitter.com/nereusfinance",
          position: "right",
          type: "image",
        },
        {
          data: MediumWhite,
          link: "https://medium.com/nereus-protocol",
          position: "right",
          type: "image",
        },
      ],
      filteredRightIcons: [],
      filteredLeftIcons: [],
    };
  },
  watch: {
    $route() {
      this.hideMenu();
    },
    isConnected() {
      return this.$store.getters.getWalletIsConnected;
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
    NetworkButton,
    ConnectButton,
    SocialLink,
  },
  mounted() {
    this.socialLink.forEach((item) => {
      if (item.position === "left") {
        this.filteredLeftIcons.push(item);
      } else if (item.position === "right") {
        this.filteredRightIcons.push(item);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.mobile-menu {
  padding-top: 0;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 40%;
  background-color: $clrBg1;
  z-index: 400;
  display: flex;
  flex-direction: column;

  .footer {
    position: absolute;
    bottom: 5px;
    width: 100%;
    border-top: 1px solid black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 18px 18px 6px 16px ;
    .git-book{
      color: #fff;
    }
    .rightLinks{
      display: flex;
    }
  }

  .like-header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90px;
    min-height: 90px;
    border-bottom: 1px solid black;
    .btn-connect {
      width: 100%;
      height: 48px;
    }

    .mobile-btn {
      width: 24px;
      height: auto;
      object-fit: contain;
      cursor: pointer;
    }
  }

  .btns-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 40px;

    .btn-ml {
      margin-left: 15px;
    }
  }

  nav {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    margin-top: 20px;
  }

  .nav-link {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 1.2;
    text-transform: uppercase;
    color: #ffffff;
    margin: 18px 0;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: $clrNavHover;
    }
  }
}

@media screen and(max-width: 610px) {
  .mobile-menu {
    width: 50%;
  }
}
</style>
