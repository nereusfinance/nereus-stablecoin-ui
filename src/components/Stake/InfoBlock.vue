<template>
<div class="info-block">
  <div class="columns">
    <div class="column">
        Tier 1 amount
      <h2>
        <span style="color: white">15.00K</span> NXUSD
      </h2>
      <br>
      <p class="apy">
        20%<span>APY</span>
      </p>
    </div>

    <div class="column">
        Tier 2 amount
      <h2>
        <span style="color: white">15.00K</span> NXUSD
      </h2>
      <br>
      <p class="apy">
        4%<span>APY</span>
      </p>
    </div>
  </div>
  <div class="column">
    Yearly earn

    <h1>
      20%<span>NXUSD</span>
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
    line-height: 16px;
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
    line-height: 96px;
    color: #55BCC0;
    gap: 2px;

    span {
      font-size: 24px;
      color: #55BCC0;
    }
  }
}
</style>