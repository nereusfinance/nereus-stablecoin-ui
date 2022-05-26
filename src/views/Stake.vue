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
      actionStatus: true,
      actionType: "deposit",
    }
  },
  methods: {
    setActionType(type) {
      if (type !== this.actionType) this.actionType = type;
    },
    async created() {
      const isConnected = this.$store.getters.getWalletIsConnected;

      if (!isConnected) {
        this.$router.push({ name: "Stand" });
        return false;
      }

      if (
        this.$route.query.actionType &&
        (this.$route.query.actionType === "deposit" ||
          this.$route.query.actionType === "withdraw")
      )
        this.setActionType(this.$route.query.actionType);
    },
  },
  computed: {
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