<template>
  <div class="stake">
    <div class="stake-view">
      <h1 class="stake-text">Earn</h1>
      <div class="stake-wrapper">
        <div class="stake-item">
          <TotalDeposit :actionType="actionType" :onClick="setActionType" />
          <LockedToken />
        </div>
        <div class="stake-item">
          <!--          <DepositWithdraw-->
          <!--            v-if="actionType"-->
          <!--            :actionType="actionType"-->
          <!--            :onClick="setActionStatus"-->
          <!--          />-->
          <!--          <InfoBlock v-if="!actionType"/>-->
          <!--          <ExpectedInterest-->
          <!--            v-if="!actionType"-->
          <!--            :rewardsForPeriod="rewardsForPeriod"-->
          <!--            :totalEarnedRewards="totalEarnedRewards"-->
          <!--          />-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TotalDeposit from "@/components/Stake/TotalDeposit";
import LockedToken from "@/components/Stake/LockedToken";
// import InfoBlock from "@/components/Stake/InfoBlock";
// import ExpectedInterest from "@/components/Stake/ExpectedInterest";
// import DepositWithdraw from "@/components/Stake/DepositWithdraw";
export default {
  name: "Stake",
  data() {
    return {
      actionType: "",
      tier1Array: [""],
      tier2Array: [""],
      rewardsForPeriod: [],
      totalEarnedRewards: "",
      yearlyEarn: "",
    };
  },
  components: {
    // DepositWithdraw,
    // ExpectedInterest,
    // InfoBlock,
    LockedToken,
    TotalDeposit,
  },
  methods: {
    setActionType(selectedType) {
      this.actionType = selectedType;
    },
  },
};
</script>

<style scoped lang="scss">
.stake-view {
  max-width: 1000px;
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  margin: auto;

  h1 {
    font-size: 32px;
    line-height: 36px;
    text-align: left;
  }

  .stake-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }

  .stake-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}

@media screen and(min-width: 768px) and(max-width: 1000px) {
  .stake-view {
    margin-left: auto;
    margin-right: auto;
    flex: 1;
  }
}
</style>
