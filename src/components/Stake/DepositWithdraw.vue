<template>
<div class="deposit-withdraw-block">
  <BackButton :text="'Back'" @click="toStake" />
  <div v-if="actionType === 'deposit'" class="deposit-withdraw-container">
    <h1>How much would you like to deposit?</h1>
    <p>Please enter amount you would like to deposit. The maximum amount you can deposit is shown below.</p>
    <div class="available-amount">
      <h2>Available to deposit</h2>
      <h3>3,710.07 <span>NXUSD</span></h3>
    </div>
    <ValueInput
      :value-name="pool.name"
    />
    <button class="continue">Continue</button>
  </div>

  <div v-if="actionType === 'withdraw'" class="deposit-withdraw-container">
    <h1>Withdraw</h1>
    <p>How much do you want to withdraw?</p>
    <div class="available-amount">
      <h2>Available to withdraw</h2>
      <h3>3,710.07 <span>NXUSD</span></h3>
    </div>
    <ValueInput
      :value-name="pool.name"
    />
    <button class="continue">Continue</button>
  </div>
</div>
</template>

<script>
import ValueInput from "@/components/UiComponents/ValueInput";
const BackButton = () => import("@/components/UiComponents/BackButton");

export default {
  name: "DepositWithdraw",
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
      this.$router.push({ name: "Stand" });
    },
  },
  watch: {
    actionType() {
      this.clearData();
    },
  },
  components: {
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
}
</style>