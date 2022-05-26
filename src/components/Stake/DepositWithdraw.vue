<template>
<div class="deposit-withdraw-block">
  <BackButton :text="'Back'" @click="toStake" />
  <div
    v-if="actionType === 'deposit' && overview === false"
    class="deposit-withdraw-container"
  >

    <h1>How much would you like to deposit?</h1>
    <p>Please enter amount you would like to deposit. The maximum amount you can deposit is shown below.</p>
    <div class="available-amount">
      <h2>Available to deposit</h2>
      <h3>{{availableDeposit}}<span> NXUSD</span></h3>
    </div>
    <ValueInput
      :max="availableDeposit"
      :show-max="true"
      :valueName="pool.name"
      @onchange="updateValue"
      :parentValue="valueAmount"
      :error="valueError"
    />
    <button
      class="continue"
      @click="toOverview"
    >
      Continue
    </button>
  </div>

  <div v-if="overview" class="deposit-withdraw-container">
    <h1>Deposit overview</h1>
    <p>These are your transaction details. Make sure to check if this is correct before submitting.</p>
    <div class="currency-overview">
      <h2>Currency</h2>
      <TokenIcon :token="pool.name"/>
      <div>
        {{valueAmount}}
        {{pool.name}}
        <p style="margin: 0">$ {{valueToUsd.toFixed(2)}}</p>
      </div>
    </div>
  </div>

  <div v-if="actionType === 'withdraw'" class="deposit-withdraw-container">
    <h1>Withdraw</h1>
    <p>How much do you want to withdraw?</p>
    <div class="available-amount">
      <h2>Available to withdraw</h2>
      <h3>{{availableWithdraw}}<span> NXUSD</span></h3>
    </div>
    <ValueInput
      :max="availableWithdraw"
      :show-max="true"
      :valueName="pool.name"
      @onchange="updateValue"
      :parentValue="valueAmount"
      :error="valueError"
    />
    <button
      class="continue"
      :disabled="actionBtnText === false"
    >
      Continue
    </button>
  </div>
</div>
</template>

<script>
import ValueInput from "@/components/UiComponents/ValueInput";
import TokenIcon from "@/components/UiComponents/TokenIcon";
const BackButton = () => import("@/components/UiComponents/BackButton");

export default {
  name: "DepositWithdraw",
  data() {
    return {
      overview: false,
      valueAmount: "",
      valueToUsd: "0",
      valueError: "",
    }
  },
  props: {
    actionType: {
      type: String,
    },
    pool: {
      type: Object,
      required: true,
    },
  },
  methods: {
    toStake() {
      this.overview = false;
     // this.$router.push({ name: "Stand" });
    },
    toOverview() {
      this.overview = true;
    },
    updateValue(value) {
      if (parseFloat(value) > parseFloat(this.maxPairValue)) {
        this.valueError = `Insufficient amount. The value available ${this.maxPairValue}`;
        return false;
      } else {
        this.valueAmount = value;
        this.valueToUsd = value * this.tokenToUSD;
        console.log("tokenPrice", this.tokenToUSD);
      }
    },
    // actionHandler() {
    //   if (this.valueAmount && parseFloat(this.valueAmount) > 0) {
    //     if (this.actionType === "deposit") {
    //       const parsedAmount = this.$ethers.utils.parseUnits(
    //         this.valueAmount.toString(),
    //         this.mainValueDecimals
    //       );
    //
    //
    //       const payload = {
    //         collateralAmount: parsedAmount,
    //         amount: parsedPair,
    //         updatePrice: this.updatePrice,
    //       };
    //
    //       if (this.multiplier > 1) {
    //         payload.amount = this.toFixed(this.pairValue, 6);
    //         this.multiplierHandle(payload, "addAndBorrowMultiple");
    //         return false;
    //       }
    //       this.$emit("addAndBorrow", payload);
    //       this.clearData();
    //     }
    //   }
    // },
  },
  computed: {
    availableDeposit() {
      return this.$store.getters.getUserBorrowPart(this.pool.id);
    },
    availableWithdraw() {
      return this.$store.getters.getUserCollateralShare(this.pool.id);
    },
    actionBtnText() {
      console.log(this.valueAmount);
      if(this.valueAmount.toString === undefined || this.valueAmount < 0)
        return false;
      else
        return true;
    },
    tokenToUSD() {
      const tokenToNUSD = 1 / this.pool.tokenPrice;
      // eslint-disable-next-line no-useless-escape
      let re = new RegExp(`^-?\\d+(?:\.\\d{0,` + (4 || -1) + `})?`);
      return tokenToNUSD.toString().match(re)[0];
    },
  },
  watch: {
    actionType() {
      this.clearData();
    },
  },
  components: {
    TokenIcon,
    ValueInput,
    BackButton,
  }
};
</script>

<style scoped lang="scss">
.deposit-withdraw-block {
  width: 592px;
  height: 544px;

  background: #262626;
  border-radius: 4px;

  padding: 32px 24px;

  .deposit-withdraw-container {
    margin-top: 40px;
    width: 388px;
    margin-left: auto;
    margin-right: auto;

    h1 {
      text-align: left;
    }
    h2, span {
      font-weight: 400;
      text-align: left;
      font-size: 16px;
      color: #FFFFFF;
    }
    h3 {
      font-weight: 600;
      font-size: 16px;
      text-align: right;
      color: #F2F4FE;
    }
    p {
      text-align: left;
      margin: 8px 0 24px 0;
      font-size: 14px;

      color: #8A8A8A;
    }

    .available-amount {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      margin-bottom: 16px;
    }
  }
  .continue {
    width: 388px;
    height: 40px;

    background: #E7FC6E;
    border-radius: 20px;

    margin-top: 24px;
  }

  .currency-overview {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 20px 16px 16.6px 16px;
    border: 1px solid #606060;
    border-radius: 4px;

    .token-icon-wrap {
      width: 16px;
      height: 16px;
      margin-left: auto;
      margin-right: 4px;
      margin-bottom: 16px;
    }
  }
}
</style>