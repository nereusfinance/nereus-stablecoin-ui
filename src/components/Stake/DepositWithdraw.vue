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

  <div v-if="overview" class="deposit-withdraw-container">
    <h1 v-if="transactionPending !== 'finished'">{{ actionType }} overview</h1>
    <p v-if="transactionPending !== 'finished'">
      These are your transaction details. Make sure to check if this is correct before submitting.
    </p>

    <h1 v-if="transactionPending === 'finished'">Congrats!</h1>
    <p v-if="transactionPending === 'finished'">Your action has been successfully executed</p>
    <div class="currency-overview">
      <h2>Currency</h2>
      <TokenIcon v-if="actionType === 'Deposit'" :token="pool.pairToken.name"/>
      <div>
        {{valueAmount}}
        {{pool.pairToken.name}}
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
      :value="valueAmount"
      :pool="pool"
      @addStake="addStakeHandler"
    />
    <TransactionStatus
      v-if="actionType === 'Withdraw'"
      :statusText="withdrawStatus"
      :transactionPending="transactionPending"
      :action="action"
      :value="valueAmount"
      :pool="pool"
      @addUnstake="addStakeHandler"
    />
    <add-token-btn v-if="transactionPending === 'finished'"
      :token-name="pool.pairToken.name"
    />
  </div>
</div>
</template>

<script>
import ValueInput from "@/components/UiComponents/ValueInput";
import TokenIcon from "@/components/UiComponents/TokenIcon";
import TransactionStatus from "@/components/UiComponents/TransactionStatus";
import AddTokenBtn from "@/components/UiComponents/AddTokenBtn";
const BackButton = () => import("@/components/UiComponents/BackButton");

export default {
  name: "DepositWithdraw",
  data() {
    return {
      overview: false,
      valueAmount: "0",
      valueToUsd: "0",
      valueError: "",
      depositStatus: ["Deposit", "Finished"],
      withdrawStatus: ["Approve", "Withdraw", "Finished"],
      transactionPending: "wait for action",
      btnText: false,
      gasLimitConst: 1000,
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
    async action(statusText, tx) {
      if(statusText === "Deposit") {
        //let tx = 1;
        if (tx === 1)
          this.transactionPending = "pending";
        else if (tx === 2)
          this.transactionPending = "finished";
        console.log(this.transactionPending);
      }
      if(statusText === "Approve") {
        console.log(this.transactionPending);
        //let tx = 1;
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
        console.log("tokenPrice", this.pool.tokenPairPrice);
        console.log("valueAmount", this.valueAmount);
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
    ///////////////////////////////////////////////////////////////////////////////////////
    async addStakeHandler() {
      console.log("ADD STAKE HANDLER");
      //const isApprowed = await this.isApprowed(); //transfer to addStake for what ? check in Pool.vue

      const isTokenApprove = await this.isTokenApprowed(
        this.pool.pairTokenContract,
        this.pool.masterContractInstance.address
      );
      if (isTokenApprove) {
        await this.addStake();
        return false;
      }

      const approveResult = await this.approveToken(
        this.pool.pairTokenContract,
        this.pool.masterContractInstance.address
      );

      if (approveResult) await this.addStake();
    },
    async stake() {
      const contract = this.$store.getters.getNXUSDStakingContract;
      let value = Number(
        this.$ethers.utils.formatUnits(this.valueAmount, this.pool.pairToken.decimals)
      );
      await contract.stake(value);
    },
    /////////////////////////////////////////////////////////////////////
    async getNonce() {
      try {
        const nonces = await this.pool.masterContractInstance.nonces(
          this.account
        );

        console.log("NONCE:", nonces.toString());

        return nonces.toString();
      } catch (e) {
        console.log("getNonce err:", e);
      }
    },
    async getVerifyingContract() {
      try {
        const verifyingContract = await this.pool.contractInstance.bentoBox();
        return verifyingContract;
      } catch (e) {
        console.log("getVerifyingContract err:", e);
      }
    },
    async addStake() {
      const approval = await this.getSignApproval();
      console.log("approval result:", approval);
      //instance bentobox {куда, кому, бул,в,р,с)
      //перевести для
      const approvalMaster = await this.approveMasterContract(approval);
      console.log("approveMasterContract resp: ", approvalMaster);

      if (!approvalMaster) return false;
      else await this.stake();
    },
    async approveMasterContract(data) {
      try {
        const NXUSDStaking = await this.$store.getters.getNXUSDStakingContract;

        // console.log(
        //   "approveMasterContract",
        //   this.account,
        //   masterContract,
        //   true,
        //   this.$ethers.utils.formatBytes32String(approval.v),
        //   this.$ethers.utils.formatBytes32String(approval.r),
        //   this.$ethers.utils.formatBytes32String(approval.s)
        // );

        //instance bentobox {куда, кому, бул,в,р,с)
        //v r s from approve
        //const r = this.$ethers.utils.hexZeroPad(data.r.toHexString(), 32)
        const tx =
          await this.pool.masterContractInstance.setMasterContractApproval(
            this.account,
            NXUSDStaking,
            true,
            this.$ethers.utils.formatBytes32String(data.v),
            this.$ethers.utils.formatBytes32String(data.r),
            this.$ethers.utils.formatBytes32String(data.s)
          );


        const receipt = await tx.wait();
        return receipt;
      } catch (e) {
        console.log("approveMasterContract err:", e);
        return false;
      }
    },

    //for BentoBox approval
    async getSignApproval() {
      const account = this.account;

      const verifyingContract = await this.getVerifyingContract();
      const masterContract = await this.getMasterContract();
      const nonce = await this.getNonce();
      const chainId = this.$store.getters.getActiveChain.code;

      const domain = {
        name: "BentoBox V1",
        chainId,
        verifyingContract,
      };

      // The named list of all type definitions
      const types = {
        SetMasterContractApproval: [
          { name: "warning", type: "string" },
          { name: "user", type: "address" },
          { name: "masterContract", type: "address" },
          { name: "approved", type: "bool" },
          { name: "nonce", type: "uint256" },
        ],
      };

      // The data to sign
      const value = {
        warning: "Give FULL access to funds in (and approved to) BentoBox?",
        user: account,
        masterContract,
        approved: true,
        nonce,
      };
      console.log(chainId);

      let signature;

      try {
        signature = await this.signer._signTypedData(domain, types, value);
      } catch (e) {
        console.log("SIG ERR:", e.code);
        return false;
      }
      const parsedSignature = this.parseSignature(signature);

      return parsedSignature
    },
    parseSignature(signature) {
      const parsedSignature = signature.substring(2);

      var r = parsedSignature.substring(0, 64);
      var s = parsedSignature.substring(64, 128);
      var v = parsedSignature.substring(128, 130);

      return {
        r: "0x" + r,
        s: "0x" + s,
        v: parseInt(v, 16),
      };
    },

    // async wrapperStatusTx(result) {
    //   const status = await result.wait();
    //   if (status) {
    //     await this.updateBalancesAndStakeInfo();
    //   }
    // },

    //CHANGE DATA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // async updateBalancesAndStakeInfo() {
    //   this.useAVAX
    //     ? await this.$store.dispatch("checkBalanceNativeToken", this.pool.id)
    //     : await this.$store.dispatch("checkBalanceToken", {
    //       contract: this.pool.pairTokenContract,
    //       id: this.pool.id,
    //     });
    //   //checkUserBalance ? need payload?
    //   await this.$store.dispatch("checkBalancePairToken", {
    //     contract: this.pool.pairTokenContract,
    //     id: this.pool.id,
    //   });
    //   //await this.checkCollateralInfo();
    // },
    //////////////////////////////////////////////////
    getAVAXStatus() {
      return this.$store.getters.getUseAVAX;
    },
    async isApprowed() {
      try {
        const masterContract = await this.getMasterContract();
        const addressApprowed =
          await this.pool.masterContractInstance.masterContractApproved(
            masterContract,
            this.account
          );
        return addressApprowed;
      } catch (e) {
        console.log("isApprowed err:", e);
      }
    },
    async getMasterContract() {
      try {
        const masterContract =
          await this.pool.contractInstance.masterContract();
        return masterContract;
      } catch (e) {
        console.log("getMasterContract err:", e);
      }
    },
    async isTokenApprowed(tokenContract, spenderAddress) {
      try {
        const addressApprowed = await tokenContract.allowance(
          this.account,
          spenderAddress,
          {
            gasLimit: 1000000,
          }
        );
        console.log("tokenContract", tokenContract);
        console.log(
          "TOKEN APPROVE:",
          addressApprowed,
          parseFloat(addressApprowed.toString()) > 0
        );
        return parseFloat(addressApprowed.toString()) > 0;
      } catch (e) {
        console.log("isApprowed err:", e);
        return false;
      }
    },
    async approveToken(tokenContract, spenderAddress) {
      try {
        const estimateGas = await tokenContract.estimateGas.approve(
          spenderAddress,
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        );

        const gasLimit = this.gasLimitConst + +estimateGas.toString();

        console.log("gasLimit:", gasLimit);

        const tx = await tokenContract.approve(
          spenderAddress,
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
          {
            gasLimit,
          }
        );
        const receipt = await tx.wait();

        console.log("APPROVE RESP:", receipt);
        if(this.actionType === "Deposit")
          this.action("Deposit", 2);
        else
          this.action("Withdraw", 4);

        return true;
      } catch (e) {
        console.log("isApprowed err:", e);
        return false;
      }
    },
  },
  computed: {
    signer() {
      return this.$store.getters.getSigner;
    },
    account() {
      return this.$store.getters.getAccount;
    },
    valueInUsd() {
      let value = this.valueToUsd.toFixed(2);
      return value;
    },
    availableDeposit() {
      let deposit = this.$store.getters.getBalancePairToken(this.pool.id) / 1000000000000000000;
      return this.toFixed(deposit,2);
    },
    availableWithdraw() {
      let withdraw = this.$store.getters.getBalancePairToken(this.pool.id) / 1000000000000000000;
        //this.$store.getters.getUserBalanceStaked;///!!!!!
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
    AddTokenBtn,
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