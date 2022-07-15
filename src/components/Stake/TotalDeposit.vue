<template>
  <div class="total-deposit-block">
    <p class="container-top">
      Total deposit
      <img
        v-tooltip="'Your total deposited NXUSD amount'"
        alt=""
        class="info-icon"
        src="@/assets/images/icon-info.svg"
      />
    </p>
    <div class="total-balance">
      <img
        alt=""
        class="token-icon"
        src="@/assets/images/tokens-icon/Token_NXUSD.svg"
      />
      <p v-tooltip="balanceWithDecimals" class="info-tooltip">
        {{ balance }} NXUSD
      </p>
    </div>
    <div class="btns">
      <button
        :class="{ notActive: actionType === 'Withdraw' }"
        :disabled="actionType === 'Withdraw'"
        class="deposit-btn"
        @click="onClick('Deposit')"
        data-cy="stake-button"
      >
        Deposit
      </button>
      <button
        :class="{
          notActive: actionType === 'Deposit' || isDisabled,
        }"
        :disabled="isDisabled || actionType === 'Deposit'"
        class="withdraw-btn"
        @click="onClick('Withdraw')"
        data-cy="unstake-button"
      >
        Withdraw
      </button>
    </div>
  </div>
</template>

<script>
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
    balanceWithDecimals() {
      return this.normalizeBNValues(
        this.$store.getters.getUserCurrentRewards.rewards
      );
    },
    balance() {
      return parseFloat(
        this.normalizeBNValues(
          this.$store.getters.getUserCurrentRewards.rewards
        )
      ).toFixed(2);
    },
    isDisabled() {
      return Number(this.$store.getters.getUserCurrentRewards.rewards) === 0;
    },
  },
  methods: {
    normalizeBNValues(value) {
      return this.$ethers.utils.formatEther(value);
    },
  },
};
</script>

<style lang="scss" scoped>
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
  }

  .token-icon {
    width: 32px;
    height: 32px;
    margin-right: 0;
    margin-left: 0;
  }

  .btns {
    display: flex;
    flex-direction: row;
  }

  .deposit-btn {
    cursor: pointer;
    text-align: center;
    align-items: center;
    padding: 6px 53.5px;

    width: auto;
    height: 32px;

    background: $clrBg3;
    border: none;
    border-radius: 16px;
    margin-right: 16px;

    font-size: 14px;
    color: black;

    &.notActive {
      color: #8a8a8a;
      background-color: #353535;
    }

    &:disabled:hover {
      cursor: not-allowed;
      color: #8a8a8a;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
        #353535;
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
    text-align: center;
    align-items: center;
    padding: 6px 17px;

    width: auto;
    height: 32px;

    background: $clrBg3;
    border: none;
    border-radius: 16px;

    font-size: 14px;
    color: black;

    &.notActive {
      color: #8a8a8a;
      background-color: #353535;
    }

    &:disabled:hover {
      cursor: not-allowed;
      color: #8a8a8a;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
        #353535;
    }
  }

  .withdraw-btn:hover {
    color: black;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      #e7fc6e;
  }

  .total-balance {
    display: flex;
    flex-direction: row;
    gap: 8px;
    font-size: 18px;
    margin-bottom: 16px;
  }
}

@media screen and(min-width: 768px) and(max-width: 1000px) {
  .total-deposit-block {
    height: 186px;
    padding: 24px 16px 24px 16px;
    margin-bottom: 8px;

    p {
      font-size: 20px;
    }

    .deposit-btn {
      font-size: 20px;
      width: 140px;
      height: 40px;
      margin-right: 8px;
      border-radius: 20px;
      padding: 8px 16px;
      gap: 10px;
    }

    .withdraw-btn {
      border: none;
      font-size: 20px;
      width: 100px;
      height: 40px;
      border-radius: 20px;
      padding: 8px 3px;
      font-weight: 400;
      line-height: 24px;
    }
  }
}

@media screen and(max-width: 767px) {
  .total-deposit-block {
    height: 248px;
    padding: 24px 16px 20px 16px;
    margin: 0 auto 8px;

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

    .container-top {
      margin-bottom: 16px;
    }

    .total-balance {
      margin-bottom: 24px;
    }

    .btns {
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
    }

    .deposit-btn {
      width: 296px;
      height: 48px;
      margin-right: 0;
      border-radius: 24px;
      font-size: 18px;
    }

    .withdraw-btn {
      margin-top: 12px;
      width: 296px;
      height: 48px;
      border-radius: 24px;
      font-size: 18px;
    }
  }
}
</style>
