<template>
  <div class="leverage-bar">

    <div class="bar-wrap">

      <div class="slider-wrapper">
          <Slider
            :value="sliderValue"
            :step="0.75"
            :min="0"
            :max="15"
            @changeValue="testOnChangeValue"
          />
      </div>
      <div class="liquidation-price-text">Liquidation Price ~ {{ liquidityPriceFormatted }}</div>

      <div class="item-main">
        <p>Expected NXUSD amount</p>
        <p class="percent-text">
          <span>~ </span>{{expectedNXUSDAmount}}
        </p>
      </div>

      <div class="item-main">
        <p>Expected leverage</p>
        <p>~ {{ sliderValueFormatted }}x</p>
      </div>

      <div class="liquid-text">
        The price of the collateral has to decrease approximately by
          <span style="color: #FDD33F">{{ liquidationRisk }}</span>
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
    }
  },
  data() {
    return {
      //multipliers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      sliderValue: "1",
    };
  },
  computed: {
    sliderValueFormatted() {
      let sliderValue = Number(this.sliderValue);
      return sliderValue.toFixed(2);
    },
    expectedNXUSDAmount() {
      let nxusdAmount = this.sliderValue * this.pairValue;
      return nxusdAmount.toFixed(4);
    },
    tokenPrice() {
      const tokenToNUSD = 1 / this.$store.getters.getTokenPrice(this.pool.id);
      return tokenToNUSD;
    },
    stableCoinMultiplyer() {
      if (this.$store.getters.getPoolLtv(this.pool.id) === 90) {
        return 10;
      }
      return 1;
    },
    priceDifference() {
      const priceDifference = this.tokenPrice - this.liquidationPrice;
      return priceDifference;
    },
    liquidationRisk() {
      if (
        +this.$store.getters.getUserBorrowPart(this.pool.id) +
        parseFloat(this.expectedNXUSDAmount) ===
        0 ||
        isNaN(this.liquidationPrice)
      )
        return parseFloat("0").toFixed(2);

      const riskPersent =
        ((this.priceDifference * this.stableCoinMultiplyer) / this.tokenPrice) *
        100;

      if (riskPersent > 100) {
        return 100;
      }

      return parseFloat(riskPersent).toFixed(2);
    },
    liquidationPrice() {
      const liquidationPrice =
        (+this.$store.getters.getUserBorrowPart(this.pool.id) +
          +this.expectedNXUSDAmount) /
        (((+this.$store.getters.getUserCollateralShare(this.pool.id) +
            +this.mainValue) *
            +this.pool.ltv) /
          100);
      return liquidationPrice;
    },

    liquidityPriceFormatted() {
      return this.liquidationPrice === "xxx.xx" || !this.liquidationPrice
        ? "xxx.xx"
        : parseFloat(this.liquidationPrice).toFixed(4);
    },
  },
  methods: {
    testOnChangeValue(val) {
      this.sliderValue = val;
    },
  },
  components: {
    Slider,
  }
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
    color: #FFFFFF;
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
    color: #FFFFFF;
  }
}
</style>
