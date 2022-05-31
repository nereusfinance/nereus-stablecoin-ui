<template>
  <div class="transaction-status-block">
    <StatusBlock
      :transactionPending="transactionPending"
      :statusText="statusText"
    />
    <hr>
    <!--  Central block-->
    <div class="central-block-default" v-if="transactionPending === 'wait for action'">
      <h2>
        1/{{statusText.length}} {{statusText[0]}}
        <br>
        <h3 v-if="statusText[0] === 'Deposit'">Please submit not to deposit</h3>
        <h3 v-if="statusText[0] === 'Approve'">Please approve before withdrawal</h3>
      </h2>
      <button v-if="statusText[0]" @click="action(statusText[0])" >{{statusText[0]}}</button>
    </div>

    <div class="central-block" v-if="transactionPending === 'pending' || transactionPending === 'pending approve'">
      <p>Transaction(s) Pending</p>
    </div>

    <hr v-if="transactionPending !== 'wait for action'">
<!--    Bottom block-->
    <div class="bottom-block">
      <div class="bottom-text" v-if="transactionPending !== 'wait for action'">
        <h1>{{ statusText[0] }}</h1>
        <h1 v-if="transactionPending === 'pending' || transactionPending === 'pending approve'">
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
import StatusBlock from "@/components/UiComponents/StatusBlock";
export default {
  name: "Status",
  components: { StatusBlock },
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

  hr {
    height: 1px;
    width: 385px;
    background: #1C1C1C;
    border-width: 0;
  }

  //Central block
  .central-block, .central-block-default{
    padding: 38px 16px 0 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 388px;

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
      padding: 6px 16px;

      background: #E7FC6E;
      border-radius: 16px;
    }
  }

  .central-block {
    padding-top: 16px;

    p {
      margin-bottom: 16px;
      font-weight: 400;
      font-size: 14px;
      color: #FDD33F;
      text-align: left;
    }
  }

//  Bottom Block
  .bottom-block {
    .bottom-text {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 388px;
      height: 20px;
      margin-top: 12px;
      padding: 0 14px 0 16px;

      h1 {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        font-weight: 400;
        font-size: 12px;
        color: #FFFFFF;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% {  transform: rotate(359deg); }
      }
      .loading-icon {
        animation: spin 2s linear infinite;
        margin-left: 4px;
        margin-right: 12px;
      }

      .explorer-icon {
        margin-left: 4px;
      }
    }
  }
}
</style>