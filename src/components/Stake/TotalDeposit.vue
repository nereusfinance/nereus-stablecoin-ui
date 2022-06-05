<template>
<div class="total-deposit-block">
  <p class="container-top">Total deposit
    <img
      src="@/assets/images/icon-info.svg"
      alt=""
      class="info-icon"
      v-tooltip="'Some text'"
    />
  </p>
  <p>
    <TokenIcon :token="pool.pairToken.name" />
    {{ balance }} {{ pool.pairToken.name}}
  </p>
  <div class="btns">
    <button
      class="deposit-btn"
      :class="{ active: actionType === 'Deposit' && actionStatus === true}"
      :disabled="actionStatus === true"
      @click="onClick('Deposit')"
    >
      Deposit
    </button>
    <button
      class="withdraw-btn"
      :class="{ active: actionType === 'Withdraw' && actionStatus === true}"
      :disabled="actionStatus === true"
      @click="onClick('Withdraw')"
    >
      Withdraw
    </button>
  </div>
</div>
</template>

<script>
import TokenIcon from  "@/components/UiComponents/TokenIcon";
export default {
  name: "TotalDeposit",
  data() {
    return {
    }
  },
  props: {
    pool: {
      type: Object,
      required: true,
    },
    actionStatus: {
      type: Boolean,
      required: true,
    },
    actionType: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function,
    }
  },
  computed: {
    balance() {
      console.log(this.$store.getters.getUserBalanceStaked);
      return this.$store.getters.getUserBalanceStaked;
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
  }
  .container-top {
    display: flex;
    flex-direction: row;
    font-size: 20px;
    height: 23px;
    gap: 8px;
    margin-bottom: 26px;
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

    background: #353535;
    border: 1px solid #414141;
    border-radius: 16px;
    margin-right: 16px;

    font-size: 14px;
    color: #8A8A8A;

    &.active {
      color: black;
      background-color: $clrBg3;
    }
  }
  .info-icon {
    width: 13.3px;
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
    &.active {
      color: black;
      background-color: $clrBg3;
    }
  }
}

@media screen and(max-width: 780px) {
  .total-deposit-block {
    width: 328px;
    height: 248px;
    padding: 24px 16px 20px 16px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 8px;
    .info-icon {
      width: 20px;
    }
    h1 {
      font-weight: 400;
      font-size: 18px;
      margin-bottom: 16px;
    }
    p {
      font-weight: 400;
      font-size: 20px;
    }

    .token-icon-wrap {
      width: 26px;
      height: 26px;
      margin-right: 6px;
    }

    .btns {
      display: flex;
      flex-direction: column;
      align-content: center;
    }
    .deposit-btn {
      margin-top: 28px;
      width: 296px;
      height: 48px;
      margin-right: 0;
      border-radius: 24px;
    }
    .withdraw-btn {
      margin-top: 12px;
      width: 296px;
      height: 48px;
      border-radius: 24px;
    }
    .container-top {;
      gap: 6px;
      font-size: 18px;
      margin-bottom: 16px;
    }
  }
}

</style>