<template>
  <div class="deleverage-popup">
    <img
      alt=""
      class="close-btn"
      src="@/assets/images/close-popup-grey.svg"
      @click="closePopup"
    />
    <p class="main-text">
      Attention! You are about to repay your position using flashloan
      deleverage!
    </p>
    <p class="comment">
      Make sure you understand the additional costs of using a flashloan by
      reading our <a :href="docsLink" target="blanc">docs</a>!
    </p>
    <button
      class="dont-show-btn"
      data-cy="dont-show-again"
      @click="dontShowAgain"
    >
      Don&#39;t show again
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      docsLink: "https://docs.nereus.finance/",
    };
  },
  methods: {
    closePopup() {
      this.$emit("close");
    },
    dontShowAgain() {
      localStorage.setItem("neverShowDeleveragePopup", true);
      this.closePopup();
    },
  },
};
</script>

<style lang="scss" scoped>
.deleverage-popup {
  padding: 20px 0px 40px;
  background: $clrBg2;
  border-radius: 8px;
  max-width: 500px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;

  .close-btn {
    width: 20px;
    height: 20px;
    align-self: flex-end;
    margin-right: 20px;
    cursor: pointer;
  }

  .main-text {
    font-size: 20px;
    line-height: 28px;
    margin: 5px 32px 24px;
    cursor: default;
  }

  .comment {
    font-size: 16px;
    line-height: 24px;
    margin: 0px 32px 40px;
    cursor: default;

    a {
      color: $clrBlue6;
      text-decoration: none;
    }
  }

  .dont-show-btn {
    line-height: 20px;
    font-size: 14px;
    background-color: $clrDisable;
    color: white;
    border: none;
    border-radius: 16px;
    width: fit-content;
    padding: 6px 16px;
    align-self: center;
    cursor: pointer;
  }
}

@media screen and(max-width: 640px) {
  .deleverage-popup {
    .main-text {
      font-size: 18px;
      line-height: 24px;
      margin: 20px 16px;
    }

    .comment {
      line-height: 20px;
      margin: 0px 16px 24px;
    }

    .dont-show-btn {
      line-height: 24px;
      font-size: 18px;
      border-radius: 24px;
      padding: 12px 72px;
    }
  }
}
</style>
