<template>
<div class="transaction-status-block">
<div class="status-text">
  <div class="icon-text">
    <img
      src="@/assets/images/icon-one.svg"
      alt=""
      class="status-icon"
    />
    <h1>{{ statusText[0] }}</h1>
  </div>
  <hr>
  <div class="icon-text">
    <img
      src="@/assets/images/icon-two.svg"
      alt=""
      class="status-icon"
    />
    <h1>{{ statusText[1] }}</h1>
  </div>
</div>
  <hr>
</div>
</template>

<script>
export default {
  name: "TransactionStatus",
  props: {
    statusText: {
      type: Array,
    }
  },
};
</script>

<style scoped lang="scss">
.transaction-status-block {
  width: 388px;
  height: 132px;
  background: #262626;

  padding: 12px 16px 16px 16px;
  border: 1px solid #606060;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;

  .status-text {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-right: auto;
    margin-left: auto;

    width: 179px;
    height: 16px;

    .icon-text {
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 3px;
    }
    h1 {
      font-weight: 400;
      font-size: 12px;

      text-align: center;
      color: #FFFFFF;
    }

    hr {
      width: 24px;
      height: 1px;
      background: #606060;
      margin-top: 0;

      border-width: 0;
    }
  }

  hr {
    margin-top: 11px;
    height: 1px;
    width: 385px;
    background: #1C1C1C;

    border-width: 0;
  }
}
</style>