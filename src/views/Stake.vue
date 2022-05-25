<template>
<div class="stake-view">
  <div class="stake-container">
    <h1>Earn</h1>
    <div class="stake-content">
      <div class="container-mini">
        <TotalDeposit
          :pool="pool"
        />

        <LockedToken
          :pool="pool"
        />
      </div>
      <div class="container-mini">
        <InfoBlock
        />

        <ExpectedInterest
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
export default {
  name: "Stake",
  data() {
    return {
    }
  },
  computed: {
    pool() {
      //const poolId = Number(this.$route.params.id);
      const poolId = Number(6);
      return this.$store.getters.getPoolById(poolId);
    },
  },
  components: { ExpectedInterest, InfoBlock, LockedToken, TotalDeposit }
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