<template>
  <div class="deposit-withdraw-block">
    <BackButton
      :text="'Back'"
      :disabled="transactionPending !== 'wait for action'"
      @click="onClick"
    />
    <!--  <BackButton :text="'Back'" @click="onClick" v-else-if="transactionPending !== 'finished'" />-->

    <div
      v-if="actionType === 'Deposit' && overview === false"
      class="deposit-withdraw-container"
    >
      <h1>How much would you like to deposit?</h1>
      <p>
        Please enter amount you would like to deposit. The maximum amount you
        can deposit is shown below.
      </p>
      <div class="available-amount">
        <h2>Available to deposit</h2>
        <h3>{{ availableDeposit }}<span> NXUSD</span></h3>
      </div>
      <ValueInput
        :max="availableDeposit"
        :show-max="true"
        :valueName="NXUS"
        @onchange="updateValue"
        :parentValue="valueAmount"
        :error="valueError"
        :isStake="true"
      />
      <button class="continue" :disabled="!btnText" @click="toOverview">
        Continue
      </button>
    </div>

    <div
      v-if="actionType === 'Withdraw' && overview === false"
      class="deposit-withdraw-container"
    >
      <h1>Withdraw</h1>
      <p>How much do you want to withdraw?</p>
      <div class="available-amount">
        <h2>Available to withdraw</h2>
        <h3>{{ availableWithdraw }}<span> NXUSD</span></h3>
      </div>
      <ValueInput
        :max="availableWithdraw"
        :show-max="true"
        :valueName="stakingTokenInfo.name"
        @onchange="updateValue"
        :parentValue="valueAmount"
        :error="valueError"
        :isStake="true"
      />
      <button class="continue" :disabled="!btnText" @click="toOverview">
        Continue
      </button>
    </div>

    <div v-if="overview" class="deposit-withdraw-container">
      <h1 v-if="transactionPending !== 'finished'">
        {{ actionType }} overview
      </h1>
      <p v-if="transactionPending !== 'finished'">
        These are your transaction details. Make sure to check if this is
        correct before submitting.
      </p>

      <h1 v-if="transactionPending === 'finished'">Congrats!</h1>
      <p v-if="transactionPending === 'finished'">
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
          <p
            v-if="actionType === 'Deposit'"
            style="margin: 0; text-align: right; font-size: 12px"
          >
            $ {{ valueInUsd }}
          </p>
        </div>
      </div>
      <TransactionStatus
        v-if="actionType === 'Deposit'"
        :statusType="depositStatus"
        :transactionPending="transactionPending"
        :action="action"
        :value="valueAmount"
        :tx="tx"
        :action-amount="actionAmount"
        :txApprove="txApprove"
        @stakeHandler="stakeHandler"
      />
      <TransactionStatus
        v-if="actionType === 'Withdraw'"
        :statusType="withdrawStatus"
        :transactionPending="transactionPending"
        :action="action"
        :value="valueAmount"
        :tx="tx"
        @addUnstake="unstakeHandler"
      />
      <add-token-btn
        v-if="transactionPending === 'finished'"
        :token-name="stakingTokenInfo.name"
      />
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
import { ethers } from "ethers";

const BackButton = () => import("@/components/UiComponents/BackButton");

export default {
  name: "DepositWithdraw",
  data() {
    return {
      bentoBoxContract: undefined,
      stakingTokenContract: undefined,
      getNXUSDStakingContract: {
        address: "0xF14f4CE569cB3679E99d5059909E23B07bd2F387",
      },
      stakingTokenInfo: { name: null, decimals: 18 },
      overview: false,
      valueAmount: "0",
      valueError: "",
      depositStatus: ["Deposit", "Finished"],
      withdrawStatus: ["Withdraw", "Finished"],
      transactionPending: "wait for action",
      tx: "",
      txApprove: "",
      actionAmount: [1, 2],
      approved: true,
      btnText: false,
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
  methods: {
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
    getStakingTokenInfo() {
      const NXUSDStaking = NXUSDStakingContractInfo.find(
        (contract) => contract.contractChain === this.chainId
      );
      this.stakingTokenContract = new this.$ethers.Contract(
        NXUSDStaking.stakingToken.address,
        NXUSDStaking.stakingToken.abi,
        this.signer
      );
      this.stakingTokenInfo = {
        name: NXUSDStaking.stakingToken.name,
        decimals: NXUSDStaking.stakingToken.decimals,
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
      const tokenAllowance = await this.tokenAllowance(
        this.stakingTokenContract.address,
        this.bentoBoxContract.address
      );
      if (tokenAllowance.lt(ethers.utils.parseUnits(this.valueAmount))) {
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
    async availableDeposit() {
      try {
        return await this.stakingTokenContract.balanceOf(this.account);
      } catch (e) {
        console.log("Staking Token Balance error", e);
        return ethers.BigNumber.from("0");
      }
    },
    async action(tx) {
      //let tx = 1;
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
    // toStake() {
    //   this.overview = false;
    // },
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
      if (parseFloat(value) > parseFloat(this.maxPairValue)) {
        this.valueError = `Insufficient amount. The value available ${this.maxPairValue}`;
        return false;
      } else if (value && value > 0.0) {
        this.btnText = true;
        this.valueAmount = value;
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
        console.log("IT WORKS");
        this.action("finished");
        await this.updateStakedBalance();
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
      console.log(contract);
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

        // console.log(
        //   "approveMasterContract",
        //   this.account,
        //   masterContract,
        //   true,
        //   this.$ethers.utils.formatBytes32String(approval.v),
        //   this.$ethers.utils.formatBytes32String(approval.r),
        //   this.$ethers.utils.formatBytes32String(approval.s)
        // );
        console.log(this.account, NXUSDStaking);
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

      const masterContract = await this.getMasterContract();
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
    async getMasterContract() {
      try {
        const masterContract =
          this.$store.getters.getNXUSDStakingContract.address;
        return masterContract;
      } catch (e) {
        console.log("getMasterContract err:", e);
      }
    },
    async tokenAllowance(tokenContract, spenderAddress) {
      try {
        const tokenAllowance = await tokenContract.allowance(
          this.account,
          spenderAddress
        );
        console.log("TOKEN APPROVE:", tokenAllowance, tokenAllowance.isZero());
        return tokenAllowance;
      } catch (e) {
        console.log("Get Allowance error:", e);
        return ethers.BigNumber.from(0);
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
    chainId() {
      return this.$store.getters.getChainId;
    },
    availableWithdraw() {
      let withdraw =
        this.$store.getters.getUserBalanceStaked / 1000000000000000000;
      return this.toFixed(withdraw, 2);
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
    h2,
    span {
      font-weight: 400;
      text-align: left;
      font-size: 16px;
      color: #ffffff;
    }
    h3 {
      font-weight: 600;
      font-size: 16px;
      text-align: right;
      color: #f2f4fe;
    }
    p {
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
    }
  }
  .continue {
    width: 388px;
    height: 40px;

    background: #e7fc6e;
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

@media screen and(min-width: 768px) and(max-width: 1000px) {
  .deposit-withdraw-block {
    width: 424px;
    height: 524px;
    padding: 24px 16px;

    .deposit-withdraw-container {
      margin-top: 28px;
    }
    h1 {
      font-size: 20px;
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
    }
    .continue {
      width: 328px;
    }
  }
}
</style>
