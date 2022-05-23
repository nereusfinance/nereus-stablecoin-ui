<template>
  <div class="leverage-bar">

    <div class="bar-wrap">

      <div class="slider-wrapper">
          <Slider
            :value="sliderValue"
            :step="0.25"
            :min="1"
            :max="15"
            @changeValue="testOnChangeValue"
          />
      </div>
      <div class="liquidation-price-text">Liquidation Price ~ {{ leverageData.liquidationPrice }}</div>

      <div class="item-main">
        <p>Expected NXUSD amount</p>
        <p class="percent-text">
          <span>~ </span>{{leverageData.expectedNXUSDAmount}}
        </p>
      </div>

      <div class="item-main">
        <p>Expected leverage</p>
        <p>~ {{ sliderValueFormatted }}x</p>
      </div>

      <div class="liquid-text">
        The price of the collateral has to decrease approximately by
          <span style="color: #FDD33F">{{ leverageData.liquidationRisk }}</span>
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
    leverageData() {
      const borrowPerc = (this.pool.ltv-this.$store.getters.getBorrowFee(this.pool.id))/100;
      const inputAmount = +this.$store.getters.getUserCollateralShare(this.pool.id)*this.tokentToNUSD -
      +this.$store.getters.getUserBorrowPart(this.pool.id)/borrowPerc;
      let cycleAmount = inputAmount;
      let resultAmount = 0;
      let decimalPart = this.sliderValue - Math.floor(this.sliderValue)
      for (let i = 0; i < this.sliderValue; i++) {
        if ( this.sliderValue-i >= 1 ){
          resultAmount+=cycleAmount;
          cycleAmount=cycleAmount*borrowPerc;
        } else {
          cycleAmount=cycleAmount*decimalPart;
          resultAmount+=cycleAmount;
        }
      }
      const maxBorrowAmount=resultAmount*borrowPerc;
      const availableBorrow = maxBorrowAmount-resultAmount+inputAmount;
      let priceDecreaseToLiquidate = availableBorrow/resultAmount/
          (1-this.$store.getters.getBorrowFee(this.pool.id)/100)*100;
      if (priceDecreaseToLiquidate>100){
        priceDecreaseToLiquidate=100
      }
      const expectedNXUSDAmount = resultAmount - inputAmount + +this.$store.getters.getUserBorrowPart(this.pool.id);
      // console.log('maxBorrowAmount', maxBorrowAmount);
      // console.log('borrowed', resultAmount-inputAmount);
      // console.log('availiable to borrow', availableBorrow);
      // console.log('liquidationDecreaseAmount', priceDecreaseToLiquidate, '%');
      return {
        liquidationRisk: parseFloat(priceDecreaseToLiquidate).toFixed(2),
        expectedNXUSDAmount: expectedNXUSDAmount.toFixed(4),
        liquidationPrice: parseFloat(this.tokentToNUSD*(100-priceDecreaseToLiquidate)/100).toFixed(4)
      }
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
