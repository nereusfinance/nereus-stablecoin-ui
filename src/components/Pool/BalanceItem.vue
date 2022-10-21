<template>
  <div class="balance-item">
    <div class="value-type">
      <TokenIcon :token="this.item.token" />
      <p>{{ this.item.token }}</p>
    </div>
    <div class="redeem-balance-item">
      <div>
        <Redeem
          v-if="this.item.useRedeem"
          :contract="this.item.contract"
          :balance="this.item.balance"
          v-on="$listeners"
        />
      </div>
      <p class="value-text">
        {{ balance }}
      </p>
    </div>
  </div>
</template>

<script>
const TokenIcon = () => import("@/components/UiComponents/TokenIcon");
const Redeem = () => import("@/components/Pool/Redeem");

export default {
  props: {
    item: {
      required: true,
    },
  },
  data() {
    return {
      userBalance: "xxx",
    };
  },
  methods: {
    parseBalance(value, decimals) {
      const parsedBalance = this.$ethers.utils.formatUnits(
        value.toString(),
        decimals
      );
      this.userBalance = parseFloat(parsedBalance).toFixed(4);
    },
  },
  computed: {
    balance() {
      this.parseBalance(this.item.balance, this.item.decimals);
      return this.userBalance;
    },
  },
  components: {
    TokenIcon,
    Redeem,
  },
};
</script>

<style lang="scss" scoped>
@import "src/mixins/screen-size";

.balance-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 0 24px;
  @include respond-to(sm) {
    padding: 0 16px;
    margin-bottom: 16px;
  }

  .value-text {
    font-size: 14px;
    line-height: 20px;
    font-weight: 700;
  }

  .value-type {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 20px;

    .type-icon {
      width: 16px;
      height: 16px;
      object-fit: contain;
      margin-right: 10px;
      @include respond-to(sm) {
        width: 24px;
        height: 24px;
      }
    }
  }

  .redeem-balance-item {
    display: flex;
    align-items: center;

    > :first-child {
      margin-right: 16px;
    }
  }
}
</style>
