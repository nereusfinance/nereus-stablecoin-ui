<template>
  <div class="action-group">
    <p class="connect-wallet-text">
      {{ text }}
    </p>
    <button :disabled="disabledStatus" class="connect-btn" @click="onClick">
      {{ name }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },
    name: {
      type: String,
    },
    onClick: {
      type: Function,
    },
    disabledStatus: {
      type: Boolean,
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../mixins/screen-size';

.action-group {
  padding: 350px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.connect-wallet-text {
  font-family: "Work Sans", sans-serif;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: #ffffff;
  @include respond-to(sm) {
    font-size: 20px;
  }
}

.connect-btn {
  font-size: 14px;
  margin-top: 40px;
  align-items: center;
  padding: 8px 31px;
  width: 120px;
  background: #e7fc6e;
  border-radius: 21px;
  cursor: pointer;
  border: none;
  @include respond-to(sm) {
    position: absolute;
    bottom: 32px;
    width: calc(100% - 32px);
    margin-left: 16px;
    margin-right: 16px;
    height: 48px;
    font-size: 18px;
  }
}
</style>
