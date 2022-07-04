<template>
  <div class="locked-wrapper">
    <span class="locked-header">Locked {{ lockedTokenName }}</span>
    <div class="locked-balance">
      <TokenIcon :token="lockedTokenName"/>
      <p v-tooltip="formatBNValues(balance)" class="info-tooltip">
        {{ formatBNValuesRounded(balance) }}
        {{ lockedTokenName }}
      </p>
    </div>
    <div class="locked-table-header">
      <div class="locked-table-header-item">Locked {{ lockedTokenName }}</div>
      <div class="locked-table-header-item">Tier 1 amount NXUSD</div>
    </div>
    <div
        v-for="(item, index) in config"
        v-show="index > 0"
        :key="index"
        :class="{ selected: isActive(config, index) }"
        class="locked-table-row"
    >
      <div v-if="index > 0" class="locked-table-item">
        {{ normalizeBNValues(item[0]) | formatNumber }}
      </div>
      <div v-if="index > 0" class="locked-table-item">
        {{ formatBNValuesRounded(item[1]) }}
      </div>
    </div>
  </div>
</template>

<script>
import TokenIcon from "@/components/UiComponents/TokenIcon";
import {ethers} from "ethers";

export default {
  name: "LockedToken",
  data() {
    return {
      lockedTokenName: "WXT",
    };
  },
  computed: {
    config() {
      return this.$store.getters.getAPYDataConfig;
    },
    balance() {
      return this.$store.getters.getUserWXTLock;
    },
    userTier1() {
      return this.$store.getters.getUserData[0][2];
    },
  },
  methods: {
    isActive(config, currentIndex) {
      const currentValue = config[currentIndex][0];
      const nextValue = config[currentIndex + 1]?.[0];
      if (!nextValue && this.balance.lt(currentValue)) {
        return false;
      }
      if (!nextValue || currentValue.eq(this.balance)) {
        return true;
      }

      return !!(this.balance.gt(currentValue) && this.balance.lt(nextValue));
    },
    normalizeBNValues(value) {
      return ethers.utils.formatEther(value);
    },
    formatBNValues(value) {
      const normalizedValue = this.normalizeBNValues(value);
      return parseFloat(normalizedValue).toFixed(18);
    },
    formatBNValuesRounded(value) {
      const normalizedValue = this.normalizeBNValues(value);
      return new Intl.NumberFormat("en-EN").format(
          parseFloat(normalizedValue).toFixed(2)
      );
    },
  },
  filters: {
    formatNumber(value) {
      if (!value) return value;
      if (Number(value) === 0) return value;

      const lookup = [
        {value: 0, symbol: ""},
        {value: 1, symbol: ""},
        {value: 1e3, symbol: "K"},
        {value: 1e6, symbol: "M"},
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      let item = lookup
          .slice()
          .reverse()
          .find(function (item) {
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
  },
};
</script>

<style lang="scss" scoped>
.info-tooltip {
  cursor: pointer;
}

.locked-wrapper {
  width: 100%;
  background: #262626;
  border-radius: 4px;
  padding: 32px 16px 16px 24px;
  display: flex;
  flex-direction: column;

  .locked-header {
    font-weight: 400;
    font-size: 20px;
    text-align: left;
  }

  .locked-balance {
    font-size: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 22px;
  }

  .token-icon-wrap {
    width: 32px;
    height: 32px;
    margin-right: 8px;
  }

  .locked-table-header {
    display: flex;
    justify-content: space-between;
    font-weight: 400;
    font-size: 12px;
    color: #8a8a8a;
    margin-top: 28px;
    margin-bottom: 4px;
  }

  .locked-table-row {
    display: flex;
    justify-content: space-between;
    font-weight: 400;
    font-size: 16px;
    color: #ffffff;
    padding: 8px 0;
  }

  .locked-table-row.selected {
    background: #2e2e2f;
    border-radius: 4px;
  }
}

@media screen and(min-width: 768px) and(max-width: 1000px) {
  .locked-token-block {
    height: 330px;
    width: 280px;
    border-radius: 4px;
    padding: 32px 16px 16px 16px;
    margin-right: 8px;

    p {
      font-size: 20px;
    }

    .row,
    .row1,
    .row2,
    .row3 {
      position: relative;
      width: 264px;
      height: 40px;
      left: -9.5px;
      top: 15px;
      background: #f2f4fe;
      opacity: 0.04;
      border-radius: 4px;
    }

    .row1 {
      top: 48px;
    }

    .row2 {
      top: 83px;
    }

    .row3 {
      top: 117px;
    }
  }
}

@media screen and(max-width: 767px) {
  .locked-wrapper {
    padding: 24px 16px 16px 16px;
  }
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
      margin-right: 8px;
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
      color: #8a8a8a;

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

    .row,
    .row1,
    .row2,
    .row3 {
      position: relative;
      width: 312px;
      height: 40px;
      left: -9px;
      top: 15px;
      background: #f2f4fe;
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
