<template>
  <div class="total-item">
    <h2 v-if="type === 'collateral'">Total {{ type }}ised</h2>
    <h2 v-if="type === 'borrow'">Total {{ type }}ed</h2>
    <!--    <div class="img-wrap">-->
    <!--      <img class="type-icon" :src="icon" alt="" />-->
    <!--    </div>-->
    <div class="token-container">
      <TokenIcon v-if="type === 'borrow'" :token="'NXUSD'"/>
      <p class="count-text">{{ amount }}</p>
      <p v-if="type === 'borrow'" class="token-text">NXUSD</p>
    </div>
    <p v-if="count" class="info-text">{{ type }}ed from {{ count }} pools</p>
  </div>
</template>

<script>
import TokenIcon from "../UiComponents/TokenIcon";

export default {
  components: {TokenIcon},
  props: {
    type: {
      type: String,
      require: true,
    },
    icon: {
      require: true,
    },
    amount: {
      default: 0,
    },
    count: {
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/mixins/screen-size";

.token-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @include respond-to(sm) {
    justify-content: flex-start;
  }
}

.total-item {
  background: $clrBg1;
  border-radius: 4px;
  padding: 24px;
  min-height: 100%;
  position: relative;
  @include respond-to(sm) {
    padding: 16px;
    max-height: 105px;
  }

  .left-bg {
    width: 58px;
    height: auto;
    position: absolute;
    bottom: 0;
    left: 14px;
  }

  .right-bg {
    width: 88px;
    height: auto;
    position: absolute;
    bottom: 0;
    right: 4px;
  }

  h2 {
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 40px;
    text-align: left;
    @include respond-to(sm) {
      font-size: 20px;
      margin-bottom: 8px;
    }
  }

  .img-wrap {
    height: 60px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .type-icon {
    width: 32px;
    height: auto;
    object-fit: contain;
  }

  .count-text {
    text-align: left;
    font-size: 32px;
    line-height: 36px;
    text-transform: uppercase;
    padding-bottom: 8px;
    @include respond-to(sm) {
      font-size: 28px;
      margin-right: 8px;
    }

  }

  .token-text {
    font-size: 18px;
    line-height: 44px;
    text-transform: uppercase;
    padding-bottom: 8px;
    @include respond-to(sm) {
      font-size: 14px;
    }
  }

  .info-text {
    font-size: 16px;
    line-height: 24px;
    text-align: left;
    color: #8a8a8a;
  }
}
</style>
