<template>
  <div class="expected-interest-block">
    <p class="expected-interest-title">
      Expected interest
      <img
        src="@/assets/images/icon-info.svg"
        alt=""
        class="fist-info-icon"
        v-tooltip="'Some text'"
      />
    </p>
    <div class="container-interest">
      <div>
        <div class="column-interest" v-for="time in period" :key="time">
          {{time}}
        </div>
      </div>
      <div>
        <p>Tier 1</p>
        <div class="column-tier" v-for="(digit, i) in rewardsForPeriod" :key="digit.rewardsTier1.toString() + i">
          {{new Intl.NumberFormat('en-EN', { minimumFractionDigits: 2 }).format(parseFloat((digit.rewardsTier1.toString() / 1e18).toFixed(2)))}}
        </div>
      </div>
      <div>
        <p>Tier 2</p>
        <div class="column-tier" v-for="(digit, i) in rewardsForPeriod" :key="digit.rewardsTier2.toString() + i">
          {{new Intl.NumberFormat('en-EN', { minimumFractionDigits: 2 }).format(parseFloat((digit.rewardsTier2.toString() / 1e18).toFixed(2)))}}
        </div>
      </div>
      <div style="flex-direction: row">
        <p class="total-text">Total</p>
        <div class="column-tier total" v-for="(digit, i) in rewardsForPeriod" :key="digit.rewardsTier2.toString() + i">
          <span style="color: white">
            {{new Intl.NumberFormat('en-EN', { minimumFractionDigits: 2 }).format(parseFloat(((digit.rewardsTier1.add(digit.rewardsTier2)).toString() / 1e18).toFixed(2)))}}
            <span class="value-text"> NXUSD</span></span>
        </div>
      </div>
    </div>
    <hr/>
    <div class="total-earned-rewards">
      <div class="total-title">
        <div>Total earned</div>
        <div>
          <img
            src="@/assets/images/icon-info.svg"
            alt=""
            class="info-icon"
            v-tooltip="'Some text'"
          />
        </div>

      </div>
      <div class="total-amount">{{ new Intl.NumberFormat('en-EN', { minimumFractionDigits: 2 }).format(parseFloat(((totalEarnedRewards / 1e18).toFixed(2)))) }} <span>NXUSD</span></div>
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
  props: {
    rewardsForPeriod: {
      type: Array,
    },
    totalEarnedRewards: {
      type: String,
    }
  },
  computed: {
    // formattingRewards() {
    //   const formattedRewards = this.rewardsForPeriod.map((reward) => {
    //
    //   });
    // },
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
.total_title {
  display: flex !important;
}
.expected-interest-block {
  //width: 592px;
  //height: 315px;
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
    text-align: left;
    font-size: 20px;
    line-height: 28px;
    gap: 9.33px;
    margin-bottom: 16px;
  }
  .fist-info-icon {
    width: 13.33px;
  }

  .total-earned-rewards {
    font-size: 14px;
    line-height: 20px;
    span, .total-title {
      color: #8A8A8A;
    }
  }

  p {
    text-align: right;
    align-items: center;

    color: #8A8A8A;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

    margin-bottom: 8px;
  }

  .total-text {
    //text-align: left;
    padding-right: 53px;
  }
  .container-interest {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .column-interest {
    display: flex;
    flex-direction: column;

    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #8A8A8A;

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
    color: #FFFFFF;

    text-align: right;
    margin-bottom: 8px;

    span {
      color: #8A8A8A;
    }
  }
  .column-tier:last-child {
    //padding-top: 25px;
  }
  hr {
    width: 100%;
    border-width: 0;
    margin-bottom: 12px;
    background: #363637;
    height: 1px;
    //position: relative;
    //top: -20.5%;
  }
  .info-icon {
    width: 13px;
    //position: relative;
    //left: 16.7%;
    //right: 8.34%;
    //top: -9.5%;
  }
}

@media screen and(min-width: 768px) and(max-width: 1000px) {
  .expected-interest-block {
    width: 424px;
    height: 280px;
    padding: 35px 16px 16px 16px;

    .info-icon {
      width: 13px;
      position: relative;
      left: 22.4%;
      right: 8.34%;
      top: -9.1%;
    }
  }
}

@media screen and(max-width: 767px) {
  .expected-interest-block {
    height: auto;
    width: 328px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 24px;

    padding: 0;

    .total-text {
      padding-right: 0;
      text-align: right;
    }
    .value-text {
      display: none;
    }
    .expected-interest-title {
      font-size: 20px;
      gap: 6px;
      margin-bottom: 12px;
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
      position: absolute;
      top: 90.05% !important;
      left: 95px;
    }
    hr {
      position: absolute;
      top: 88.2% !important;
      align-content: center;
      width: 328px;
    }
  }
}
</style>