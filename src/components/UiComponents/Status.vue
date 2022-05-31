<template>
  <div class="transaction-status-block">
    <div class="status-block" v-if="transactionPending !== 'finished' && statusText[0] === 'Deposit'">
      <div class="icon-text">
        <img
          src="@/assets/images/icon-one.svg"
          alt=""
          class="status-icon"
        />
        <h1 style="color: white">{{ statusText[0] }}</h1>
      </div>
      <hr>
      <div class="icon-text">
        <img
          src="@/assets/images/icon-two.svg"
          class="status-icon"
          alt=""
        />
        <h1>{{ statusText[1] }}</h1>
      </div>
    </div>
    <div class="status-block" v-if="transactionPending !== 'finished' && statusText[0] === 'Approve'">
      <div class="icon-text">
        <img
          src="@/assets/images/icon-one.svg"
          alt=""
          class="status-icon"
          v-if="transactionPending !== 'withdraw'
        && transactionPending !== 'pending withdraw' "
        />
        <img
          src="@/assets/images/icon-done.svg"
          alt=""
          class="status-icon"
          v-if="transactionPending === 'withdraw'
          || transactionPending === 'pending withdraw'"
        />
        <h1 style="color: white">{{ statusText[0] }}</h1>
      </div>
      <hr
        :class="{active: transactionPending === 'withdraw' || transactionPending === 'pending withdraw'}"
      >

      <div class="icon-text">
        <img
          src="@/assets/images/icon-two.svg"
          class="status-icon"
          v-if="transactionPending !== 'pending withdraw'"
          :class="{active: transactionPending === 'withdraw'}"
          alt=""
        />
        <img
          src="@/assets/images/icon-done.svg"
          class="status-icon"
          v-if="transactionPending === 'pending withdraw'"
          :class="{active: transactionPending === 'withdraw'}"
          alt=""
        />
        <h1
          :class="{active: transactionPending === 'withdraw'
          || transactionPending === 'pending withdraw'}"
        >
          {{ statusText[1] }}
        </h1>
      </div>
      <hr
        :class="{active: transactionPending === 'pending withdraw'}"
      >
      <div class="icon-text">
        <img
          src="@/assets/images/icon-three.svg"
          alt=""
          class="status-icon"
          :class="{active: transactionPending === 'pending withdraw'}"
        />
        <h1 :class="{active: transactionPending === 'pending withdraw'}"
        >
          {{ statusText[2] }}
        </h1>
      </div>
    </div>

<!--    Finished-->
    <div class="status-block-finished" v-if="transactionPending === 'finished'">
      <div class="icon-text">
        <img
          src="@/assets/images/icon-done.svg"
          alt=""
          class="status-icon"
        />
        <h1> {{ statusText[0] }}</h1>
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
      <hr v-if="statusText.length > 2">
      <div class="icon-text" v-if="statusText.length > 2">
        <img
          src="@/assets/images/icon-done.svg"
          alt=""
          class="status-icon"
        />
        <h1>{{ statusText[2] }}</h1>
      </div>
    </div>

    <hr>
    <!--  Central block-->
     <div class="central-block" v-if="transactionPending === 'wait for action'">
       <h2>
         1/{{statusText.length}} {{statusText[0]}}
         <br>
         <h3 v-if="statusText[0] === 'Deposit'">Please submit not to deposit</h3>
         <h3 v-if="statusText[0] === 'Approve'">Please approve before withdrawal</h3>
       </h2>
       <button v-if="statusText[0]" @click="action(statusText[0])" >{{statusText[0]}}</button>
     </div>

  </div>
</template>

<script>
export default {
  name: "Status",
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

  //Status block
  .status-block, .status-block-finished {
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

    .status-icon {
      &.active {
        filter: brightness(100);
      }
    }
    hr {
      width: 24px;
      height: 1px;
      background: #606060;
      margin-top: 0;
      border-width: 0;

      &.active {
        background: white;
      }
    }
    h1 {
      font-weight: 400;
      font-size: 12px;

      text-align: center;
      color: #8A8A8A;

      &.active {
        color: white;
      }
    }
  }
  .status-block-finished {
    h1 {
      color: white
    }
    hr {
      background: white;
    }
  }

  hr {
    height: 1px;
    width: 385px;
    background: #1C1C1C;
    border-width: 0;
  }

  //Central block
  .central-block {
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
}
</style>