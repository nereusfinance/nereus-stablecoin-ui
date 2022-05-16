<template>
  <div class="deleverage-bar">
    <p class="bar-title">
      {{ `Choose the amount of ${this.mainTokenName} you want to repay` }}
    </p>

    <p class="bar-conclusion">
      {{ `Liquidation Price ~ ${liquidationPriceFormatted}` }}
    </p>

    <p class="bar-title">Choose the amount of collateral you want to remove</p>

    <p class="bar-conclusion">
      {{ `${this.collateralToRemoveFormatted} ${this.pairTokenName}` }}
    </p>

    <div class="amount-to-repay">
      <p>{{ `Amount of ${this.mainTokenName} to repay` }}</p>
      <p class="amount-to-repay-value">{{ this.amountToRepayFormatted }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    amountToRepay: {
      type: String,
      required: true,
    },
    maxAmountToRepay: {
      type: String,
      required: true,
    },
    collateralToRemove: {
      type: String,
      required: true,
    },
    maxCollateralToRemove: {
      type: String,
      required: true,
    },
    pool: {
      type: Object,
      required: true,
    },
    liquidationPrice: {
      required: true,
    },
    mainTokenName: {
      type: String,
      required: true,
      default: "AVAX",
    },
    pairTokenName: {
      type: String,
      required: true,
      default: "AVAX",
    },
  },
  data() {
    return {
      maxMultiplier: 10,
    };
  },
  computed: {
    risk() {
      if (this.multiplier > 7) return "hight";
      if (this.multiplier > 3) return "medium";
      return "safe";
    },
    liquidationPriceFormatted() {
      return isNaN(this.liquidationPrice)
        ? "xx.xxx"
        : this.liquidationPrice.toFixed(4);
    },
    collateralToRemoveFormatted() {
      return this.collateralToRemove === 0 || this.collateralToRemove === ""
        ? "0"
        : this.collateralToRemove.toFixed(4);
    },
    amountToRepayFormatted() {
      return this.amountToRepay === 0 || this.amountToRepay === ""
        ? "0"
        : this.amountToRepay.toFixed(4);
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.deleverage-bar {
  margin: 24px 0px 16px;
  font-size: 12px;
  line-height: 16px;

  .bar-title {
    text-align: left;
  }

  .bar-conclusion {
    margin-bottom: 24px;
    text-align: left;
  }

  .amount-to-repay {
    line-height: 20px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    .amount-to-repay-value {
      font-weight: 600;
    }
  }

  // .range {
  //   height: 100%;
  //   width: 39%;
  //   border-radius: 39px;
  //   transition: all 0.3s ease;

  //   &.safe {
  //     background: #fdd33f;
  //   }

  //   &.medium {
  //     background: #fdd33f;
  //   }

  //   &.hight {
  //     background: #fdd33f;
  //   }
  // }
}
</style>
