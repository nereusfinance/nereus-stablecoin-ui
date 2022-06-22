<template>
  <div class="total-deposit-block">
    <p class="container-top">
      Total deposit
      <img
        src="@/assets/images/icon-info.svg"
        alt=""
        class="info-icon"
        v-tooltip="'Your deposited NXUSD'"
      />
    </p>
    <p>
      <TokenIcon token="NXUSD" />
      {{ balance }} NXUSD
    </p>
    <div class="btns">
      <button
        class="deposit-btn"
        :class="{ notActive: actionType === 'Withdraw' }"
        @click="onClick('Deposit')"
      >
        Deposit
      </button>
      <button
        class="withdraw-btn"
        :class="{ notActive: actionType === 'Deposit' || isDisabled }"
        @click="onClick('Withdraw')"
        :disabled="isDisabled"
      >
        Withdraw
      </button>
    </div>
  </div>
</template>

<script>
import TokenIcon from "@/components/UiComponents/TokenIcon";
export default {
  name: "TotalDeposit",
  data() {
    return {};
  },
  props: {
    actionType: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function,
    },
  },
  computed: {
    balance() {
      return new Intl.NumberFormat("en-EN").format(
        parseFloat(
          this.$ethers.utils.formatEther(this.$store.getters.getUserData[1])
        ).toFixed(2)
      );
    },
    isDisabled() {
      return Number(this.balance) === 0;
    },
    isEnabled() {
      return Number(this.balance) > 0;
    },
  },
  components: {
    TokenIcon,
  },
};
</script>

<style scoped lang="scss">
.total-deposit-block {
  width: 100%;

  background: #262626;
  border-radius: 4px;

  margin-bottom: 20px;
  padding: 32px 24px 24px 24px;

  display: flex;
  flex-direction: column;

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
    cursor: pointer;
    margin-top: 18px;
    text-align: center;
    align-items: center;
    padding: 6px 53.5px;

    width: auto;
    height: 32px;

    background: $clrBg3;
    border: 1px solid #414141;
    border-radius: 16px;
    margin-right: 16px;

    font-size: 14px;
    color: black;

    &.notActive {
      color: #8a8a8a;
      background-color: #353535;
    }
  }
  .deposit-btn:hover {
    color: black;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      #e7fc6e;
  }
  .info-icon {
    width: 13.3px;
  }
  .withdraw-btn {
    cursor: pointer;
    margin-top: 18px;
    text-align: center;
    align-items: center;
    padding: 6px 17px;

    width: auto;
    height: 32px;

    background: $clrBg3;
    border: 1px solid #414141;
    border-radius: 16px;

    font-size: 14px;
    color: black;
    &.notActive {
      color: #8a8a8a;
      background-color: #353535;
    }
  }
  .withdraw-btn:hover {
    color: black;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      #e7fc6e;
  }
}

@media screen and(min-width: 768px) and(max-width: 1000px) {
  .total-deposit-block {
    height: 186px;
    padding: 24px 16px 24px 16px;
    p {
      font-size: 20px;
    }
    .token-icon-wrap {
      width: 26px;
      height: 26px;
      margin-right: 6px;
    }
    .deposit-btn {
      width: 140px;
      margin-right: 8px;
      border-radius: 20px;
      height: 40px;
      padding: 0 0 3px 0;
    }
    .withdraw-btn {
      width: 100px;
      height: 40px;
      border-radius: 20px;
      padding: 0 0 3px 0;
    }
  }
}

@media screen and(max-width: 767px) {
  .total-deposit-block {
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
      align-items: center;
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
    .container-top {
      gap: 6px;
      font-size: 18px;
      margin-bottom: 16px;
    }
  }
}
</style>
