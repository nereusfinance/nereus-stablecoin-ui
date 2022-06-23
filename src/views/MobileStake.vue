<template>
  <div class="stake-view-mobile">
    <h1 class="stake-text"  v-if="!actionStatus">Earn</h1>
    <div class="stake-wrapper">
      <div class="stake-item" v-if="!actionStatus">
        <TotalDeposit :actionType="actionType" :onClick="setActionType" />
        <InfoBlock/>
        <LockedToken/>
        <ExpectedInterest
          v-if="!actionType"
          :rewardsForPeriod="rewardsForPeriod"
          :totalEarnedRewards="totalEarnedRewards"
        />
      </div>
      <div class="container-mini" v-else>
        <DepositWithdraw
          v-if="actionType"
          :actionType="actionType"
          :onClick="setActionType"
        />
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
  name: "MobileStake",
  data() {
    return {
      actionStatus: false,
      actionType: "",
      rewardsForPeriod: [],
      totalEarnedRewards: "",
      yearlyEarn: "",
    };
  },
  methods: {
    setActionType(type) {
      if (type !== this.actionType) this.actionType = type;
      this.actionStatus = this.actionStatus === false;
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
  components: {
    DepositWithdraw,
    ExpectedInterest,
    InfoBlock,
    LockedToken,
    TotalDeposit,
  },
};
</script>

<style scoped lang="scss">
.stake-view-mobile {
  padding: 24px 15px 29px 15px;
  margin-left: auto;
  margin-right: auto;
  flex: 1;

  h1 {
    font-weight: 400;
    font-size: 28px;
    text-align: left;
    margin-bottom: 20px;
  }


  .stake-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }
  .container-mini {
    display: flex;
    flex-direction: column;
  }
}

@media screen and(min-width: 768px){
  .stake-view-mobile.mobile-stake {
    display: none;
  }
}
</style>
