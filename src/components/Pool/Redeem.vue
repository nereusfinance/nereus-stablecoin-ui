<template>
  <button
    :disabled="redeemDisabled"
    class="btn btn-action"
    @click="redeemHandler"
  >
    {{ redeemText }}
  </button>
</template>

<script>
export default {
  props: {
    contract: {
      required: true,
    },
    balance: {
      required: true,
    },
  },
  data() {
    return {
      processing: false,
    };
  },
  methods: {
    async redeemHandler() {
      try {
        this.processing = true;
        const redeemAmount = await this.contract.maxRedeem(this.account);
        const redeemTx = await this.contract.redeem(
          redeemAmount,
          this.account,
          this.account
        );
        await redeemTx.wait();
        this.$emit("refreshPoolInfo");
      } catch (err) {
        console.error("Redeem error", err);
      }
      setTimeout(() => {
        this.processing = false;
      }, 2000);
    },
  },
  computed: {
    account() {
      return this.$store.getters.getAccount;
    },
    redeemDisabled() {
      try {
        return this.processing || this.balance.eq(0);
      } catch (err) {
        console.error("redeemDisabled error", err);
      }
      return true;
    },
    redeemText() {
      return "Redeem";
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-action {
  width: 73px;
  height: 28px;
  color: black;
  margin-left: 20px;

  &:disabled {
    color: $clrDisableText;
  }
}
</style>
