<template>
  <div class="stake">
    <div class="stake-view">
      <h1 class="stake-text">Earn</h1>
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
            :tier1Array="tier1Array"
            :tier2Array="tier2Array"
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
      <MobileStake class="mobile-ui"/>
  </div>
</template>

<script>
import TotalDeposit from "@/components/Stake/TotalDeposit";
import LockedToken from "@/components/Stake/LockedToken";
import InfoBlock from "@/components/Stake/InfoBlock";
import ExpectedInterest from "@/components/Stake/ExpectedInterest";
import DepositWithdraw from "@/components/Stake/DepositWithdraw";
import MobileStake from "@/views/MobileStake";
import nxusdStakingContractInfo from "@/utils/contracts/NXUSDStaking";
import nxusdStakingCalculationInfo from "@/utils/contracts/NXUSDStakingCalculation";
export default {
  name: "Stake",
  data() {
    return {
      actionStatus: false,
      actionType: "",
      tier1Array: [""],
      tier2Array: [""],
    }
  },
  created() {
    this.createNXUSDStaking();
    this.createNXUSDStakingCalculation();
    this.checkUserBalanceStaked();
    this.setStakingInfo();
    console.log("Balance",this.$store.getters.getUserBalanceStaked);
    console.log("Instance", this.$store.getters.getNXUSDStakingContract);
  },
  methods: {
    async setStakingInfo() {
      const nxusdStaking = this.$store.getters.getNXUSDStakingContract;
      let userData = (await nxusdStaking.userData(this.account));
      this.$store.commit("setUserData", userData);


      let userBalance = userData.balance;
      this.$store.commit("setUserBalanceStaked", userBalance);


      let userRewards = (await nxusdStaking.getUserRewards(this.account));
      this.$store.commit("setUserStoredRewards", userRewards);

      let getAPYDataConfig = (await nxusdStaking.getAPYDataConfig(1));
      this.$store.commit("setAPYConfig", getAPYDataConfig);

      let tierOne = [];
      let lockedToken = [];
      for(let i = 1, j = 0; i < 5; i++, j++){
        tierOne[j] = getAPYDataConfig[i].NXUSDByTier1.toString();
        lockedToken[j] = getAPYDataConfig[i].WXTLocked.toString();
      }
      this.$store.commit("setTierOne", tierOne);
      this.$store.commit("setLockedToken", lockedToken);

      const nxusdStakingCalculation = this.createNXUSDStakingCalculation();
      let tableRewards = await nxusdStakingCalculation.calculateTableRewards(this.account, [86400, 604800, 2629746, 31556952]);
      this.$store.commit("setTableRewards", tableRewards);
      console.log(this.$store.getters.getTableRewards);

      for(let i = 0; i < 4; i++) {
        this.tier1Array[i] = tableRewards[i].rewardsTier1.toString();
        this.tier2Array[i] = tableRewards[i].rewardsTier2;
      }
      console.log(this.tier1Array);
      console.log(this.tier2Array);


      let apyTierOne = getAPYDataConfig[1].APYTier1;
      this.$store.commit("setAPYTierOne", parseFloat(apyTierOne.toString()));

      let apyTierTwo = (await nxusdStaking.config(1)).APYTier2;
      this.$store.commit("setAPYTierTwo", parseFloat(apyTierTwo.toString()));
    },
    async checkUserBalanceStaked() {
      await this.$store.dispatch("checkUserBalanceStaked");
    },
    createNXUSDStaking() {
      const nxusdStaking = new this.$ethers.Contract(
        nxusdStakingContractInfo.address,
        JSON.stringify(nxusdStakingContractInfo.abi),
        this.signer
      );
      this.$store.commit("setNXUSDStakingContractInstance", nxusdStaking);
    },
    createNXUSDStakingCalculation() {
      const nxusdStakingCalculation = new this.$ethers.Contract(
        nxusdStakingCalculationInfo.address,
        JSON.stringify(nxusdStakingCalculationInfo.abi),
        this.signer
      );
      return nxusdStakingCalculation;
      //this.$store.commit("setNXUSDStakingContractInstance", nxusdStaking);
    },
    setActionStatus() {
      this.actionStatus = this.actionStatus === false;
    },
    setActionType(type) {
      console.log(this.$store.getters.getUserStoredRewards);
      if (type !== this.actionType)
        this.actionType = type;
      this.actionStatus = this.actionStatus === false;
    },
  },
  computed: {
    signer() {
      return this.$store.getters.getSigner;
    },
    //address
    account() {
      return this.$store.getters.getAccount;
    },
    pool() {
      //const poolId = Number(this.$route.params.id);
      const poolId = Number(6);
      return this.$store.getters.getPoolById(poolId);
    },
  },
  components: { MobileStake, DepositWithdraw, ExpectedInterest, InfoBlock, LockedToken, TotalDeposit }
};
</script>

<style scoped lang="scss">
.stake {
  margin-left: auto;
  margin-right: auto;
  flex: 1;
}
.stake-view {
  padding-top: 40px;
  padding-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
  flex: 1;

  h1 {
    font-size: 32px;
    line-height: 36px;
    margin-bottom: 20px;
    text-align: left;
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

@media screen and(min-width: 768px) {
  .mobile-ui {
    display: none;
  }
}
@media screen and(min-width: 768px) and(max-width: 1000px) {
  .stake-view {
    margin-left: auto;
    margin-right: auto;
    flex: 1;
  }
}
@media screen and(max-width: 767px) {
  .stake-view {
    display: none;
  }
}
</style>