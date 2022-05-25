<template>
<div class="expected-interest-block">
  <h1>
    Expected interest
    <img
      src="@/assets/images/i-icon.svg"
      alt=""
      class="info-icon"
      v-tooltip="'Some text'"
    />
  </h1>
  <div class="container-interest">
    <div>
      <div class="column-interest" v-for="time in period" :key="time">
        {{time}}
      </div>
    </div>
  </div>

  <hr/>
  <div class="column-interest" style="flex-direction: row; align-items: center">
    Total earned
    <img
      src="@/assets/images/i-icon.svg"
      alt=""
      class="info-icon"
      style="width: 13px; margin-left: 5px"
      v-tooltip="'Some text'"
    />
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

    margin-bottom: 24px;
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
    padding-bottom: 12px;
  }

  hr {
    width: 544px;
    border-width: 0;
    margin-bottom: 12px;
    background: #363637;
    height: 1px;
  }
}
</style>