<template>
  <footer :class="{ transparent: itsTransparent }" class="app-footer">
    <div class="container">
      <div class="leftLinks">
        <SocialLink
          v-for="(item, index) in filteredLeftIcons"
          :key="index"
          :data="item.data"
          :link="item.link"
          :type="item.type"
        />
      </div>
      <div class="rightLinks">
        <SocialLink
          v-for="(item, index) in filteredRightIcons"
          :key="index"
          :data="item.data"
          :link="item.link"
          :type="item.type"
        />
      </div>
    </div>
  </footer>
</template>

<script>
const SocialLink = () => import("@/components/SocialLink");
import Discord from "@/assets/images/Discord.svg";
import Twitter from "@/assets/images/Twitter.svg";
import Medium from "@/assets/images/Medium.svg";

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
          data: Discord,
          link: "https://discord.gg/4tw3VsuTf9",
          position: "right",
          type: "image",
        },
        {
          data: Twitter,
          link: "https://twitter.com/nereusfinance",
          position: "right",
          type: "image",
        },
        {
          data: Medium,
          link: "https://medium.com/nereus-protocol",
          position: "right",
          type: "image",
        },
      ],
      filteredRightIcons: [],
      filteredLeftIcons: [],
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SocialLink,
  },
  computed: {
    itsTransparent() {
      const pages = ["Docs", "Tech", "Liquidations"];

      return pages.indexOf(this.$route.name) !== -1;
    },
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
@import "src/mixins/screen-size";

.app-footer {
  z-index: 1;
  height: $footerHeight;
  background: #262626;
  display: flex;
  align-items: center;
  @include respond-to(sm) {
    background: transparent;
    position: absolute;
    bottom: 0;
    width: calc(100% - 30px);
  }

  &.transparent {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .container {
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 2;
    margin: auto;
    justify-content: space-between;
    width: 100%;
    @include respond-to(sm) {
      padding: 0 !important;
    }
  }

  .rightLinks {
    display: flex;
    align-items: center;
  }

  .leftLinks {
    display: flex;
    align-items: center;
  }
}

@media screen and(min-width: 1201px) {
  .container {
    padding: 0 80px;
  }
}
@media screen and(max-width: 1200px) {
  .app-footer {
    position: fixed;
    padding: 0 20px;
    width: 100%;
    bottom: 0px;
    right: 0;
  }
  .container {
    padding: 0 0 16px 0;
  }
  .app-footer .container .links-wrap .link-item.ml {
    margin-left: 30px;
  }
  .app-footer .container {
    height: auto;
  }
  .app-footer .container {
    transform: translateY(25%);
    margin-left: 0;
  }
}
</style>
