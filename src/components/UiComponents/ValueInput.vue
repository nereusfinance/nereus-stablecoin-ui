<template>
  <div v-if="!isStake" class="wrapper">
    <div
      :class="{
        focus: isFocus,
        error,
      }"
      class="val-input"
    >
      <div
        :class="{ 'values-choose': values.length }"
        class="value-type"
        @click="openSelect"
      >
        <TokenIcon :token="valueName" />

        <p>{{ valueName }}</p>

        <img
          v-if="values.length"
          alt=""
          class="arrow-icon"
          src="@/assets/images/select-pixel-arrow.svg"
        />
      </div>

      <input
        v-model="value"
        :data-cy="cyData"
        :disabled="disabled"
        placeholder="0.0"
        type="text"
        @blur="setFocus(false)"
        @focus="setFocus(true)"
      />

      <div
        v-if="parseFloat(max) && showMax"
        :style="{ cursor: disabled ? 'not-allowed' : 'pointer' }"
        class="max-btn"
        @click="setMax"
      >
        <p>MAX</p>
      </div>

      <transition name="fade">
        <div v-if="showSelect" class="values-select">
          <div
            v-for="(token, idx) in values"
            :key="idx"
            class="balance-item"
            @click="changeValue(token.tokenIdx)"
          >
            <div class="value-select-type">
              <TokenIcon :token="token.name" />
              <p>{{ token.name }}</p>
            </div>
            <p class="value-text">{{ token.balance }}</p>
          </div>
        </div>
      </transition>
    </div>
    <p v-if="errorText" class="error-text">{{ errorText }}</p>
  </div>
  <div v-else-if="isStake" class="wrapper">
    <div
      :class="{
        focus: isFocus,
        error,
      }"
      class="val-input"
    >
      <div
        :class="{ 'values-choose': values.length }"
        class="value-type"
        style="padding-left: 0"
        @click="openSelect"
      >
        <TokenIcon :token="valueName" />
        <img
          v-if="values.length"
          alt=""
          class="arrow-icon"
          src="@/assets/images/select-pixel-arrow.svg"
        />
      </div>

      <input
        v-model="value"
        :disabled="disabled"
        class="input-stake"
        placeholder="Amount"
        type="text"
        @blur="setFocus(false)"
        @focus="setFocus(true)"
      />

      <div v-if="parseFloat(max) && showMax" class="max-btn" @click="setMax">
        <p class="max-btn-text">MAX</p>
      </div>

      <transition name="fade">
        <div v-if="showSelect" class="values-select">
          <div
            v-for="(token, idx) in values"
            :key="idx"
            class="balance-item"
            @click="changeValue(token.tokenIdx)"
          >
            <div class="value-select-type">
              <TokenIcon :token="token.name" />
              <p>{{ token.name }}</p>
            </div>
            <p class="value-text">{{ token.balance }}</p>
          </div>
        </div>
      </transition>
    </div>
    <p v-if="errorText" class="error-text">{{ errorText }}</p>
  </div>
</template>

<script>
const TokenIcon = () => import("@/components/UiComponents/TokenIcon");
import { floorToFixed } from "@/utils/fiexdMath/fixedMath";

export default {
  props: {
    cyData: {
      type: String,
      default: "",
    },
    showMax: {
      type: Boolean,
      default: true,
    },
    max: {
      default: 0,
    },
    values: {
      type: Array,
      default: () => [],
    },
    valueName: {
      type: String,
      default: "AVAX",
    },
    parentValue: {
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isStake: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFocus: false,
      value: this.parentValue,
      showSelect: false,
      errorText: "",
    };
  },
  watch: {
    error(value) {
      if (value) {
        this.errorText = value;
      } else {
        this.errorText = "";
      }
    },
    value(value, oldValue) {
      if (isNaN(value)) {
        this.value = oldValue;
        return false;
      }
      this.$emit("onchange", value);
    },
    parentValue(value) {
      this.value = value;
    },
  },
  methods: {
    setFocus(payload) {
      this.isFocus = payload;
    },
    setMax() {
      if (!this.disabled && !this.isStake) {
        this.value = floorToFixed(this.max, 6);
      } else if (!this.disabled && this.isStake) {
        this.value = this.max;
      }
    },
    openSelect() {
      if (this.values.length) {
        this.showSelect = !this.showSelect;
      }
    },
    changeValue(idx) {
      this.showSelect = false;
      this.$emit("changeToken", idx);
    },
  },
  components: {
    TokenIcon,
  },
};
</script>

<style lang="scss" scoped>
@import "src/mixins/screen-size";

.error-text {
  color: $clrTextError;
  font-size: 10px;
  padding-top: 6px;
  padding-left: 10px;
  text-align: left;
}

.values-select {
  background: $clrBg2;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  padding: 10px 20px;
  z-index: 4;
}

.balance-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 65px;
  padding: 5px 10px;
  margin: 10px 0;
  transition: all 0.3s ease;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .value-select-type {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;

    .type-icon {
      width: 45px;
      height: 45px;
      object-fit: contain;
      margin-right: 10px;
    }
  }
}

.val-input {
  background: $clrBg2;
  border-radius: 4px;
  border: 1px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  position: relative;
  width: 100%;
  transition: border 0.3s ease;
  @include respond-to(sm) {
    background: #353535;
    border: 1px solid #8a8a8a;
  }

  &.error {
    border: 1px solid $clrInputError;
  }

  .value-type {
    border-radius: 12px;
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    font-size: 14px;
    line-height: 20px;
    left: 12px;

    &.values-choose {
      background: rgba(255, 255, 255, 0.02);
      cursor: pointer;
    }

    .arrow-icon {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 9px;
      width: 16px;
      height: auto;
    }

    .token-icon-wrap {
      width: 24px;
      height: 24px;
      position: relative;

      .bg {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    p {
      margin-right: 10px;
      @include respond-to(sm) {
        font-size: 16px;
      }
    }
  }

  input {
    flex: 1;
    display: block;
    text-align: center;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 14px;
    height: 100%;
    color: $clrText;

    &::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  .max-btn {
    position: absolute;
    right: 12px;
    display: flex;
    align-items: center;
    border-radius: 12px;
    font-size: 14px;
  }

  .max-btn-text {
    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #55bcc0;
    @include respond-to(sm) {
      font-size: 14px;
    }
  }

  .input-stake {
    font-weight: 400;
    font-size: 16px;
    text-align: left;
    padding-left: 44px;
  }
}

@media screen and(max-width: 780px) {
  .val-input .value-type {
    width: 90px;
    justify-content: flex-start;
  }

  .val-input .value-type .type-icon {
    margin-right: 5px;
  }

  .val-input input {
    flex: auto;
    width: 80px;
  }

  .val-input {
    justify-content: space-between;
  }

  .val-input .max-btn {
    margin-left: 0;
  }

  .val-input .value-type .arrow-icon {
    right: 3px;
    width: 13px;
  }

  .values-select {
    padding-left: 5px;
    padding-right: 5px;

    .balance-item {
      height: 45px;
    }
  }

  .balance-item .value-select-type .type-icon {
    width: 35px;
    height: 35px;
  }
  .token-icon-wrap {
    width: 19.5px;
    height: 9.5px;
    position: relative;

    .bg {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
