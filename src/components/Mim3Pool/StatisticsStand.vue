<template>
  <div class="statistics-stand">
    <div class="btns-group">
      <button
        :class="{ active: actionType === 'share' }"
        class="btn mini borrow-btn"
        @click="setActionType('share')"
      >
        My share
      </button>
      <button
        :class="{ active: actionType === 'reserves' }"
        class="btn mini replay-btn"
        @click="setActionType('reserves')"
      >
        Currency reserves
      </button>
    </div>

    <div class="items-wrap">
      <TokenItem />
      <InfoItem />
    </div>
  </div>
</template>

<script>
const InfoItem = () => import("@/components/Mim3Pool/InfoStatisticItem");
const TokenItem = () => import("@/components/Mim3Pool/TokenStatisticItem");

export default {
  data() {
    return {
      actionType: "share",
    };
  },
  methods: {
    setActionType(type) {
      if (type !== this.actionType) this.actionType = type;
    },
  },
  components: {
    InfoItem,
    TokenItem,
  },
};
</script>

<style lang="scss" scoped>
@import "src/mixins/screen-size";

.statistics-stand {
  padding: 30px 20px;
  background: $clrBg2;
  border-radius: 20px;

  h2 {
    margin-bottom: 30px;
  }

  .items-wrap {
    max-height: 380px;
    overflow-y: auto;
  }

  .btns-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .btn {
      width: calc(50% - 10px);
      font-size: 16px;
      line-height: 1;
      background: rgba(123, 121, 247, 0.3);

      &:hover {
        background-color: $clrBlue5;
      }

      &.borrow-btn {
        margin-right: 20px;
      }

      &.active {
        background-color: $clrBlue;
      }
    }
  }
}

@media screen and(max-width: 780px) {
  .statistics-stand {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
