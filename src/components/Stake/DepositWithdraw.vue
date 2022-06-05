<template>
<div class="deposit-withdraw-block">
  <BackButton :text="'Back'" v-if="overview === true" @click="toStake" />
  <BackButton :text="'Back'" v-else @click="onClick" />

  <div
    v-if="actionType === 'Deposit' && overview === false"
    class="deposit-withdraw-container"
  >
    <h1>How much would you like to deposit?</h1>
    <p>
      Please enter amount you would like to deposit. The maximum amount you can deposit is shown below.
    </p>
    <div class="available-amount">
      <h2>Available to deposit</h2>
      <h3>{{availableDeposit}}<span> NXUSD</span></h3>
    </div>
    <ValueInput
      :max="availableDeposit"
      :show-max="true"
      :valueName="pool.pairToken.name"
      @onchange="updateValue"
      :parentValue="valueAmount"
      :error="valueError"
      :isStake="true"
    />
    <button
      class="continue"
      :disabled="!btnText"
      @click="toOverview"
    >
      Continue
    </button>
  </div>

  <div v-if="actionType === 'Withdraw' && overview === false" class="deposit-withdraw-container">
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
      :isStake="true"
    />
    <button
      class="continue"
      :disabled="!btnText"
      @click="toOverview"
    >
      Continue
    </button>
  </div>

  <div v-if="overview" class="deposit-withdraw-container">
    <h1 v-if="transactionPending !== 'finished'">{{ actionType }} overview</h1>
    <p v-if="transactionPending !== 'finished'">
      These are your transaction details. Make sure to check if this is correct before submitting.
    </p>

    <h1 v-if="transactionPending === 'finished'">Congrats!</h1>
    <p v-if="transactionPending === 'finished'">Your action has been successfully executed</p>
    <div class="currency-overview">
      <h2>Currency</h2>
      <TokenIcon :token="pool.name"/>
      <div>
        {{valueAmount}}
        {{pool.name}}
        <p
          v-if="actionType === 'Deposit'"
          style=
            "margin: 0;
            text-align: right;
            font-size: 12px"
        >
          $ {{valueInUsd}}
        </p>
      </div>
    </div>
    <TransactionStatus
      v-if="actionType === 'Deposit'"
      :status-text="depositStatus"
      :transactionPending="transactionPending"
      :action="action"
    />
    <TransactionStatus
      v-if="actionType === 'Withdraw'"
      :statusText="withdrawStatus"
      :transactionPending="transactionPending"
      :action="action"
    />
    <div class="addAVAXToWallet" v-if="transactionPending === 'finished'">
      <img
        src="@/assets/images/icon-add.svg"
        alt=""
        class="add-icon"
      />
      Add AVAX to your browser wallet
    </div>
  </div>
</div>
</template>

<script>
import ValueInput from "@/components/UiComponents/ValueInput";
import TokenIcon from "@/components/UiComponents/TokenIcon";
import TransactionStatus from "@/components/UiComponents/TransactionStatus";
const BackButton = () => import("@/components/UiComponents/BackButton");

export default {
  name: "DepositWithdraw",
  data() {
    return {
      overview: false,
      valueAmount: "",
      valueToUsd: "0",
      valueError: "",
      depositStatus: ["Deposit", "Finished"],
      withdrawStatus: ["Approve", "Withdraw", "Finished"],
      transactionPending: "wait for action",
      btnText: false,
    }
  },
  props: {
    actionType: {
      type: String,
    },
    actionStatus: {
      required: true,
      type: Boolean,
    },
    pool: {
      type: Object,
      required: true,
    },
    onClick: {
      type: Function,
    },
  },
  methods: {
    async approveMasterContract() {
      try {
        const masterContract = await this.getMasterContract();

        console.log(
          "approveMasterContract",
          this.account,
          masterContract,
          true,
          this.$ethers.utils.formatBytes32String(""),
          this.$ethers.utils.formatBytes32String(""),
          this.$ethers.utils.formatBytes32String("")
        );

        const tx =
          await this.pool.masterContractInstance.setMasterContractApproval(
            this.account,
            masterContract,
            true,
            this.$ethers.utils.formatBytes32String(""),
            this.$ethers.utils.formatBytes32String(""),
            this.$ethers.utils.formatBytes32String("")
          );

        const receipt = await tx.wait();
        return receipt;
      } catch (e) {
        console.log("approveMasterContract err:", e);
        return false;
      }
    },
    async action(statusText) {
      if(statusText === "Deposit") {
        let tx = 2;
        if (tx === 1)
          this.transactionPending = "pending";
        else if (tx === 2)
          this.transactionPending = "finished";
        console.log(this.transactionPending);
      }
      if(statusText === "Approve") {
        console.log(this.transactionPending);
        let tx = 2;
        if (tx === 1)
          this.transactionPending = "pending approve";
        else if (tx === 2)
          this.transactionPending = "withdraw";
        else if (tx === 3)
          this.transactionPending = "pending withdraw";
        else if (tx === 4)
          this.transactionPending = "finished";
        console.log(this.transactionPending);
      }

      if(statusText === "make withdraw") {
        console.log(this.transactionPending);
        this.transactionPending = "pending withdraw";
        console.log(this.transactionPending);
      }
    },
    toStake() {
      this.overview = false;
    },
    toOverview() {
      this.overview = true;
    },
    updateValue(value) {
      if (parseFloat(value) > parseFloat(this.maxPairValue)) {
        this.valueError = `Insufficient amount. The value available ${this.maxPairValue}`;
        return false;
      }
      else if (value && value > 0.0) {
        this.btnText = true;
        this.valueAmount = value;
        this.valueToUsd = value * this.tokenToUSD;
        console.log("tokenPrice", this.valueToUsd);
        return true;
      }
    },
    toFixed(num, fixed) {
      // eslint-disable-next-line no-useless-escape
      let re = new RegExp(`^-?\\d+(?:\.\\d{0,` + (fixed || -1) + `})?`);
      if (!num.toString().match(re)) {
        return "0";
      }
      return num.toString().match(re)[0];
    },
  },
  computed: {
    valueInUsd() {
      let value = this.valueToUsd.toFixed(2);
      return value;
    },
    availableDeposit() {
      let deposit = this.$store.getters.getBalancePairToken(this.pool.id) / 1000000000000000000;
      return this.toFixed(deposit,2);
    },
    availableWithdraw() {
      let withdraw = this.pool.token.decimals.toString();
      return this.toFixed(withdraw,2);
    },
    tokenToUSD() {
      console.log(this.pool.tokenPairPrice);
      const tokenToNUSD = 1 / this.pool.tokenPairPrice;
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
    TransactionStatus,
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

    padding: 20px 16px 16.6px 16px;
    margin-bottom: 16px;
    border: 1px solid #606060;
    border-radius: 4px;

    .token-icon-wrap {
      width: 16px;
      height: 16px;
      margin-left: auto;
      margin-right: 4px;
      //margin-bottom: 16px;
    }
  }

  .addAVAXToWallet {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    padding: 4px 16px 4px 4px;
    gap: 4px;

    width: 272px;
    height: 32px;
    font-weight: 400;
    font-size: 14px;

    margin: 18px 0 0 auto;

    background: #353535;
    border-radius: 16px;
  }
}

@media screen and(max-width: 780px) {
  .deposit-withdraw-block {
    background-color: #1C1C1C;
    width: 328px;
    height: auto;
    padding: 0;

    margin-right: auto;
    margin-left: auto;

    p {
      line-height: 16px;
    }
    .deposit-withdraw-container {
      width: 328px;
    }
    .continue {
      width: 328px;
    }
  }
}
</style>