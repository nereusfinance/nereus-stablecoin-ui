<template>
<div class="locked-token-block">
  <h1>Locked {{pool.name}}</h1>
  <p>
    <TokenIcon :token="pool.name" />
    {{ balance }} {{ pool.name }}
  </p>
  <div class="columns">
    <div class="column">
      Locked {{pool.name}}
      <div class="amount" v-for="amount in lockedTokenAmount" :key="amount">
        {{amount}}
      </div>
    </div>
    <div class="column">
      Tier 1 amount NXUSD
      <div class="amount" v-for="amount in lockedTokenAmount" :key="amount">
        {{amount}}
      </div>
    </div>
  </div>
</div>
</template>

<script>
import TokenIcon from  "@/components/UiComponents/TokenIcon";

export default {
  name: "LockedToken",
  data() {
    return {
      lockedTokenAmount: ["50K+", "500K+", "5M+", "50M+"],
    };
  },
  props: {
    pool: {
      type: Object,
      required: true,
    },
  },
  computed: {
    balance() {
      return this.$store.getters.getUserCollateralShare(this.pool.id);
    }
  },
  components: {
    TokenIcon,
  }
};
</script>

<style scoped lang="scss">
.locked-token-block {
  height: 338px;
  width: 388px;

  background: #262626;
  border-radius: 4px;

  margin: 0 20px 0 0;
  padding: 32px 24px 24px 24px;

  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 400;
    font-size: 20px;
    text-align: left;

    margin-bottom: 24px;
  }

  p {
    font-size: 24px;

    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 2px;
  }
  .token-icon-wrap {
    width: 32px;
    height: 32px;
    margin-right: 6px;
  }

  .columns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
  }
  .column {
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #8A8A8A;

    text-align: left;
  }
  .amount {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #FFFFFF;
    margin-bottom: 16px;
  }
  .amount:first-child {
    margin-top: 12px;
  }
  .amount:last-child {
    margin-bottom: 0;
  }
}
</style>