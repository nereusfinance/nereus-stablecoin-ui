<template>
  <div class="stake">
    <div class="stake-view">
      <h1 class="stake-text">Earn</h1>
      <div class="stake-wrapper">
        <div class="stake-item stake-item-one" v-if="!actionStatus">
          <TotalDeposit :actionType="actionType" :onClick="setActionType" />
          <LockedToken />
        </div>
        <div class="stake-item stake-item-two">
          <DepositWithdraw
              v-if="actionType"
              :actionType="actionType"
              :onClick="setActionType"
          />
          <InfoBlock v-if="!actionType" />
          <ExpectedInterest
              v-if="!actionType"
              :rewardsForPeriod="rewardsForPeriod"
              :totalEarnedRewards="totalEarnedRewards"
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
import stake from "@/mixins/stake.js";
export default {
  mixins: [stake],
  name: "Stake",
  data() {
    return {
      actionStatus: false,
      actionType: "",
      tier1Array: [""],
      tier2Array: [""],
      rewardsForPeriod: [],
      totalEarnedRewards: "",
      yearlyEarn: "",
      windowWidth: 0,
    };
  },
  components: {
    DepositWithdraw,
    ExpectedInterest,
    InfoBlock,
    LockedToken,
    TotalDeposit,
  },
  async created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    await this.getAllParameters();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    setActionType(selectedType) {
      if (!selectedType) {
        this.actionStatus = false;
      } else {
        this.actionStatus = this.windowWidth < 768 && true;
      }
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
  .stake-item-two {
    margin-left: 20px;
    width: 59.2%;
  }
  .stake-item-one {
    width: 38.8%;
  }
}
@media screen and(min-width: 768px) and(max-width: 1000px) {
  .stake-text {
    margin-left: 28px;
  }
}
@media screen and(max-width: 767px) {
  .stake-text {
    margin-left: 16px;
  }
}
}
</style>
