<template>
  <div class="coll-params-block">
    <h2>My Open Position</h2>

    <div class="items-wrap">
      <CollParamItem
        v-for="(item, idx) in getInfoItems"
        :key="idx"
        :item="item"
      />
    </div>

    <p class="btm-text">1 NXUSD = 1 USD</p>
    <p class="btm-text">1 {{ tokenName }} = {{ tokenToNUSD }} NXUSD</p>
  </div>
</template>

<script>
const CollParamItem = () => import("@/components/Pool/CollParamItem");
export default {
  props: {
    infoItems: {
      type: Array,
      required: true,
    },
    exchangeRate: {
      required: true,
    },
    tokenName: {
      type: String,
      required: true,
    },
  },
  computed: {
    tokenToNUSD() {
      const tokenToNUSD = 1 / this.exchangeRate;
      // eslint-disable-next-line no-useless-escape
      let re = new RegExp(`^-?\\d+(?:\.\\d{0,` + (6 || -1) + `})?`);
      return tokenToNUSD.toString().match(re)[0];
    },
    getInfoItems() {
      return this.infoItems;
    },
  },
  components: {
    CollParamItem,
  },
};
</script>

<style lang="scss" scoped>
@import "src/mixins/screen-size";

.coll-params-block {
  background: $clrBg2;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  .btm-text,
  h2 {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 16px;
  }

  .btm-text {
    @include respond-to(sm) {
      margin-bottom: 8px;
    }
  }

  h2 {
    padding: 16px 24px;
    border-bottom: 1px solid #1c1c1c;
    @include respond-to(sm) {
      padding: 16px 16px;
      font-size: 16px;
    }
  }

  .items-wrap {
    flex: 1;
    max-height: 380px;
    overflow-y: auto;
    padding-right: 5px;
    margin-bottom: auto;
    @include respond-to(sm) {
      padding-right: 0;
    }
  }
}

@media screen and(max-width: 780px) {
  .coll-params-block {
    padding-bottom: 8px;
  }
}
</style>
