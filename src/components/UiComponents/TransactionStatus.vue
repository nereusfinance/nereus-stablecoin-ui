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

  <div class="action-info" v-if="transactionPending === 'wait for action'" >
    <h2>
      1/2 {{statusText[0]}}<br>
      <h3>Please submit not to deposit</h3>
    </h2>
    <button @click="action(statusText[0])">{{statusText[0]}}</button>
  </div>
  <div class="pending" v-if="transactionPending === 'pending'">
    <p>Transaction(s) Pending</p>
    <hr>
    <div class="bottom-text">
      <h1>{{ statusText[0] }}</h1>
      <h1>
        Pending
        <img
          src="@/assets/images/icon-loading.svg"
          alt=""
          class="loading-icon"
        />
        Explorer
        <img
          src="@/assets/images/icon-explorer.svg"
          alt=""
          class="explorer-icon"
        />
      </h1>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "TransactionStatus",
  data() {
    return {
      transactionPending: "wait for action",
    }
  },
  props: {
    statusText: {
      type: Array,
    }
  },
  methods: {
    action(statusText) {
      if(statusText === "Deposit") {
        console.log(this.transactionPending);
        this.transactionPending = "pending";
        console.log(this.transactionPending);

      }
    }
  }
};
</script>

<style scoped lang="scss">
.transaction-status-block {
  width: 388px;
  height: 132px;
  background: #262626;

  padding: 12px 12px 16px 12px;
  border: 1px solid #606060;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-weight: 400;
    font-size: 12px;

    text-align: center;
    color: #FFFFFF;
  }

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
  .action-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 356px;
    margin-top: 38px;

    h2, h3 {
      font-weight: 400;
      font-size: 12px;
      color: #FFFFFF;
      text-align: left;

      h3 {
        margin-top: 2px;
        font-size: 14px;
      }
    }
    button {
      gap: 10px;

      width: 85px;
      height: 32px;

      background: #E7FC6E;
      border-radius: 16px;
    }
  }
  .pending {
    display: flex;
    flex-direction: column;
    margin-top: 16px;

    p {
      font-weight: 400;
      font-size: 14px;
      color: #FDD33F;
      margin-bottom: 4px;
      padding-left: 12px;
      text-align: left;
    }

    h1 {
      text-align: left;
    }
    hr {
      margin-bottom: 12px;
    }

    .bottom-text {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 20px;
      padding-right: 14px;
      padding-left: 12px;

      h1 {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      .loading-icon {
        margin-left: 4px;
        margin-right: 8px;
      }
      .explorer-icon {
        margin-left: 4px;
      }
    }
  }
}
</style>