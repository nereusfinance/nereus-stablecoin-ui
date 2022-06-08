<template>
  <div class="transaction-status-block">
    <StatusBlock
      :transactionPending="transactionPending"
      :statusText="statusText"
    />
    <hr>
    <!--  Central block-->
<!--    Withdraw-->
    <div class="central-block-default" v-if="transactionPending === 'wait for action' && statusText[0] === 'Approve'">
      <h2>
        1/{{statusText.length}} {{statusText[0]}}
        <br>
        <h3>Please approve before withdrawal</h3>
      </h2>
      <button @click="action(statusText[0])" >{{statusText[0]}}</button>
    </div>
    <div
      class="central-block-default"
      style="padding-top: 16px; padding-bottom: 9px"
      v-if="transactionPending === 'withdraw' && statusText[0] === 'Approve'"
    >
      <h2>
        2/{{statusText.length}} {{statusText[1]}}
        <br>
        <h3>Please submit to withdraw</h3>
      </h2>
      <button @click="action('make withdraw')" >{{statusText[1]}}</button>
    </div>

    <div class="central-block" v-if="transactionPending === 'pending withdraw'">
      <p>Please submit to withdraw</p>
    </div>

<!--    Deposit-->
    <div class="central-block" v-if="transactionPending === 'wait for action' && statusText[0] === 'Deposit'">
      <h3 v-if="statusText[0] === 'Deposit'">Please submit not to deposit</h3>
      <button @click="actionHandler" >{{statusText[0]}}</button>
    </div>

<!--    Both-->
    <div class="central-block" v-if="transactionPending === 'pending' || transactionPending === 'pending approve'">
      <p>Transaction(s) Pending</p>
    </div>

    <div class="finished" v-if="transactionPending === 'finished'">
      <h1>
        {{statusText.length}}/{{statusText.length}} Success!
      </h1>
      <router-link :to="{ name: 'Dashboard' }" class="dashboard-btn">Dashboard</router-link>
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

        <h1 v-if="transactionPending === 'finished' && statusText[0] === 'Deposit'">
          Completed
          <img
            src="@/assets/images/icon-completed.svg"
            alt=""
            class="done-icon"
          />
          Explorer
          <img
            src="@/assets/images/icon-explorer.svg"
            alt=""
            class="explorer-icon"
          />
        </h1>

<!--        withdraw & pending withdraw-->
        <h1 v-if="transactionPending === 'withdraw' || transactionPending === 'pending withdraw'
        || (transactionPending === 'finished' && statusText[0] === 'Approve')">
          Confirmed
          <img
            src="@/assets/images/icon-completed.svg"
            alt=""
            class="done-icon"
          />
          Explorer
          <img
            src="@/assets/images/icon-explorer.svg"
            alt=""
            class="explorer-icon"
          />
        </h1>
      </div>

      <div class="bottom-text"
           style="margin-top: 8px"
           v-if="transactionPending === 'pending withdraw'
           || (transactionPending === 'finished' && statusText[0] === 'Approve')"
      >
        <h1>{{ statusText[1] }}</h1>
        <h1 v-if="transactionPending === 'pending withdraw'">
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
    statusText: {
      type: Array,
    },
    transactionPending: {
      type: String,
    },
    action: {
      type: Function,
    },
    value: {
    },
    pool: {
    }
  },
  methods: {
    actionHandler() {
      console.log("Value ", this.value);
      if (this.statusText[0] === "Deposit") {
        this.action("Deposit", 1);

        const parsedAmount = this.$ethers.utils.parseUnits(
          this.value.toString(),
          this.pool.pairToken.decimals
        );

        const payload = {
          amount: parsedAmount,
          updatePrice: this.updatePrice,
        };

        this.$emit("addStake", payload);
        //this.clearData();
        return false;
      }
      if (this.statusText[0] === "Approve") {
        //this.action("Approve", 1);
        const parsedAmount = this.$ethers.utils.parseUnits(
          this.value.toString(),
          this.pool.token.decimals
        );

        const payload = {
          amount: parsedAmount,
          updatePrice: this.updatePrice,
        };

        this.$emit("addStake", payload);

        return false;
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
      }
      .done-icon, .loading-icon {
        margin-left: 4px;
        margin-right: 12px;
      }

      .explorer-icon {
        margin-left: 4px;
      }
    }
  }
}

@media screen and(max-width: 780px) {
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