<template>
  <div class="slippage-block">
    <p class="slippage-title">Swap Tolerance</p>

    <div class="items-wrap">
      <div
        class="splipage-item"
        :class="{ active: slippage === item }"
        v-for="(item, idx) in slippageItems"
        :key="idx"
        @click="setSlippage(item)"
      >
        <p>{{ item }}%</p>
      </div>
      <label
        class="splipage-item custom"
        :class="{
          error: customErr,
          active: customValue == slippage && customValue !== '',
        }"
        @click="activateCustomState()"
      >
        <input
          v-if="isCustom"
          v-model.trim="customValue"
          type="number"
          placeholder="Custom"
          @input="setCustomValue($event.target.value)"
        />
        <p v-else>Custom</p>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slippage: {
      required: true,
    },
  },
  data() {
    return {
      slippageItems: [0.5, 1, 3, 5],
      isCustom: false,
      customValue: "",
      customErr: false,
      maxValue: 100,
    };
  },
  methods: {
    setSlippage(item) {
      this.customErr = false;
      this.isCustom = false;
      this.customValue = "";
      this.$emit("update", item);
    },
    setCustomValue(value) {
      this.customErr = false;
      if (isNaN(value) || value < 0 || value > this.maxValue) {
        this.customErr = true;
        this.$emit("update", 0);
      }

      this.$emit("update", value);
    },
    activateCustomState() {
      this.isCustom = true;
      this.$emit("update", 0);
    },
  },
};
</script>

<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.slippage-block {
  margin-bottom: 24px;
  margin-top: 20px;

  .slippage-title {
    text-align: left;
    line-height: 20px;
    font-size: 14px;
  }

  .items-wrap {
    display: flex;
    align-items: center;
    margin-top: 16px;
  }

  .splipage-item {
    font-size: 14px;
    line-height: 20px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 100px;
    padding: 6px 14px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    transition: border 0.3s ease;
    margin-right: 8px;

    &.custom {
      margin-right: 0;
    }

    input {
      background-color: transparent;
      border: none;
      //height: 100%;
      text-align: center;
      color: #1c1c1c;
      outline: none;
      max-width: 82px;
      //padding-left: 20px;
      //padding-right: 20px;
    }

    &.disabled {
      pointer-events: none;
      color: grey;
    }

    &.active,
    &:hover {
      //border: 1px solid #7b79f7;
      color: #1c1c1c;
      background-color: $clrBg3;
    }

    &.error {
      border: 1px solid $clrInputError;
    }
  }
}
</style>
