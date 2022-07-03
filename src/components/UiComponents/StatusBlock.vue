<template>
  <div>
    <div v-if="transactionPending !== 'finished'" class="status-block">
      <div class="icon-text">
        <img
            v-if="transactionPending === 'wait for action'"
            alt=""
            class="status-icon"
            src="@/assets/images/icon-one.svg"
        />
        <img
            v-if="transactionPending === '1'"
            alt=""
            class="status-icon"
            src="@/assets/images/icon-one.svg"
        />
        <img
            v-if="
            (transactionPending === '2' || transactionPending === '3') &&
            statusType.length > 2
          "
            alt=""
            class="status-icon"
            src="@/assets/images/icon-done.svg"
        />
        <img
            v-if="transactionPending === 'error'"
            alt=""
            class="status-icon"
            src="@/assets/images/icon-one-red.svg"
        />
        <h1
            :class="{
            error: transactionPending === 'error',
            active: transactionPending === '1' || transactionPending === '2'|| transactionPending === 'wait for action'||statusType.length > 2,
          }"
        >
          {{ statusType[0] }}
        </h1>
      </div>
      <hr
          :class="{
          active: transactionPending === '2' || transactionPending === '3',
          error: transactionPending === 'error',
        }"
      />
      <div class="icon-text">
        <img
            v-if="transactionPending !== '3'"
            :class="{ active: transactionPending === '2' }"
            alt=""
            class="status-icon"
            src="@/assets/images/icon-two.svg"
        />
        <img
            v-if="transactionPending === '3'"
            alt=""
            class="status-icon"
            src="@/assets/images/icon-done.svg"
        />
        <img
            v-if="transactionPending === 'error' && statusType.length > 2"
            alt=""
            class="status-icon"
            src="@/assets/images/icon-two-red.svg"
        />
        <h1
            :class="{
            active: transactionPending === '2' || transactionPending === '3',
            error: transactionPending === 'error' && statusType.length > 2,
          }"
        >
          {{ statusType[1] }}
        </h1>
      </div>
      <hr
          v-if="statusType.length > 2"
          :class="{ active: transactionPending === '3' }"
      />
      <div v-if="statusType.length > 2" class="icon-text">
        <img
            :class="{ active: transactionPending === '3' }"
            alt=""
            class="status-icon"
            src="@/assets/images/icon-three.svg"
        />
        <h1 :class="{ active: transactionPending === '3' }">
          {{ statusType[2] }}
        </h1>
      </div>
    </div>

    <!--    Finished-->
    <div v-if="transactionPending === 'finished'" class="status-block-finished">
      <div class="icon-text">
        <img alt="" class="status-icon" src="@/assets/images/icon-done.svg"/>
        <h1>{{ statusType[0] }}</h1>
      </div>
      <hr/>
      <div class="icon-text">
        <img alt="" class="status-icon" src="@/assets/images/icon-done.svg"/>
        <h1>{{ statusType[1] }}</h1>
      </div>
      <hr v-if="statusType.length > 2"/>
      <div v-if="statusType.length > 2" class="icon-text">
        <img alt="" class="status-icon" src="@/assets/images/icon-done.svg"/>
        <h1>{{ statusType[2] }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatusBlock",
  props: {
    statusType: {
      type: Array,
    },
    transactionPending: {
      type: String,
    },
    actionAmount: {},
  },
};
</script>

<style lang="scss" scoped>
//Status block
.status-block,
.status-block-finished {
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
    color: #8a8a8a;

    &.active {
      color: white;
    }

    &.error {
      color: #fe3366;
    }
  }
}

.status-block-finished {
  h1 {
    color: white;
  }

  hr {
    background: white;
  }
}

@media screen and(min-width: 768px) and(max-width: 1000px) {
  .status-block,
  .status-block-finished {
    gap: 8px;

    hr {
      width: 4px;
    }
  }
}

@media screen and(max-width: 767px) {
  .status-block,
  .status-block-finished {
    gap: 8px;

    hr {
      width: 4px;
    }
  }
}
</style>
