<template>
<div class="info-block">
  <div class="columns">
    <div class="column">
        Tier 1 amount
      <h2>
        <span style="color: white">{{tierOne | formatNumber}}</span> NXUSD
      </h2>
      <p class="apy">
        {{apyTierOne}}%<span>APY</span>
      </p>
    </div>

    <div class="column">
        Tier 2 amount
      <h2>
        <span style="color: white">{{tierOne}}</span> NXUSD
      </h2>
      <p class="apy">
        {{apyTierTwo}}%<span>APY</span>
      </p>
    </div>
  </div>
  <div class="column">
    Yearly earn
    <h1>
      {{apyTierOne}}<span>NXUSD</span>
    </h1>
  </div>
</div>
</template>

<script>
export default {
  name: "InfoBlock",
  props: {
    pool: {
      type: Object,
      required: true,
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
        (parseFloat(value) / item.value).toFixed(0).replace(rx, "$1") + ".00" +
        item.symbol
      );
    },
  },
  computed: {
    apyTierOne() {
      let apy = this.$store.getters.getAPYTierOne.toString();
      return parseFloat(apy.toString());
    },
    apyTierTwo() {
      let apy = this.$store.getters.getAPYTierTwo.toString();
      return parseFloat(apy.toString());
    },
    tierOne() {
      let lockedToken = (this.$store.getters.getUserBalanceStaked / 1000000000000000000);
      let value;
        if(lockedToken < 500000)
          value = 1000;
        else if(lockedToken <= 5000000)
          value = 15000;
        else if(lockedToken <= 50000000)
          value = 300000;
        else if(lockedToken >= 500000000)
          value = 5000000;
      return value;
      // let tierOne = (this.$store.getters.getUserBalanceStaked / 1000000000000000000).toString();
      // return parseFloat(tierOne.toString());
    },
    tierTwo() {
      let apy = this.$store.getters.getTierTwo.toString();
      return parseFloat(apy.toString());
    }
  }
};
</script>

<style scoped lang="scss">
.info-block {
  width: 592px;
  height: 315px;

  background: #262626;
  border-radius: 4px;

  margin-bottom: 8px;
  padding: 32px 24px 24px 24px;

  display: flex;
  flex-direction: column;

  .columns {
    display: flex;
    flex-direction: row;
  }
  .column {
    margin-right: 70px;
    margin-bottom: 31px;
    font-weight: 400;
    font-size: 14px;
    color: #8A8A8A;

    text-align: left;

    h2 {
      margin-top: 4px;
      margin-bottom: 8px;
      font-size: 16px;
      color: #8A8A8A;
    }
  }

  p.apy {
    font-weight: 600;
    font-size: 60px;
    color: #55BCC0;

    span {
      font-weight: 600;
      font-size: 24px;
      color: #55BCC0;
    }
  }

  h1 {
    text-align: left;
    font-weight: 600;
    font-size: 96px;
    color: #55BCC0;
    gap: 2px;

    span {
      font-size: 24px;
      color: #55BCC0;
    }
  }
}
@media screen and(min-width: 768px) and(max-width: 1000px) {
  .info-block {
    width: 424px;
    height: 280px;
    padding: 24px 16px 16px 16px;

    .columns {
      height: 136px;
    }

    h1 {
      font-size: 80px;
    }
  }
}

@media screen and(max-width: 767px) {
  .info-block {
    height: 230px;
    width: 328px;
    border-radius: 4px;

    margin-left: auto;
    margin-right: auto;
    padding: 24px 16px 16px 16px;

    .columns {
      height: 110px;
    }

    .column {
      display: flex;
      flex-direction: column;
      margin-right: 24px;

      h1 {
        font-weight: 600;
        font-size: 64px;
        margin: 0;
        span {
          font-weight: 600;
          font-size: 16px;
        }
      }
    }

    h2 {
      font-weight: 400;
      font-size: 16px;
      margin-bottom: 0;
    }
    p.apy {
      font-weight: 600;
      font-size: 48px;

      span {
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
}

</style>