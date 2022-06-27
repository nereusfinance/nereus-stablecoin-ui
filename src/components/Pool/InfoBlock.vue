<template>
  <div class="info-block">
    <div class="items-wrap">
      <CollParamItem v-for="(item, idx) in infoItems" :key="idx" :item="item"/>
    </div>
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
  },
  components: {
    CollParamItem,
  },
};
</script>

<style lang="scss" scoped>
@import "src/mixins/screen-size";

.info-block {
  padding: 24px 0;
  background: $clrBg2;
  border-radius: 4px;
  @include respond-to(sm) {
    padding: 16px 0 0 0;
  }

  .items-wrap {
    min-height: 150px;
    max-height: 200px;
    overflow-y: auto;
    padding-right: 5px;
    @include respond-to(sm) {
      padding: 0;
      min-height: 0;
    }
  }
}
</style>
