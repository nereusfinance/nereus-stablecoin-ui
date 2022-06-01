<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: "StatusBlock",
  props: {
    statusText: {
      type: Array,
    },
    transactionPending: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
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

@media screen and(max-width: 780px) {
  .status-block, .status-block-finished {
    gap: 8px;
    hr {
      width: 4px;
    }
  }
}
</style>