<template>
  <div class="param-item">
    <div class="item-main">
      <div class="title">
        <img
            v-tooltip="itemProp.tooltip"
            alt=""
            class="info-icon"
            src="@/assets/images/i-icon.svg"
        />
        <p>{{ itemProp.title }}</p>
      </div>

      <p :data-cy="itemProp.cyData" class="percent-text">
        {{ itemProp.value }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    itemProp() {
      return this.item;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/mixins/screen-size";

.param-item {
  .item-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 16px;
    @include respond-to(sm) {
      padding: 0 16px;
      margin-bottom: 16px;
    }

    .title {
      display: flex;
      align-items: center;

      .info-icon {
        width: 13px;
        height: 13px;
        margin-right: 10px;
        @include respond-to(sm) {
          width: 24px;
          height: 24px;
        }
      }

      p {
        max-width: 210px;
        text-align: left;
        @include respond-to(sm) {
          font-size: 14px;
        }
      }
    }

    .percent-text {
      font-weight: 700;
      margin-left: auto;
    }

    .percent-text:i {
      font-weight: 400;
    }
  }

  .item-info {
    background: $clrBg1;
    border-radius: 8px;
    padding: 20px;
    text-align: left;
  }
}
</style>
