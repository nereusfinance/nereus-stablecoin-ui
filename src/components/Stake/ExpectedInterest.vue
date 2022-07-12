<template>
  <div class="expected-interest-block">
    <div class="expected-interest-title">
      <div class="expected-interest-title">
        <div>Expected interest</div>
        <img
          v-tooltip="
            'The estimated daily/weekly/monthly/yearly value of the NXUSD interest you earn based on your current total NXUSD deposit and the amount of WXT locked'
          "
          alt=""
          class="fist-info-icon"
          src="@/assets/images/icon-info.svg"
        />
      </div>
    </div>
    <div class="container-interest">
      <div>
        <div v-for="time in period" :key="time" class="column-interest">
          {{ time }}
        </div>
      </div>
      <div>
        <p>Tier 1</p>
        <div
          v-for="(reward, i) in rewardsForPeriod"
          :key="i"
          class="column-tier"
        >
          {{ formatBNValues(reward.rewardsTier1) }}
        </div>
      </div>
      <div>
        <p>Tier 2</p>
        <div
          v-for="(reward, i) in rewardsForPeriod"
          :key="i"
          class="column-tier"
        >
          {{ formatBNValues(reward.rewardsTier2) }}
        </div>
      </div>
      <div style="flex-direction: row">
        <p class="total-text">Total</p>
        <div
          v-for="(reward, i) in rewardsForPeriod"
          :key="i"
          class="column-tier total"
        >
          <span>
            {{ formatBNValues(reward.rewardsTotal) }}
            <span class="value-text"> NXUSD </span>
          </span>
        </div>
      </div>
    </div>
    <div class="total-earned-rewards">
      <div class="total-title">
        <div style="text-align: left">Total earned</div>
        <img
          v-tooltip="
            'The total value of the NXUSD interest you have earned with your current NXUSD deposit'
          "
          alt=""
          class="info-icon"
          src="@/assets/images/icon-info.svg"
        />
      </div>
      <div class="tiers-rewards">
        <div class="tier1-amount">
          <span v-tooltip="earnedRewards.rewardsTier1">{{
            formatBNValues(earnedRewards.rewardsTier1)
          }}</span>
        </div>
        <div class="tier2-amount">
          <span v-tooltip="earnedRewards.rewardsTier2">{{
            formatBNValues(earnedRewards.rewardsTier2)
          }}</span>
        </div>
        <div class="total-earned-amount">
          <span v-tooltip="earnedRewards.total">{{
            formatBNValues(earnedRewards.total)
          }}</span>
          <span class="value-text"> NXUSD </span>
        </div>
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
  computed: {
    rewardsForPeriod() {
      const tableRewards = this.$store.getters.getTableRewards;
      const tableRewardsFormated = tableRewards.map((reward) => {
        return {
          rewardsTier1: this.normalizeBNValues(reward.rewardsTier1),
          rewardsTier2: this.normalizeBNValues(reward.rewardsTier2),
          rewardsTotal: this.normalizeBNValues(reward.rewardsTotal),
        };
      });
      return tableRewardsFormated;
    },
    earnedRewards() {
      const earnedRewards = {};
      earnedRewards.rewardsTier1 = this.normalizeBNValues(
        this.$store.getters.getUserCurrentRewards.historyRewards.rewardsTier1.add(
          this.$store.getters.getHistoryUserRewards.rewardsTier1
        )
      );
      earnedRewards.rewardsTier2 = this.normalizeBNValues(
        this.$store.getters.getUserCurrentRewards.historyRewards.rewardsTier2.add(
          this.$store.getters.getHistoryUserRewards.rewardsTier2
        )
      );
      earnedRewards.total = this.normalizeBNValues(
        this.$store.getters.getUserCurrentRewards.historyRewards.rewardsTier1
          .add(
            this.$store.getters.getUserCurrentRewards.historyRewards
              .rewardsTier2
          )
          .add(this.$store.getters.getHistoryUserRewards.rewardsTier1)
          .add(this.$store.getters.getHistoryUserRewards.rewardsTier2)
      );
      console.log("currentRewards", earnedRewards);
      return earnedRewards;
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

<style lang="scss" scoped>
@import "./src/mixins/screen-size";

.expected-interest-block {
  width: 100%;
  padding: 32px 24px 24px 24px;

  display: flex;
  flex-direction: column;

  .total-earned-rewards {
    display: flex;
    flex-direction: row;
    font-size: 14px;
    line-height: 20px;
    .tiers-rewards {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 439px;
      text-align: right;
      margin-right: 0;
      margin-left: auto;
    }
    .tier1-amount {
      width: 92px;
      text-align: right;
      margin: 0;
    }
    .tier2-amount {
      width: 118px;
      text-align: right;
    }
    .total-earned-amount {
      width: 167px;
      text-align: right;
    }
  }

  h1 {
    font-weight: 400;
    font-size: 20px;
    text-align: left;
  }

  .expected-interest-title {
    display: flex;
    flex-direction: row;
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
    width: 110px;
    display: flex;
    align-items: center;
    color: #8a8a8a;
  }

  .total-title img {
    margin-left: 5px;
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
    padding-right: 62px;
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
    //width: 110px;

    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #8a8a8a;

    text-align: left;
    margin-bottom: 8px;
  }

  .column-interest:last-child {
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
    width: 100px;
    @include respond-to(md) {
      width: 80px;
    }
    @include respond-to(sm) {
      width: 80px;
    }
  }

  .column-tier.total {
    width: 150px;
    @include respond-to(sm) {
      width: 100px;
    }
    @include respond-to(md) {
      width: 140px;
    }
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
    width: 100%;
    height: 280px;
    padding: 32px 16px 16px 16px;
    .info-icon {
      width: 13px;
    }
    .total-title {
      width: 116px;
    }
    .total-earned-rewards {
      .tiers-rewards {
        width: 83%;
      }
      .tier1-amount {
        text-align: right;
        width: 17%;
      }

      .tier2-amount {
        text-align: right;
        width: 17%;
        margin: 0 0 0 auto;
      }

      .total-earned-amount {
        width: 120px;
        text-align: right;
        margin-right: 0;
        margin-left: auto;
      }
    }
    .fist-info-icon {
      margin-left: 2px;
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
    .total-title {
      width: 56px;
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
    .column-tier {
      text-align: right;
      width: 100%;
    }

    .column-tier.total {
      text-align: right;
      width: 100%;
    }
    .total-earned-rewards {
      .tiers-rewards {
        width: 75%;
      }

      .tier1-amount,
      .tier2-amount,
      .total-earned-amount {
        width: 68px;
        text-align: right;
      }
    }

    .total-earned-amount {
      width: 100%;
      text-align: right;
    }
    img {
      width: 20px;
    }

    .info-icon {
      margin-top: 15px;
      width: 20px;
    }
  }
}
</style>
