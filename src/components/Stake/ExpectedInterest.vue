<template>
  <div class="expected-interest-block">
    <div class="expected-interest-title">
      <div>Expected interest</div>
      <img
        src="@/assets/images/icon-info.svg"
        alt=""
        class="fist-info-icon"
        v-tooltip="'Approximated interest for now'"
      />
    </div>
    <div class="container-interest">
      <div>
        <div class="column-interest" v-for="time in period" :key="time">
          {{ time }}
        </div>
      </div>
      <div>
        <p>Tier 1</p>
        <div
          class="column-tier"
          v-for="(reward, i) in rewardsForPeriod"
          :key="i"
        >
          {{ formatBNValues(reward.rewardsTier1) }}
        </div>
      </div>
      <div>
        <p>Tier 2</p>
        <div
          class="column-tier"
          v-for="(reward, i) in rewardsForPeriod"
          :key="i"
        >
          {{ formatBNValues(reward.rewardsTier2) }}
        </div>
      </div>
      <div style="flex-direction: row">
        <p class="total-text">Total</p>
        <div
          class="column-tier total"
          v-for="(reward, i) in rewardsForPeriodTotal"
          :key="i"
        >
          <span
            >{{ formatBNValues(reward) }}<span class="value-text">NXUSD</span>
          </span>
        </div>
      </div>
    </div>
    <div class="total-earned-rewards">
      <div class="total-title">
        <div>Total earned</div>
        <img
          src="@/assets/images/icon-info.svg"
          alt=""
          class="info-icon"
          v-tooltip="'Total earned rewards without deposit amount'"
        />
      </div>
      <div class="total-amount">
        {{ formatBNValues(totalEarnedRewards)
        }}<span class="value-text">NXUSD</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpectedInterest",
  data() {
    return {
      period: ["Daily", "Weekly", "Monthly", "Yearly"],
    };
  },
  async mounted() {
    await this.$store.dispatch("checkUserCurrentRewards");
    await this.$store.dispatch(
      "calculateTableRewards",
      [86400, 604800, 2629746, 31556952]
    );
  },
  computed: {
    rewardsForPeriod() {
      const tableRewards = this.$store.getters.getTableRewards;
      const tableRewardsFormated = tableRewards.map((reward) => {
        return {
          rewardsTier1: this.normalizeBNValues(reward.rewardsTier1),
          rewardsTier2: this.normalizeBNValues(reward.rewardsTier2),
        };
      });
      return tableRewardsFormated;
    },
    rewardsForPeriodTotal() {
      const totalTableRewards = this.$store.getters.getTotalTableRewards;
      const totalTableRewardsFormated = totalTableRewards.map((reward) => {
        return this.normalizeBNValues(reward);
      });
      return totalTableRewardsFormated;
    },
    totalEarnedRewards() {
      const currentRewards = this.$store.getters.getUserCurrentRewards.sub(
        this.$store.getters.getUserData[1]
      );
      return this.normalizeBNValues(currentRewards);
    },
  },
  methods: {
    normalizeBNValues(value) {
      return this.$ethers.utils.formatEther(value);
    },
    formatBNValues(value) {
      return new Intl.NumberFormat("en-EN").format(
        parseFloat(value).toFixed(2)
      );
    },
  },
};
</script>

<style scoped lang="scss">
.expected-interest-block {
  width: 100%;
  padding: 32px 24px 24px 24px;

  display: flex;
  flex-direction: column;

  .total-earned-rewards {
    display: flex;
    justify-content: space-between;
  }

  h1 {
    font-weight: 400;
    font-size: 20px;
    text-align: left;
  }
  .expected-interest-title {
    color: white;
    text-align: left;
    font-size: 20px;
    line-height: 28px;
    gap: 6px;
    margin-bottom: 16px;
  }
  .fist-info-icon {
    width: 13px;
  }
  .total-title {
    display: flex;
    align-items: center;
    color: #8a8a8a;
  }
  .total-title img {
    margin-left: 5px;
  }

  .total-earned-rewards {
    font-size: 14px;
    line-height: 20px;
  }

  p {
    text-align: right;
    align-items: center;

    color: #8a8a8a;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    margin-bottom: 8px;
  }

  .total-text {
    padding-right: 56px;
  }
  .container-interest {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid #363637;
    margin-bottom: 12px;
  }
  .column-interest {
    display: flex;
    flex-direction: column;

    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #8a8a8a;

    text-align: left;
    margin-bottom: 8px;
  }
  .column-interest:last-child {
    //padding-top: 25px;
    margin-bottom: 12px;
  }
  .column-interest:first-child {
    margin-top: 28px;
  }

  .column-tier {
    display: flex;
    flex-direction: column;

    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    text-align: right;
    margin-bottom: 8px;
  }

  .value-text {
    margin-left: 8px;
    color: #8a8a8a;
  }

  .info-icon {
    width: 13px;
  }
}

@media screen and(min-width: 768px) and(max-width: 1000px) {
  .expected-interest-block {
    width: 424px;
    height: 280px;
    padding: 32px 16px 16px 16px;

    .info-icon {
      width: 13px;
      position: relative;
      left: -2.4%;
      right: 8.34%;
    }
    .fist-info-icon {
      width: 13px;
    }
  }
}

@media screen and(max-width: 767px) {
  .expected-interest-block {
    height: auto;
    margin-left: auto;
    margin-right: auto;
    margin-top: 24px;

    padding: 0;
    .fist-info-icon {
      width: 20px;
    }
    .total-text {
      padding-right: 0;
      text-align: right;
    }
    .value-text {
      margin-left: 8px;
      display: none;
    }
    .expected-interest-title {
      font-size: 20px;
      margin-bottom: 12px;
      gap: 6px;
    }

    .column-interest:last-child {
      padding-top: 10px;
      width: 50px;
    }
    img {
      width: 20px;
    }
    .info-icon {
      width: 20px;
      top: 90.05% !important;
      left: 95px;
    }
  }
}
</style>
