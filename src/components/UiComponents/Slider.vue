<template>
  <div class="slider-container">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      class="slider"
      @input="onChange"
      :style="{
        backgroundSize: ((value - min) * 100) / (max - min) + '% 100%',
      }"
      :disabled="disabled"
    />
  </div>
</template>

<script>
export default {
  props: {
    // from 0 to 100
    value: {
      required: true,
    },
    step: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      min: 0,
      max: 100,
    };
  },
  methods: {
    onChange(event) {
      this.$emit("changeValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.slider-container {
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;

  .slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 12px;
    background: #606060;
    outline: none;
    border-radius: 4px;
    background-image: linear-gradient(#e7fc6e, #e7fc6e);
    background-repeat: no-repeat;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 20px;
    background: url("../../assets/images/sliderThumb.svg");
    background-repeat: no-repeat;
    background-size: 10px 20px;
    cursor: pointer;
    border-radius: 6px;
  }
  .slider:disabled::-webkit-slider-thumb {
    cursor: not-allowed;
  }
  .slider::-moz-range-thumb {
    width: 10px;
    height: 20px;
    background: #e7fc6e;
    cursor: pointer;
    border-radius: 6px;
    background: url("../../assets/images/sliderThumb.svg");
    background-repeat: no-repeat;
    background-size: 10px 20px;
  }
  .slider::-moz-range-progress {
    background-color: #e7fc6e;
  }
  .slider::-ms-fill-lower {
    background-color: #e7fc6e;
  }
}

@media screen and(max-width: 640px) {
  .slider-container {
    height: 28px;

    .slider {
      height: 4px;
    }
    .slider::-webkit-slider-thumb {
      width: 16px;
      height: 28px;
      background-size: 16px 28px;
    }
    .slider::-moz-range-thumb {
      width: 16px;
      height: 28px;
      background-size: 16px 28px;
    }
  }
}
</style>
