<template>
<div class="transaction-status-block">
<div class="status-text" v-if="transactionPending !== 'finished'">
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
  <hr v-if="statusText.length > 2">
  <div class="icon-text" v-if="statusText.length > 2">
    <img
      src="@/assets/images/icon-three.svg"
      alt=""
      class="status-icon"
    />
    <h1>{{ statusText[2] }}</h1>
  </div>
</div>
  <div class="status-text" v-if="transactionPending === 'finished'">
    <div class="icon-text">
      <img
        src="@/assets/images/icon-done.svg"
        alt=""
        class="status-icon"
      />
      <h1>{{ statusText[0] }}</h1>
    </div>
    <hr>
    <div class="icon-text">
      <img
        src="@/assets/images/icon-done.svg"
        alt=""
        class="status-icon"
      />
      <h1>{{ statusText[1] }}</h1>
    </div>
  </div>

  <hr>
  <div>
  <div class="action-info" v-if="transactionPending === 'wait for action'" >
    <h2>
      1/{{statusText.length}} {{statusText[0]}}
      <br>
      <h3 v-if="statusText[0] === 'Deposit'">Please submit not to deposit</h3>
      <h3 v-if="statusText[0] === 'Approve'">Please approve before withdrawal</h3>
    </h2>
    <button @click="action(statusText[0])" >{{statusText[0]}}</button>
  </div>

  <div class="pending" v-else-if="transactionPending !== 'wait for action'">
    <p v-if="transactionPending === 'pending'">Transaction(s) Pending</p>
    <div class="finished" v-if="transactionPending === 'finished'">
      <h1>
        {{statusText.length}}/{{statusText.length}} Success!
      </h1>
      <router-link :to="{ name: 'Dashboard' }" class="dashboard-btn">Dashboard</router-link>
    </div>
    <hr v-if="transactionPending === 'finished'" style="margin-top: 9px">
    <hr v-if="transactionPending === 'pending'">
    <div class="bottom-text">
      <h1>{{ statusText[0] }}</h1>
      <h1 v-if="transactionPending === 'pending'">
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
      <h1 v-if="transactionPending === 'finished'">
        Completed
        <img
          src="@/assets/images/icon-completed.svg"
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


</div>
</template>

<script>
export default {
  name: "TransactionStatus",
  data() {
    return {

    }
  },
  props: {
    statusText: {
      type: Array,
    },
    transactionPending: {
      type: String,
    },
    action: {
      type: Function,
    }
  },
  methods: {

  }
};
</script>

<style scoped lang="scss">
.transaction-status-block {
  width: 388px;
  height: auto;
  background: #262626;

  padding: 12px 16px;
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
    margin-bottom: 11px;

    width: auto;
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
    margin-left: 16px;

    h2, h3 {
      font-weight: 400;
      font-size: 12px;
      color: #FFFFFF;
      text-align: left;

      h3 {
        margin-top: 4px;
        font-size: 14px;
      }
    }
    button {
      gap: 10px;

      width: auto;
      height: 32px;
      padding: 6px 16px;

      background: #E7FC6E;
      border-radius: 16px;
      margin-right: 6px;
    }
  }
  .pending {
    display: flex;
    flex-direction: column;

    p {
      margin-top: 16px;
      font-weight: 400;
      font-size: 14px;
      color: #FDD33F;
      padding-left: 12px;
      text-align: left;
    }

    h1 {
      text-align: left;
    }
    hr {
      margin-top: 11px;
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
        margin-right: 12px;
      }
      .explorer-icon {
        margin-left: 4px;
      }
    }
  }
  .finished {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 9px 16px 0;

    .dashboard-btn {
      align-items: center;
      padding: 6px 16px;

      width: auto;
      background: #E7FC6E;
      border-radius: 16px;
      text-decoration: none;
      color: black;
      font-size: 16px;
      font-style: normal;
    }
  }
}
</style>