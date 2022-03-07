<template>
  <footer class="app-footer" :class="{ transparent: itsTransparent }">
    <div class="container">
      <SocialLink
        v-for="(item, index) in socialLink"
        :key="index"
        :data="item.data"
        :link="item.link"
        :position="item.position"
      />
    </div>
  </footer>
</template>

<script>
const SocialLink = () => import("@/components/SocialLink");
import imgDiscord from "@/assets/images/Discord.svg";
import imgTwitter from "@/assets/images/Twitter.svg";
import imgMedium from "@/assets/images/Medium.svg";

export default {
  data(){
    return {
      socialLink: [
        {
          data: 'GitBook',
          link: 'https://gitbook.com',
          position: 'left',
        },
        {
          data: imgDiscord,
          link: 'https://discord.com',
          position: 'right',
        },
        {
          data: imgTwitter,
          link: 'https://twitter.com',
          position: 'right',
        },
        {
          data: imgMedium,
          link: 'https://medium.com',
          position: 'right',
        },
      ],
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    SocialLink,
  },
  computed: {
    itsTransparent() {
      const pages = ["Home", "Docs", "Tech", "Liquidations"];

      return pages.indexOf(this.$route.name) !== -1;
    },
  },
};
</script>
<style scoped lang="scss">
.app-footer {
  height: $footerHeight;
  background: #262626;

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
    position: relative;
    z-index: 2;
    margin: auto;
  }
}

@media screen and(max-width: 980px) {
  .app-footer .container .footer-nav {
    display: none;
  }
}

@media screen and(max-width: 780px) {
  .app-footer .container .links-wrap .link-item.ml {
    margin-left: 30px;
  }
  .app-footer .container {
    height: auto;
    width: 45px;
  }

  .app-footer .container {
    transform: translateY(25%);
    margin-left: 0;
  }
}
</style>