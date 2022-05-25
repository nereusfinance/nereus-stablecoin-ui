<template>
<div class="total-deposit-block">
  <h1>Total deposit
    <img
      src="@/assets/images/i-icon.svg"
      alt=""
      class="info-icon"
      v-tooltip="'Some text'"
    />
  </h1>
  <p>
    <TokenIcon :token="pool.name" />
    {{ balance }} {{ pool.name }}
  </p>
  <div class="btns">
    <button class="deposit-btn">Deposit</button>
    <button class="withdraw-btn">Withdraw</button>
  </div>
</div>
</template>

<script>
import TokenIcon from  "@/components/UiComponents/TokenIcon";
export default {
  name: "TotalDeposit",
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
.total-deposit-block {
  width: 388px;
  height: 186px;

  background: #262626;
  border-radius: 4px;

  margin: 0 20px 20px 0;
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

  .btns {
    display: flex;
    flex-direction: row;
  }
  .deposit-btn {
    margin-top: 18px;
    text-align: center;
    align-items: center;
    padding: 6px 53.5px;

    width: auto;
    height: 32px;

    background: #E7FC6E;
    border-radius: 16px;

    margin-right: 16px;

    font-size: 14px;
  }
  .withdraw-btn {
    margin-top: 18px;
    text-align: center;
    align-items: center;
    padding: 6px 17px;

    width: auto;
    height: 32px;

    background: #353535;
    border: 1px solid #414141;
    border-radius: 16px;

    font-size: 14px;
    color: #8A8A8A;
  }
}
</style>