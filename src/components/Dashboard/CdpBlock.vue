<template>
  <div class="cdp-block">
    <h2>Opened deals</h2>

    <div v-if="pools.length" class="items-wrap">
      <CdpItem v-for="pool in pools" :key="pool.id" :pool="pool"/>
    </div>
    <p v-else>You have no opened deals yet</p>
  </div>
</template>

<script>
const CdpItem = () => import("@/components/Dashboard/CdpItem");
export default {
  props: {
    pools: {
      type: Array,
    },
  },
  components: {
    CdpItem,
  },
};
</script>

<style lang="scss" scoped>
@import "src/mixins/screen-size";

.cdp-block {
  background: $clrBg1;
  border-radius: 4px;
  padding: 33px 24px;
  min-height: 252px;
  position: relative;
  @include respond-to(sm) {
    padding: 16px;
    min-height: 96px;
    max-height: 96px;
  }

  h2 {
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 42px;
    text-align: left;
    @include respond-to(sm) {
      font-size: 20px;
      margin-bottom: 12px;
    }
  }

  p {
    color: $clrDisableText;
    text-align: left;
    @include respond-to(sm) {
      font-size: 16px;
    }
  }
}

@media screen and(max-width: 1024px) {
  .cdp-block {
    min-height: 96px;
  }
}
</style>
