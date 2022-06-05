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
      <div class="amount" v-for="amount in lockedToken" :key="amount">
        {{amount | formatNumber}}
      </div>
    </div>
    <div class="column">
      Tier 1 amount NXUSD
      <div
        class="amount"
        style="text-align: right"
        v-for="amount in tierOneAmount"
        :key="amount"
      >
        {{amount}}
      </div>
      <div class="selected-row"/>
    </div>
  </div>
</div>
</template>

<script>
import TokenIcon from  "@/components/UiComponents/TokenIcon";

export default {
  name: "LockedToken",
  props: {
    pool: {
      type: Object,
      required: true,
    },
  },
  computed: {
    tierOneAmount() {
      const arr = this.$store.getters.getTierOne;
      for(let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].toString().slice(0, (5 + i));
        arr[i] = (arr[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      }
      return arr;
    },
    lockedToken() {
      const arr = this.$store.getters.getLockedToken;
      for(let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].toString().slice(0, (5 + i));
      }
      return arr;
    },
    balance() {
      return this.$store.getters.getUserCollateralShare(this.pool.id);
    }
  },
  filters: {
    formatNumber(value) {
      if (!value) return value;
      if (Number(value) === 0) return value;

      const lookup = [
        { value: 0, symbol: "" },
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      let item = lookup
        .slice()
        .reverse()
        .find(function(item) {
          return parseFloat(value) >= item.value;
        });
      return (
        (parseFloat(value) / item.value).toFixed(0).replace(rx, "$1") +
        item.symbol
      );
    },
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
  .selected-row {
    position: absolute;
    width: 364px;
    height: 40px;
    left: 110px;
    top: 613px;
    background: #F2F4FE;
    opacity: 0.04;
    border-radius: 4px;
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
    color: #8A8A8A;

    text-align: left;
  }
  .amount {
    font-weight: 400;
    font-size: 16px;
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

@media screen and(max-width: 780px) {
  .locked-token-block {
    height: 316px;
    width: 328px;

    border-radius: 4px;

    margin: 0 auto 8px auto;
    padding: 24px 16px 16px 16px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      font-weight: 400;
      font-size: 18px;
      text-align: left;

      margin-bottom: 16px;
    }

    p {
      font-weight: 400;
      font-size: 20px;
    }
    .token-icon-wrap {
      width: 32px;
      height: 32px;
      margin-right: 6px;
    }

    .columns {
      display: flex;
      flex-direction: row;
      margin-top: 24px;
    }
    .column {
      font-weight: 400;
      font-size: 12px;
      color: #8A8A8A;

      text-align: left;
    }
    .selected-row {
      width: 312px;
      height: 44px;
      left: 49px;
      top: 836px;
    }
    .amount {
      font-weight: 400;
      font-size: 16px;
      margin-bottom: 24px;
    }
    .amount:first-child {
      margin-top: 12px;
    }
    .amount:last-child {
    }
  }
}
</style>