<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header"> Choose provider</slot>
        <img
          alt="cross"
          class="btn-close"
          src="@/assets/images/cross.svg"
          @click="closeModal"
        />
      </header>
      <slot name="body">
        <div
          v-for="connector in connectors"
          :key="connector.name"
          class="modal-body"
        >
          <div
            v-if="!connector.disabled"
            class="provider-btn"
            @click="connector.onClick()"
          >
            <div>{{ connector.name }}</div>
            <img
              :alt="connector.name"
              :src="require(`@/assets/images/${connector.iconName}.svg`)"
              class="connector-img"
            />
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Modal",
  data() {
    return {
      itsHover: false,
      connectLoader: false,
      btnText: "Connect",
      connectors: [
        {
          iconName: "MetaMask_Fox",
          name: "Metamask",
          onClick: () => this.useConnector("connectMetamask"),
          disabled: !window.ethereum,
        },
        {
          iconName: "WalletConnect-icon",
          name: "WalletConnect",
          onClick: () => this.useConnector("connectWalletConnect"),
          disabled: false,
        },
      ],
    };
  },
  methods: {
    closeModal() {
      this.$store.commit("closePopups");
    },
    async useConnector(connector) {
      try {
        await this.$store.dispatch(connector);
        this.closeModal();
      } catch (e) {
        console.log("e:", e);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "src/mixins/screen-size";

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  padding: 32px;
  background-color: #262626;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  //width: 30vw;
  //height: 26vh;
  min-height: 265px;
  min-width: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  @include respond-to(sm) {
    width: 100%;
    min-width: 0;
    padding: 56px 16px 16px 16px;
    margin-left: 16px;
    margin-right: 16px;
    border-radius: 8px;
  }
}

.modal-header {
  position: relative;
  margin-bottom: 20px;
  color: white;
  font-size: 20px;
  line-height: 28px;
  justify-content: space-between;
  @include respond-to(sm) {
    font-size: 18px;
    margin-bottom: 16px;
  }
}

.modal-body {
  display: flex;
  flex-direction: column;
  color: #4aae9b;
  position: relative;
  padding: 8px 40px;
  @include respond-to(sm) {
    padding: 8px 0;
  }
}

.btn-close {
  width: 15px;
  position: absolute;
  top: 2px;
  right: 10px;
  cursor: pointer;
  @include respond-to(sm) {
    top: -30px;
    right: 0;
  }
}

.provider-btn {
  top: 6px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  background-color: #606060;
  height: 56px;
  @include respond-to(sm) {
    height: 48px;
    border-radius: 4px;
    background: #353535;
  }

  img {
    width: 40px;
    margin-right: 24px;
    @include respond-to(sm) {
      width: 32px;
      margin-right: 8px;
    }
  }

  div {
    margin-left: 24px;
    @include respond-to(sm) {
      margin-left: 16px;
    }
  }
}

.provider-btn:hover {
  filter: brightness(90%);
}
</style>
