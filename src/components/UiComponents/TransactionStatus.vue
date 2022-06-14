<template>
  <div class="transaction-status-block">
    <StatusBlock
      :transactionPending="transactionPending"
      :statusType="statusType"
      :actionAmount="actionAmount"
    />
    <hr>
    <!--  Central block-->
    <div class="central-block" v-if="transactionPending === 'wait for action' && statusType.length === 2">
      <h3 v-if="statusType[0] === 'Deposit'">Please submit not to deposit</h3>
      <h3 v-if="statusType[0] === 'Withdraw'">Please submit to withdraw</h3>
      <button @click="actionHandler">{{statusType[0]}}</button>
    </div>

    <!--  Central block for approve-->
    <div class="central-block-default" v-if="transactionPending === 'wait for action' && statusType.length > 2">
      <h2>
        1/{{statusType.length}} {{statusType[0]}}
        <br>
        <h3>Please approve before deposit</h3>
      </h2>
      <button @click="actionHandler">{{statusType[0]}}</button>
    </div>

<!--    Both-->
    <div class="central-block" v-if="transactionPending === '1'">
      <p>Transaction(s) Pending</p>
    </div>

<!--    Deposit approved-->
    <div class="central-block-default" style="padding-top: 16px; padding-bottom: 9px" v-if="transactionPending === '2' && statusType[0] === 'Approve'">
        <h2>
          2/{{statusType.length}} {{statusType[1]}}
          <br>
          <h3>Please submit to deposit</h3>
        </h2>
        <button @click="actionHandler" >{{statusType[1]}}</button>
    </div>

    <div class="central-block" v-if="transactionPending === '3'">
      <p>Please submit to deposit</p>
    </div>

<!--    Finished-->
    <div class="finished" v-if="transactionPending === 'finished'">
      <h1>
        {{statusType.length}}/{{statusType.length}} Success!
      </h1>
      <router-link :to="{ name: 'Dashboard' }" class="dashboard-btn">Dashboard</router-link>
    </div>

    <hr v-if="transactionPending !== 'wait for action'">
<!--    Bottom block-->
    <div class="bottom-block">
      <div class="bottom-text" v-if="transactionPending !== 'wait for action'">
        <h1>{{ statusType[0] }}</h1>
        <h1 v-if="transactionPending === '1'">
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
        <h1 v-if="transactionPending === '2' || transactionPending === '3'">
          Confirmed
          <img
            src="@/assets/images/icon-completed.svg"
            alt=""
            class="loading-icon"
          />
          <a target="_blank" class="showTX" :href="getApproveLink">
            Explorer
            <img
              src="@/assets/images/icon-explorer.svg"
              alt=""
              class="explorer-icon"
            />
          </a>
        </h1>

        <h1 v-if="transactionPending === 'finished'">
          Completed
          <img
            src="@/assets/images/icon-completed.svg"
            alt=""
            class="done-icon"
          />
          <a target="_blank" class="showTX" :href="getTXLink">
            Explorer
            <img
              src="@/assets/images/icon-explorer.svg"
              alt=""
              class="explorer-icon"
            />
          </a>
        </h1>
      </div>
      <div class="bottom-text" v-if="transactionPending === '3' || (statusType.length > 2 && transactionPending === 'finished')">
        <h1>{{ statusType[1] }}</h1>
        <h1 v-if="transactionPending === '3'">
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
</template>

<script>
import StatusBlock from "@/components/UiComponents/StatusBlock";
export default {
  name: "Status",
  components: { StatusBlock },

  props: {
    statusType: {
      type: Array,
    },
    transactionPending: {
      type: String,
    },
    action: {
      type: Function,
    },
    actionAmount: {
      type: Array,
    },
    value: {
    },
    pool: {
    },
    tx: {
      type: String,
    },
    txApprove: {
      type: String,
    },
  },
  data() {
    return {
      linkTX: "https://snowtrace.io/tx/",
    }
  },
  computed: {
    getTXLink() {
      let link = this.linkTX + this.tx;
      return link;
    },
    getApproveLink() {
      let link = this.linkTX + this.txApprove;
      return link;
    },
  },
  methods: {
    actionHandler() {
      //approve handler
      //на бенто бокс в стор единоразово: по умолчанию фолс в сторе, при входе на страницу при креэйте проверять апрув
      //апрув на никсюсд перед каждой транзой
      console.log("Value ", this.value);
      if (this.statusType[0] === "Deposit") {
        if(this.transactionPending === "wait for action")
          this.action(1);
        this.$emit("stakeHandler");
      }

      if( this.statusType[0] === "Approve") {
        if(this.transactionPending === "wait for action" && this.transactionPending !== '3') {
          this.action(1);
          this.$emit("stakeHandler");
        }
        if(this.transactionPending === '2') {
          this.$emit("stakeHandler");
          this.action(3);
        }
      }
      if (this.statusType[0] === "Withdraw") {
        this.action(1);

        this.$emit("addUnstake");
      }
    },
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
    display: flex;
    flex-direction: column;
    h3 {
      font-size: 14px;
      margin-bottom: 16px;
    }
    button {
      gap: 10px;

      padding: 8px 24px;
      margin-bottom: 4px;
      width: 356px;
      height: 40px;

      background: #E7FC6E;
      border-radius: 20px;
    }
    p {
      margin-bottom: 16px;
      font-weight: 400;
      font-size: 14px;
      color: #FDD33F;
      text-align: left;
    }
  }

  .finished {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 388px;
    padding: 10px 16px;

    h1 {
      font-weight: 400;
      font-size: 12px;
    }

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

//  Bottom Block
  .bottom-block {
    display: flex;
    flex-direction: column;

    .bottom-text {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 388px;
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
      }
      .done-icon, .loading-icon {
        margin-left: 4px;
        margin-right: 12px;
      }

      .explorer-icon {
        margin-left: 4px;
        cursor: pointer;
      }
      .showTX {
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #FFFFFF;
        text-decoration: none;
      }
    }
  }
}

@media screen and(min-width: 768px) and(max-width: 1000px) {
  .transaction-status-block {
    .central-block {
      button {
        width: 360px;
        height: 48px;
        border-radius: 24px;

      }
    }
  }
}
@media screen and(max-width: 767px) {
  .transaction-status-block {
    width: 328px;

    hr {
      width: 326.18px;
    }

    .central-block-default {
      width: 328px;
      padding-top: 8px;

      h3 {
        line-height: 16px;
        width: 180px;
      }

      button {
        margin-top: 20px;
        padding: 6px 12px;
        width: 100px;
        border-radius: 21px;
        height: 28px;
        border: 0;
      }
    }
    .central-block {
      width: 328px;
      button {
        width: 296px;
      }
    }
    .bottom-block {
      .bottom-text {
        width: 328px;
      }
    }
    .finished {
      width: 328px;
    }
  }
}
</style>