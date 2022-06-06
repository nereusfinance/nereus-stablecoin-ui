<template>
  <div class="leverage-bar">
    <div class="bar-wrap">
      <div class="slider-wrapper">
        <Slider
          :cyData="'leverage-slider'"
          :value="sliderValue"
          :step="0.25"
          :min="1"
          :max="15"
          @changeValue="testOnChangeValue"
        />
      </div>
      <div class="liquidation-price-text">
        Liquidation Price ~ {{ leverageData.liquidationPrice }}
      </div>

      <div class="item-main">
        <p>Expected NXUSD amount</p>
        <p class="percent-text">
          <span>~ </span><span data-cy="expected-leverage">{{ leverageData.expectedNXUSDAmount }}</span>
        </p>
      </div>

      <div class="item-main">
        <p>Expected leverage</p>
        <p>~ {{ sliderValueFormatted }}x</p>
      </div>

      <div class="liquid-text">
        The price of the collateral has to decrease approximately by
        <span style="color: #fdd33f">{{ leverageData.liquidationRisk }} %</span>
        for you to get flagged for liquidation
      </div>
    </div>
  </div>
</template>

<script>
const Slider = () => import("@/components/UiComponents/Slider");
export default {
  props: {
    multiplier: {
      type: Number,
      required: true,
    },
    pool: {
      required: true,
    },
    tokentToNUSD: {
      required: true,
    },
    mainValue: {
      required: true,
    },
    pairValue: {
      required: true,
    },
    maxPairValue: {
      required: true,
    },
  },
  data() {
    return {
      sliderValue: "1",
    };
  },
  computed: {
    sliderValueFormatted() {
      let sliderValue = Number(this.sliderValue);
      return sliderValue.toFixed(2);
    },
    leverageData() {
      const borrowPerc =
        (100 - this.$store.getters.getBorrowFee(this.pool.id)) / 100;
      const amountMultiplyer =
        (this.pairValue * this.pool.ltv) / this.maxPairValue / 100;
      let startAmount = this.pairValue * borrowPerc;
      let finalBorrowAmount = 0;

      for (let i = this.sliderValue; i > 0; i--) {
        if (i > 1) {
          finalBorrowAmount += +startAmount;
          startAmount = startAmount * amountMultiplyer;
        } else {
          finalBorrowAmount += +startAmount * i;
        }
      }
      const resultCollateral =
        +this.$store.getters.getUserCollateralShare(this.pool.id) + +this.mainValue +
        finalBorrowAmount / this.tokentToNUSD;
      const resultBorrow =
        +this.$store.getters.getUserBorrowPart(this.pool.id) +
        finalBorrowAmount;
      const liquidationPrice =
        resultBorrow / ((resultCollateral * this.pool.ltv) / 100);
      const priceDifferens = this.tokentToNUSD - liquidationPrice;
      const liquidationRisk = (priceDifferens / this.tokentToNUSD) * 100;
      return {
        liquidationRisk: liquidationRisk.toFixed(2),
        expectedNXUSDAmount: (
          +finalBorrowAmount +
          +this.$store.getters.getUserBorrowPart(this.pool.id)
        ).toFixed(4),
        liquidationPrice: liquidationPrice.toFixed(4),
      };
    },
  },
  methods: {
    testOnChangeValue(val) {
      this.sliderValue = val;
      this.$emit("update", +val);
    },
  },
  components: {
    Slider,
  },
};
</script>

<style lang="scss" scoped>
@keyframes look_aside {
  from {
    transform: translateX(-50%) scaleX(-1);
  }
  to {
    transform: translateX(-50%) scaleX(1);
  }
}

.leverage-bar {
  .bar-wrap {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  }

  .multipliers-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    .multiplier-item {
      position: relative;

      .dani-mac {
        position: absolute;
        bottom: calc(100% + 10px);
        left: 50%;
        transform: translateX(-50%) scaleX(-1);
        width: 30px;
        height: auto;
        animation: 3s linear 1s 2 alternate look_aside;
      }

      &:hover,
      &.active {
        p {
          color: #e7fc6e;
        }
      }

      p {
        transition: all 0.3s ease;
        cursor: pointer;
      }
    }
  }
  .slider-wrapper {
    margin: 4px 0 4px;
  }
  .liquidation-price-text {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    text-align: left;
    color: #ffffff;
    margin-bottom: 24px;
  }
  .item-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 16px;
  }

  .liquid-text {
    text-align: left;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #ffffff;
  }
}
</style>
