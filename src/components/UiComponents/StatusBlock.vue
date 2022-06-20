<template>
  <div>
    <div class="status-block" v-if="transactionPending !== 'finished'">
      <div class="icon-text">
        <img
          src="@/assets/images/icon-one.svg"
          alt=""
          class="status-icon"
          v-if="transactionPending === 'wait for action'"
        />
        <img
          src="@/assets/images/icon-one.svg"
          alt=""
          class="status-icon"
          v-if="transactionPending === '1'"
        />
        <img
          src="@/assets/images/icon-done.svg"
          alt=""
          class="status-icon"
          v-if="
            (transactionPending === '2' || transactionPending === '3') &&
            statusType.length > 2
          "
        />
        <h1 style="color: white">{{ statusType[0] }}</h1>
      </div>
      <hr
        :class="{
          active: transactionPending === '2' || transactionPending === '3',
        }"
      />
      <div class="icon-text">
        <img
          src="@/assets/images/icon-two.svg"
          class="status-icon"
          alt=""
          v-if="transactionPending !== '3'"
          :class="{ active: transactionPending === '2' }"
        />
        <img
          src="@/assets/images/icon-done.svg"
          class="status-icon"
          alt=""
          v-if="transactionPending === '3'"
        />
        <h1
          :class="{
            active: transactionPending === '2' || transactionPending === '3',
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
          src="@/assets/images/icon-three.svg"
          class="status-icon"
          alt=""
          :class="{ active: transactionPending === '3' }"
        />
        <h1 :class="{ active: transactionPending === '3' }">
          {{ statusType[2] }}
        </h1>
      </div>
    </div>

    <!--    Finished-->
    <div class="status-block-finished" v-if="transactionPending === 'finished'">
      <div class="icon-text">
        <img src="@/assets/images/icon-done.svg" alt="" class="status-icon" />
        <h1>{{ statusType[0] }}</h1>
      </div>
      <hr />
      <div class="icon-text">
        <img src="@/assets/images/icon-done.svg" alt="" class="status-icon" />
        <h1>{{ statusType[1] }}</h1>
      </div>
      <hr v-if="statusType.length > 2" />
      <div class="icon-text" v-if="statusType.length > 2">
        <img src="@/assets/images/icon-done.svg" alt="" class="status-icon" />
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

<style scoped lang="scss">
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
