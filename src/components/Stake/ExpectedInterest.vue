<template>
<div class="expected-interest-block">
  <p class="expected-interest-title">
    Expected interest
  </p>
  <img
    src="@/assets/images/icon-info.svg"
    alt=""
    class="fist-info-icon"
    v-tooltip="'Some text'"
  />
  <div class="container-interest">
    <div>
      <div class="column-interest" v-for="time in period" :key="time">
        {{time}}
      </div>
    </div>
    <div>
      <p>Tier 1</p>
      <div class="column-tier" v-for="digit in amount" :key="digit">
        {{digit}}
      </div>
    </div>
    <div>
      <p>Tier 2</p>
      <div class="column-tier" v-for="digit in amount" :key="digit">
        {{digit}}
      </div>
    </div>
    <div style="flex-direction: row">
      <p class="total-text">Total</p>
      <div class="column-tier" v-for="digit in amount" :key="digit">
        <span style="color: white">{{digit}} <span class="value-text">NXUSD</span></span>
      </div>
    </div>
  </div>
  <img
    src="@/assets/images/icon-info.svg"
    alt=""
    class="info-icon"
    v-tooltip="'Some text'"
  />
  <hr/>
</div>
</template>

<script>
export default {
  name: "ExpectedInterest",
  data() {
    return {
      period: ["Daily", "Weekly", "Monthly", "Yearly", "Total earned"],
      amount: ["12", "22", "32", "42", "20"],
    };
  },
};
</script>

<style scoped lang="scss">
.expected-interest-block {
  width: 592px;
  height: 315px;
  padding: 32px 24px 24px 24px;

  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 400;
    font-size: 20px;
    text-align: left;
  }
  .expected-interest-title {
    font-size: 20px;
    gap: 9.33px;
    margin-bottom: 8px;
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
    text-align: left;
    padding-right: 50px;
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
    color: #8A8A8A;

    text-align: left;
    padding-bottom: 8px;
  }
  .column-interest:last-child {
    padding-top: 25px;
  }
  .column-interest:first-child {
    margin-top: 28px;
  }

  .column-tier {
    display: flex;
    flex-direction: column;

    font-weight: 400;
    font-size: 14px;
    color: #FFFFFF;

    text-align: right;
    padding-bottom: 8px;

    span {
      color: #8A8A8A;
    }
  }
  .column-tier:last-child {
    padding-top: 25px;
  }
  hr {
    width: 544px;
    border-width: 0;
    margin-bottom: 12px;
    background: #363637;
    height: 1px;
    position: relative;
    top: -20.5%;
  }
  .info-icon {
    width: 13px;
    position: relative;
    left: 16.7%;
    right: 8.34%;
    top: -9.5%;
  }
}

@media screen and(max-width: 780px) {
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
      top: 91.9% !important;
      left: 95px;
    }
    hr {
      position: absolute;
      top: 90.2% !important;
      align-content: center;
      width: 328px;
    }
  }
}
</style>