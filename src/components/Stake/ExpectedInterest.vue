<template>
<div class="expected-interest-block">
  <h1>
    Expected interest
    <img
      src="@/assets/images/i-icon.svg"
      alt=""
      class="fist-info-icon"
      v-tooltip="'Some text'"
    />
  </h1>
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
      <p style="text-align: left">Total</p>
      <div class="column-tier" v-for="digit in amount" :key="digit">
        <span style="color: white">{{digit}} <span>NXUSD</span></span>
      </div>
    </div>
  </div>
  <img
    src="@/assets/images/i-icon.svg"
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

    margin-bottom: 16px;
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
    position: absolute;
    top: 715px;
  }
  .info-icon {
    width: 13px;
    position: relative;
    left: 16.7%;
    right: 8.34%;
    top: -9.5%;
  }
}
</style>