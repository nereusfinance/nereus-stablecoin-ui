<template>
  <div v-if="isConnected" class="dashboard-view">
    <div class="container mini">
      <h1>Dashboard</h1>

      <div v-if="false" class="transaction-btn" @click="toTransactions">
        <p>Transactions</p>
      </div>

      <template v-if="pools">
        <StatisticsBlock :pools="userPools" />

        <div class="btns-group">
          <button
            :class="{ active: shortcutState === 'borrow' }"
            class="btn mini borrow-btn"
            @click="setShortcutType('borrow')"
          >
            Borrow
          </button>
          <button
            :class="{ active: shortcutState === 'repay' }"
            class="btn mini replay-btn"
            @click="setShortcutType('repay')"
          >
            Repay
          </button>
        </div>

        <div v-if="userPools.length" class="items-wrap">
          <OpenPoolItem
            v-for="pool in userPools"
            :key="pool.id"
            :actionType="shortcutState"
            :pool="pool"
          />
        </div>

        <EmptyPoolsState v-else :blockType="shortcutState" />
      </template>
    </div>
  </div>
  <div v-else class="stand-action-view">
    <ActionComponent
        :disabled-status="disabledStatus"
        :name="name"
        :onClick="walletBtnHandler"
        :text="text"
    />
  </div>
</template>

<script>
const StatisticsBlock = () => import("@/components/Dashboard/StatisticsBlock");
const OpenPoolItem = () => import("@/components/Dashboard/OpenPoolItem");
const EmptyPoolsState = () => import("@/components/Dashboard/EmptyPoolsState");
const ActionComponent = () =>
    import("@/components/UiComponents/ActionComponent");

import sspellToken from "@/mixins/sspellToken.js";

export default {
  mixins: [sspellToken],
  data() {
    return {
      text: "Please connect your wallet",
      name: "Connect",
      disabledStatus: false,
      shortcutState: "borrow",
    };
  },
  computed: {
    pools() {
      return this.$store.getters.getPools;
    },
    isConnected() {
      return this.$store.getters.getWalletIsConnected;
    },
    userPools() {
      return this.pools.filter(
        (pool) =>
          pool.userBorrowPart !== "0.0" || pool.userCollateralShare !== "0.0"
      );
    },
  },
  methods: {
    setShortcutType(type) {
      if (type !== this.shortcutState) this.shortcutState = type;
    },
    toTransactions() {
      // this.$router.push({ name: "Transactions" });
    },
    async walletBtnHandler() {
      if (this.isConnected) {
        return false;
      }
      this.$store.commit("setPopupState", {
        type: "connectWallet",
        isShow: true,
      });
    },
    async getUserBorrowPart(poolContract) {
      try {
        const userBorrowPart = await poolContract.userBorrowPart(this.account);
        return userBorrowPart;
      } catch (e) {
        console.log("getuserBorrowPartNonce err:", e);
      }
    },
    async getUserCollateralShare(poolContract) {
      try {
        const userCollateralShare = await poolContract.userCollateralShare(
          this.account
        );
        return userCollateralShare;
      } catch (e) {
        console.log("getUserCollateralShare err:", e);
      }
    },
  },
  async created() {
    this.createStakePool();
  },
  mounted() {},
  components: {
    StatisticsBlock,
    OpenPoolItem,
    EmptyPoolsState,
    ActionComponent,
  },
};
</script>

<style lang="scss" scoped>
@import "src/mixins/screen-size";

.stand-action-view {
  position: relative;
  flex: 1;
  background: #1c1c1c;
  @include respond-to(sm) {
    display: flex;
    justify-content: center;
  }
}

.dashboard-view {
  padding-top: 40px;
  padding-bottom: 40px;
  flex: 1;

  h1 {
    font-size: 32px;
    line-height: 36px;
    margin-bottom: 20px;
    text-align: left;
    @include respond-to(sm) {
      margin-bottom: 24px;
    }
  }

  .transaction-btn {
    margin-left: auto;
    cursor: pointer;
    width: max-content;
    margin-bottom: 30px;

    p {
      font-size: 20px;
      color: $clrBlue;
    }
  }

  .btns-group {
    display: flex;
    align-items: center;
    width: 146px;
    height: 32px;
    background: #262626;
    border-radius: 100px;
    padding: 2px;
    margin-bottom: 24px;
    @include respond-to(sm) {
      width: 100%;
      margin-bottom: 54px;
    }

    .btn {
      width: 73px;
      height: 32px;
      font-size: 14px;
      line-height: 20px;
      background: #262626;
      @include respond-to(sm) {
        width: 50%;
      }

      &:hover {
        //background-color: $clrBlue5;
      }

      &.borrow-btn {
        //margin-right: 20px;
      }

      &.active {
        color: black;
        background-color: white;
      }
    }
  }

  .items-wrap {
    display: grid;
    grid-template-columns: 486px 486px;
    column-gap: 26px;
    row-gap: 26px;
  }
}

@media screen and(max-width: 1024px) {
  .dashboard-view {
    padding-top: 40px;
  }

  .dashboard-view .btns-group {
    justify-content: center;
  }
}

@media screen and(max-width: 780px) {
  .dashboard-view .transaction-btn {
    margin-right: auto;
    margin-bottom: 40px;
  }
  .dashboard-view .items-wrap {
    grid-template-columns: 100%;
  }
}

@media screen and(max-width: 640px) {
}
</style>
