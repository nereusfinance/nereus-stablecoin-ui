<template>
<div class="stake-view">
  <div class="stake-container">
    <h1>Earn</h1>
    <div class="stake-content">
      <div class="container-mini">
        <TotalDeposit
          :pool="pool"
          :actionStatus="actionStatus"
          :actionType="actionType"
          :onClick="setActionType"
        />

        <LockedToken
          :pool="pool"
        />
      </div>
      <div class="container-mini" v-if="actionStatus === false">
        <InfoBlock
          :pool="pool"
        />
        <ExpectedInterest
        />
      </div>
      <div class="container-mini" v-else>
        <DepositWithdraw
          :actionType="actionType"
          :actionStatus="actionStatus"
          :onClick="setActionStatus"
          :pool="pool"
        />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import TotalDeposit from "@/components/Stake/TotalDeposit";
import LockedToken from "@/components/Stake/LockedToken";
import InfoBlock from "@/components/Stake/InfoBlock";
import ExpectedInterest from "@/components/Stake/ExpectedInterest";
import DepositWithdraw from "@/components/Stake/DepositWithdraw";
export default {
  name: "Stake",
  data() {
    return {
      actionStatus: false,
      actionType: "Deposit",
    }
  },
  methods: {
    setActionStatus() {
      this.actionStatus = this.actionStatus === false;
    },
    setActionType(type) {
      if (type !== this.actionType)
        this.actionType = type;
      this.actionStatus = this.actionStatus === false;
    },
    async getData() {
     // const configArray = this.$ethers.;
    },
    async borrowHandler(data) {
      console.log("BORROW HANDLER", data);
      const isApprowed = await this.isApprowed();

      if (isApprowed) {
        this.cookBorrow(data, isApprowed);
      }
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
    async cookBorrow({ amount, updatePrice }, isApprowed) {
      const borrowEncode = this.getBorrowEncode(amount);
      const bentoWithdrawEncode = this.getBentoWithdrawEncode(amount);

      const gasPrice = await this.getGasPrice();
      console.log("GAS PRICE:", gasPrice);

      if (isApprowed) {
        console.log("APPROWED");

        if (updatePrice) {
          const updateEncode = this.getUpdateRateEncode();

          const estimateGas = await this.pool.contractInstance.estimateGas.cook(
            [11, 5, 21],
            [0, 0, 0],
            [updateEncode, borrowEncode, bentoWithdrawEncode],
            {
              value: 0,
              // gasPrice,
              // gasLimit: 1000000,
            }
          );

          const gasLimit = this.gasLimitConst + +estimateGas.toString();

          console.log("gasLimit:", gasLimit);

          const result = await this.pool.contractInstance.cook(
            [11, 5, 21],
            [0, 0, 0],
            [updateEncode, borrowEncode, bentoWithdrawEncode],
            {
              value: 0,
              // gasPrice,
              gasLimit,
            }
          );

          await this.wrapperStatusTx(result);

          console.log(result);
          return false;
        }

        const estimateGas = await this.pool.contractInstance.estimateGas.cook(
          [5, 21],
          [0, 0],
          [borrowEncode, bentoWithdrawEncode],
          {
            value: 0,
            // gasPrice,
            // gasLimit: 1000000,
          }
        );

        const gasLimit = this.gasLimitConst + +estimateGas.toString();

        console.log("gasLimit:", gasLimit);

        const result = await this.pool.contractInstance.cook(
          [5, 21],
          [0, 0],
          [borrowEncode, bentoWithdrawEncode],
          {
            value: 0,
            // gasPrice,
            gasLimit,
          }
        );

        await this.wrapperStatusTx(result);

        console.log(result);
        return false;
      }

      console.log("NOT APPROWED");
      const approvalEncode = await this.getApprovalEncode();

      if (approvalEncode === "ledger") {
        const approvalMaster = await this.approveMasterContract();

        console.log("approveMasterContract resp: ", approvalMaster);

        if (!approvalMaster) return false;

        if (updatePrice) {
          const updateEncode = this.getUpdateRateEncode();

          const estimateGas = await this.pool.contractInstance.estimateGas.cook(
            [11, 5, 21],
            [0, 0, 0],
            [updateEncode, borrowEncode, bentoWithdrawEncode],
            {
              value: 0,
              // gasPrice,
              // gasLimit: 1000000,
            }
          );

          const gasLimit = this.gasLimitConst + +estimateGas.toString();

          console.log("gasLimit:", gasLimit);

          const result = await this.pool.contractInstance.cook(
            [11, 5, 21],
            [0, 0, 0],
            [updateEncode, borrowEncode, bentoWithdrawEncode],
            {
              value: 0,
              // gasPrice,
              gasLimit,
            }
          );

          await this.wrapperStatusTx(result);

          console.log(result);
          return false;
        }

        const estimateGas = await this.pool.contractInstance.estimateGas.cook(
          [5, 21],
          [0, 0],
          [borrowEncode, bentoWithdrawEncode],
          {
            value: 0,
            // gasPrice,
            // gasLimit: 1000000,
          }
        );

        const gasLimit = this.gasLimitConst + +estimateGas.toString();

        console.log("gasLimit:", gasLimit);

        const result = await this.pool.contractInstance.cook(
          [5, 21],
          [0, 0],
          [borrowEncode, bentoWithdrawEncode],
          {
            value: 0,
            // gasPrice,
            gasLimit,
          }
        );

        await this.wrapperStatusTx(result);

        console.log(result);

        return false;
      }

      if (updatePrice) {
        const updateEncode = this.getUpdateRateEncode();

        const estimateGas = await this.pool.contractInstance.estimateGas.cook(
          [24, 11, 5, 21],
          [0, 0, 0, 0],
          [approvalEncode, updateEncode, borrowEncode, bentoWithdrawEncode],
          {
            value: 0,
            // gasPrice,
            // gasLimit: 1000000,
          }
        );

        const gasLimit = this.gasLimitConst + +estimateGas.toString();

        console.log("gasLimit:", gasLimit);

        const result = await this.pool.contractInstance.cook(
          [24, 11, 5, 21],
          [0, 0, 0, 0],
          [approvalEncode, updateEncode, borrowEncode, bentoWithdrawEncode],
          {
            value: 0,
            // gasPrice,
            gasLimit,
          }
        );

        await this.wrapperStatusTx(result);

        console.log(result);
        return false;
      }

      const estimateGas = await this.pool.contractInstance.estimateGas.cook(
        [24, 5, 21],
        [0, 0, 0],
        [approvalEncode, borrowEncode, bentoWithdrawEncode],
        {
          value: 0,
          // gasPrice,
          // gasLimit: 1000000,
        }
      );

      const gasLimit = this.gasLimitConst + +estimateGas.toString();

      console.log("gasLimit:", gasLimit);

      const result = await this.pool.contractInstance.cook(
        [24, 5, 21],
        [0, 0, 0],
        [approvalEncode, borrowEncode, bentoWithdrawEncode],
        {
          value: 0,
          // gasPrice,
          gasLimit,
        }
      );

      await this.wrapperStatusTx(result);

      console.log(result);
    },
    async getApprovalEncode() {
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
        if (e.code === -32603) {
          return "ledger";

          // this.$store.commit("setPopupState", {
          //   type: "device-error",
          //   isShow: true,
          // });
        }
        return false;
      }

      const parsedSignature = this.parseSignature(signature);

      return this.$ethers.utils.defaultAbiCoder.encode(
        ["address", "address", "bool", "uint8", "bytes32", "bytes32"],
        [
          account,
          masterContract,
          true,
          parsedSignature.v,
          parsedSignature.r,
          parsedSignature.s,
        ]
      );
    },
  },
  computed: {
    //address
    account() {
      return this.$store.getters.getAccount;
    },
    pool() {
      //const poolId = Number(this.$route.params.id);
      const poolId = Number(7);
      return this.$store.getters.getPoolById(poolId);
    },
  },
  components: { DepositWithdraw, ExpectedInterest, InfoBlock, LockedToken, TotalDeposit }
};
</script>

<style scoped lang="scss">
.stake-view {
  padding-top: 40px;
  padding-bottom: 40px;
  flex: 1;

  h1 {
    font-size: 32px;
    line-height: 36px;
    margin-bottom: 20px;
    text-align: left;
  }
  .stake-container {
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
  }

  .stake-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
  }
  .container-mini {
    display: flex;
    flex-direction: column;
  }
}
</style>