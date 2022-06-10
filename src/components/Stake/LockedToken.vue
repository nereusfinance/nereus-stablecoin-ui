<template>
  <div class="locked-token-block">
    <h1>Locked {{pool.name}}</h1>
    <p>
      <TokenIcon :token="pool.name" />
      {{ formatBalance }} {{ pool.name }}
    </p>
    <div class="row-selected">
      <div v-if="balance < 500000"
        class="row"/>
      <div v-else-if="balance <= 5000000"
           class="row1"/>
      <div v-else-if="balance <= 50000000"
           class="row2"/>
      <div v-else-if="balance = 500000000"
           class="row3"/>
    </div>
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
          v-for="amount in tier1"
          :key="amount"
        >
          {{amount}}
        </div>
<!--        <div class="selected-row"/>-->
      </div>
    </div>
  </div>
</template>

<script>
import TokenIcon from "@/components/UiComponents/TokenIcon";

export default {
  name: "LockedToken",
  props: {
    pool: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tierOneArray: [],
      lockedTokenArray: [""],
      balance: this.$store.getters.getUserBalanceStaked,
    }
  },
  computed: {
    tier1() {
      return this.tierOneAmount(this.tierOneArray);
    },
    lockedToken() {
      return this.formatLockedToken(this.lockedTokenArray);
    },
    formatBalance() {
      return this.balance;
    },
  },
  methods: {
    tierOneAmount(arr) {
        arr = this.$store.getters.getTierOne;
        for (let i = 0; i < arr.length; i++) {
          arr[i] = arr[i].toString().slice(0, (5 + i));
          arr[i] = (arr[i].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        }
      return arr;
    },
    formatLockedToken(arr) {
      arr = this.$store.getters.getLockedToken;
      for(let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].toString().slice(0, (5 + i));
      }
      return arr;
    },
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
    margin-bottom: 28px;

    gap: 2px;
  }
  .token-icon-wrap {
    width: 32px;
    height: 32px;
    margin-right: 6px;
  }
  .row, .row1, .row2, .row3{
    position: relative;
    width: 364px;
    height: 40px;
    left: -10px;
    top: 15px;
    background: #F2F4FE;
    opacity: 0.04;
    border-radius: 4px;
  }
  .row1 {
    top: 50px;
  }
  .row2 {
    top: 85px;
  }
  .row3 {
    top: 118px;
  }
  .columns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    top: -40px;
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
      margin-top: 20px;
      margin-bottom: 16px;
    }

    p {
      font-weight: 400;
      font-size: 20px;
      margin-bottom: 24px;
    }
    .token-icon-wrap {
      width: 32px;
      height: 32px;
      margin-right: 6px;
    }

    .columns {
      display: flex;
      flex-direction: row;
      position: relative;
      top: -40px;
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
      margin-bottom: 24px;
    }
    .amount:first-child {
      margin-top: 12px;
    }
    .amount:last-child {
    }
    .row, .row1, .row2, .row3{
      position: relative;
      width: 312px;
      height: 40px;
      left: -9px;
      top: 15px;
      background: #F2F4FE;
      opacity: 0.04;
      border-radius: 4px;
    }
    .row1 {
      top: 57px;
    }
    .row2 {
      top: 100px;
    }
    .row3 {
      top: 143px;
    }
  }
}
</style>