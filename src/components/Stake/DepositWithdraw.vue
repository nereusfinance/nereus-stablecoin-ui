<template>
  <div class="deposit-withdraw-block">
    <BackButton
        :disabled="transactionPending !== 'wait for action'"
        :text="'Back'"
        @click="goBack"
    />
    <!--  <BackButton :text="'Back'" @click="onClick" v-else-if="transactionPending !== 'finished'" />-->
    <div class="action-wrapper">
      <div
          v-if="actionType === 'Deposit' && overview === false"
          class="deposit-withdraw-container"
      >
        <p class="form-header">How much would you like to deposit?</p>
        <p class="form-description">
          Please enter amount you would like to deposit. The maximum amount you
          can deposit is shown below.
        </p>
        <div class="available-amount">
          <span class="form-header-text">Available to deposit</span>
          <span class="form-header-value">
            {{ formatBNValues(stakingTokenInfo.balance) }}
            <span class="form-symbol">{{ stakingTokenInfo.name }}</span>
          </span>
        </div>
        <ValueInput
            :error="valueError"
            :isStake="true"
            :max="maxValue"
            :parentValue="valueAmount"
            :show-max="true"
            valueName="NXUSD"
            @onchange="updateValue"
        />
        <button :disabled="isDisabled" class="continue" @click="toOverview">
          Continue
        </button>
      </div>

      <div
          v-if="actionType === 'Withdraw' && overview === false"
          class="deposit-withdraw-container"
      >
        <p class="form-header">How much would you like to withdraw?</p>
        <p class="form-description">
          Please enter amount you would like to withdraw. The maximum amount you
          can withdraw is shown below.
        </p>
        <div class="available-amount">
          <span class="form-header-text">Available to withdraw</span>
          <span class="form-header-value"
          >{{ formatValues(availableWithdraw) }}
            <span class="form-symbol">{{ stakingTokenInfo.name }}</span>
          </span>
        </div>
        <ValueInput
            :error="valueError"
            :isStake="true"
            :max="maxValue"
            :parentValue="valueAmount"
            :show-max="true"
            valueName="NXUSD"
            @onchange="updateValue"
        />
        <button :disabled="isDisabled" class="continue" @click="toOverview">
          Continue
        </button>
      </div>

      <div v-if="overview" class="deposit-withdraw-container">
        <p v-if="transactionPending !== 'finished'" class="form-header">
          {{ actionType }} overview
        </p>
        <p v-if="transactionPending !== 'finished'" class="form-description">
          These are your transaction details. Make sure to check if this is
          correct before submitting.
        </p>

        <p v-if="transactionPending === 'finished'" class="form-header">
          Congrats!
        </p>
        <p v-if="transactionPending === 'finished'" class="form-description">
          Your action has been successfully executed
        </p>
        <div class="currency-overview">
          <h2>Currency</h2>
          <TokenIcon
              v-if="actionType === 'Deposit'"
              :token="stakingTokenInfo.name"
          />
          <div>
            {{ valueAmount }}
            {{ stakingTokenInfo.name }}
          </div>
        </div>
        <TransactionStatus
            v-if="actionType === 'Deposit'"
            :action="action"
            :action-amount="actionAmount"
            :statusType="depositStatus"
            :transactionPending="transactionPending"
            :tx="tx"
            :txApprove="txApprove"
            :value="valueAmount"
            @onFinish="goBack"
            @stakeHandler="stakeHandler"
        />
        <TransactionStatus
            v-if="actionType === 'Withdraw'"
            :action="action"
            :statusType="withdrawStatus"
            :transactionPending="transactionPending"
            :tx="tx"
            :value="valueAmount"
            @addUnstake="unstakeHandler"
            @onFinish="goBack"
        />
        <add-token-btn
            v-if="transactionPending === 'finished'"
            :token-name="stakingTokenInfo.name"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ValueInput from "@/components/UiComponents/ValueInput";
import TokenIcon from "@/components/UiComponents/TokenIcon";
import TransactionStatus from "@/components/UiComponents/TransactionStatus";
import AddTokenBtn from "@/components/UiComponents/AddTokenBtn";
import NXUSDStakingContractInfo from "@/utils/contracts/NXUSDStaking";
import masterContractInfo from "@/utils/contracts/master";
import {ethers} from "ethers";

const BackButton = () => import("@/components/UiComponents/BackButton");

export default {
  name: "DepositWithdraw",
  data() {
    return {
      bentoBoxContract: undefined,
      stakingTokenContract: undefined,
      isDisabled: false,
      stakingTokenInfo: {
        name: null,
        decimals: 18,
        balance: this.$ethers.BigNumber.from(0),
      },
      overview: false,
      valueAmount: "",
      valueError: "",
      depositStatus: ["Deposit", "Finished"],
      withdrawStatus: ["Withdraw", "Finished"],
      transactionPending: "wait for action",
      tx: "",
      txApprove: "",
      actionAmount: [1, 2],
      approved: true,
      gasLimitConst: 1000,
    };
  },
  props: {
    actionType: {
      type: String,
    },
    onClick: {
      type: Function,
    },
  },
  mounted() {
    this.getBentoBoxContract();
    this.getStakingTokenInfo();
  },
  computed: {
    signer() {
      return this.$store.getters.getSigner;
    },
    account() {
      return this.$store.getters.getAccount;
    },
    chainId() {
      return this.$store.getters.getChainId;
    },
    availableWithdraw() {
      const userData = this.$store.getters.getUserData;
      const NXUSDByTier1 = Number(this.normalizeBNValues(userData[0][1]));
      const NXUSDByTier2 = Number(
          this.normalizeBNValues(userData[2].sub(userData[0][1]))
      );
      const total = NXUSDByTier1 + NXUSDByTier2;
      return total.toString();
    },
    NXUSDStakingContract() {
      return this.$store.getters.getNXUSDStakingContract;
    },
    maxValue() {
      let maxValue;
      if (this.actionType === "Deposit") {
        maxValue = this.normalizeBNValues(this.stakingTokenInfo.balance);
      }
      if (this.actionType === "Withdraw") {
        maxValue = this.availableWithdraw;
      }

      return maxValue;
    },
  },
  watch: {
    isDisabled(value) {
      return value;
    },
  },
  methods: {
    goBack() {
      this.onClick("");
    },
    normalizeBNValues(value) {
      return ethers.utils.formatEther(value);
    },
    formatBNValues(value) {
      const normalizedValue = this.normalizeBNValues(value);
      return new Intl.NumberFormat("en-EN").format(
          parseFloat(normalizedValue).toFixed(2)
      );
    },
    formatValues(value) {
      return new Intl.NumberFormat("en-EN").format(
          parseFloat(value).toFixed(2)
      );
    },
    getBentoBoxContract() {
      const bentoBox = masterContractInfo.find(
          (contract) => contract.contractChain === this.chainId
      );
      this.bentoBoxContract = new this.$ethers.Contract(
          bentoBox.address,
          bentoBox.abi,
          this.signer
      );
    },
    async getStakingTokenInfo() {
      const NXUSDStaking = NXUSDStakingContractInfo.find(
          (contract) => contract.contractChain === this.chainId
      );
      this.stakingTokenContract = new this.$ethers.Contract(
          NXUSDStaking.stakingToken.address,
          NXUSDStaking.stakingToken.abi,
          this.signer
      );
      const balance = await this.stakingTokenContract.balanceOf(this.account);
      this.stakingTokenInfo = {
        name: NXUSDStaking.stakingToken.name,
        decimals: NXUSDStaking.stakingToken.decimals,
        balance: balance,
      };
    },
    async getNonce() {
      try {
        return await this.bentoBoxContract.nonces(this.account);
      } catch (e) {
        console.log("getNonce error:", e);
      }
    },
    async stakingTokenApprove() {
      if (!(await this.isApprowed())) {
        await this.approveTokenToBentoBox();
      }
      return true;
    },
    async approveTokenToBentoBox() {
      try {
        const tx = await this.stakingTokenContract.approve(
            this.bentoBoxContract.address,
            ethers.constants.MaxUint256
        );
        await tx.wait();
      } catch (e) {
        console.log("Approve token error:", e);
      }
    },
    async isApprowed() {
      const tokenAllowance = await this.tokenAllowance();
      return !tokenAllowance.lt(ethers.utils.parseUnits(this.valueAmount));
    },
    async isApprowedForBentobox() {
      try {
        const nxusdStaking = await this.$store.getters.getNXUSDStakingContract
            .address;
        return await this.bentoBoxContract.masterContractApproved(
            nxusdStaking,
            this.account
        );
      } catch (e) {
        console.log("isApprowed err:", e);
        return false;
      }
    },
    async action(tx) {
      if (tx === "finished") {
        this.transactionPending = "finished";
      }
      console.log("action amount", this.actionAmount);
      if (this.actionAmount.length > 2) {
        if (tx === 1) this.transactionPending = "1";
        else if (tx === 2) this.transactionPending = "2";
        else if (tx === 3) this.transactionPending = "3";
        else if (tx === 4) this.transactionPending = "finished";
      }
      if (this.actionAmount.length === 2) {
        if (tx === 1) this.transactionPending = "1";
        else if (tx === 2) this.transactionPending = "finished";
        console.log("transaction pending", this.transactionPending);
      }
    },
    async toOverview() {
      this.transactionPending = "wait for action";
      this.approwed = await this.isApprowed();
      if (!this.approwed) {
        this.depositStatus = ["Approve", "Deposit", "Finished"];
        this.actionAmount = [1, 2, 3, 4, 5]; //approve, pending approve, deposit, pending deposit, finished
        this.approved = false;
      }
      this.overview = true;
    },
    updateValue(value) {
      if (value[0] === "0" && value[1] !== ".") {
        this.valueError = "Wrong number format";
        return false;
      }
      if (parseFloat(value) > parseFloat(this.maxValue)) {
        this.valueError = `Insufficient amount. The value available ${this.maxValue}`;
        this.isDisabled = true;
        return false;
      } else if (value && value > 0.0) {
        this.valueError = "";
        this.valueAmount = value;
        this.isDisabled = false;
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

    async wrapperStatusTx(result) {
      const status = await result.wait();
      if (status) {
        await this.action("finished");
        await this.$store.dispatch("checkUserData");
        await this.$store.dispatch("checkUserCurrentRewards");
        await this.$store.dispatch(
            "calculateTableRewards",
            [86400, 604800, 2629746, 31556952]
        );
      }
    },
    async unstakeHandler() {
      console.log("ADD UNSTAKE HANDLER");
      const nxusdStaking = this.$store.getters.getNXUSDStakingContract;
      let value = this.$ethers.utils.parseUnits(this.valueAmount, 18);
      const tx = await nxusdStaking.unstake(value, false);
      await this.wrapperStatusTx(tx);
      const receipt = await tx.wait();
      this.tx = receipt.transactionHash;
      await this.action(2);
    },

    async stakeHandler() {
      try {
        if (this.transactionPending === "wait for action") await this.action(1);
        console.log("ADD STAKE HANDLER");

        const approveInBento = await this.checkAndApproveInBentobox();
        const tokenApprove = await this.stakingTokenApprove();
        if (!approveInBento || !tokenApprove) {
          this.transactionPending = "wait for action";
        }
        if (
            approveInBento &&
            tokenApprove &&
            this.depositStatus.length > 2 &&
            this.transactionPending !== "3"
        )
          await this.action(2);
        if (
            approveInBento &&
            tokenApprove &&
            (this.transactionPending === "3" || this.transactionPending < 2)
        ) {
          await this.stake();
        }
      } catch (e) {
        console.log("stake handler error: ", e);
      }
    },
    async checkAndApproveInBentobox() {
      const isApproved = await this.isApprowed();
      if (!isApproved) {
        const signApproval = await this.getSignApproval();
        console.log("approval result:", signApproval);
        if (signApproval) {
          const approvalMaster = await this.approveMasterContract(signApproval);
          console.log("approveMasterContract resp: ", approvalMaster);
          return approvalMaster;
        } else return false;
      }
      return isApproved;
    },
    async stake() {
      const contract = this.$store.getters.getNXUSDStakingContract;
      let value = this.$ethers.utils.parseUnits(this.valueAmount, 18);
      try {
        const tx = await contract.stake(value);
        const receipt = await tx.wait();
        this.tx = receipt.transactionHash;
        console.log(this.tx);

        await this.wrapperStatusTx(tx);
        await this.action("finished");
      } catch (e) {
        console.log("stake err:", e);
      }
    },
    async approveMasterContract(approval) {
      try {
        const NXUSDStaking = await this.$store.getters.getNXUSDStakingContract
            .address;

        const tx = await this.bentoBoxContract.setMasterContractApproval(
            this.account,
            NXUSDStaking,
            true,
            approval.v,
            approval.r,
            approval.s
        );

        const receipt = await tx.wait();
        this.txApprove = receipt.transactionHash;
        return receipt;
      } catch (e) {
        console.log("approveMasterContract err:", e);
        return false;
      }
    },
    async getSignApproval() {
      const account = this.account;
      console.log("account", this.account);

      const verifyingContract = await this.bentoBoxContract.address;
      console.log("verifyingContract", verifyingContract);

      const masterContract = await this.NXUSDStakingContract.address;
      console.log("masterContract", masterContract);

      const nonce = await this.getNonce();
      const chainId = this.$store.getters.getActiveChain.code;
      console.log("chainId", chainId);

      const domain = {
        name: "BentoBox V1",
        chainId,
        verifyingContract,
      };

      // The named list of all type definitions
      const types = {
        SetMasterContractApproval: [
          {name: "warning", type: "string"},
          {name: "user", type: "address"},
          {name: "masterContract", type: "address"},
          {name: "approved", type: "bool"},
          {name: "nonce", type: "uint256"},
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
      return parsedSignature;
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
    async tokenAllowance() {
      try {
        const tokenAllowance = await this.stakingTokenContract.allowance(
            this.account,
            this.bentoBoxContract.address
        );
        console.log("TOKEN APPROVE:", tokenAllowance, tokenAllowance.isZero());
        return tokenAllowance;
      } catch (e) {
        console.log("Get Allowance error:", e);
        return ethers.BigNumber.from(0);
      }
    },
  },
  components: {
    AddTokenBtn,
    TransactionStatus,
    TokenIcon,
    ValueInput,
    BackButton,
  },
};
</script>

<style lang="scss" scoped>
.deposit-withdraw-block {
  background: #262626;
  border-radius: 4px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;

  .deposit-withdraw-container {
    padding: 40px 100px;

    .form-header {
      font-size: 24px;
      line-height: 28px;
      font-weight: 400;
      text-align: left;
    }

    .form-header-value {
      font-weight: 600;
      font-size: 16px;
      text-align: right;
      color: #f2f4fe;

      .form-symbol {
        margin-left: 4px;
        font-weight: 400;
      }
    }

    .form-description {
      text-align: left;
      margin: 8px 0 24px 0;
      font-size: 14px;
      color: #8a8a8a;
    }

    .available-amount {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 16px;

      .form-header-text {
        font-weight: 400;
        text-align: left;
        font-size: 16px;
        color: #ffffff;
      }
    }
  }

  .continue {
    border: none;
    cursor: pointer;
    height: 40px;
    background: #e7fc6e;
    border-radius: 20px;
    width: 100%;
    margin-top: 24px;

    &:disabled {
      cursor: not-allowed;
      color: #8a8a8a;
      background-color: #353535;
      border: none;
    }
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

@media screen and(min-width: 768px) and(max-width: 1000px) {
  .deposit-withdraw-block {
    width: 424px;
    height: 524px;
    padding: 24px 16px;

    .deposit-withdraw-container {
      margin-top: 28px;
      padding: 0;
    }

    .continue {
      width: 392px;
      height: 48px;
      border-radius: 24px;
    }
  }
}

@media screen and(max-width: 767px) {
  .deposit-withdraw-block {
    background-color: #1c1c1c;
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
      padding: 40px 0;
    }

    .continue {
      width: 328px;
    }
  }
}
</style>
