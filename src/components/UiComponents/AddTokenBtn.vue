<template>
  <button :disabled="disabled" class="token-btn" @click="addToken">
    <img alt="" class="add-icon" src="@/assets/images/icon-add.svg" />
    Add {{ tokenName }} to your browser wallet
  </button>
</template>

<script>
import tokensInfo from "@/utils/tokens/addedTokens.js";

export default {
  props: {
    tokenName: {
      type: String,
      required: true,
    },
  },
  computed: {
    account() {
      return this.$store.getters.getAccount;
    },
    tokenIcon() {
      const tokenImage = require(`@/assets/images/tokens-icon/Token_${this.tokenName}.svg`);
      return tokenImage || require("@/assets/images/tokens-icon/Token_ETH.svg");
    },
    tokenInfo() {
      return tokensInfo.find((token) => token.name === this.tokenName);
    },
  },
  data() {
    return {
      disabled: false,
    };
  },
  methods: {
    async addToken() {
      if (!this.account) {
        return false;
      }
      let imageURL = String(
        window.location.origin + "/img/Token_NXUSD.e269f352.svg"
      );

      this.disabled = true;
      const { ethereum } = window;
      if (this.tokenName === "NXUSD") {
        try {
          // wasAdded is a boolean. Like any RPC method, an error may be thrown.
          const wasAdded = await ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: "0xF14f4CE569cB3679E99d5059909E23B07bd2F387", // The address that the token is at.
                symbol: "NXUSD", // A ticker symbol or shorthand, up to 5 chars.
                decimals: 18, // The number of decimals in the token
                image: imageURL, // A string url of the token logo
              },
            },
          });
          if (wasAdded) {
            console.log("Thanks for your interest!");
          } else {
            this.disabled = false;
            console.log("Your loss!");
          }
        } catch (error) {
          this.disabled = false;
          console.log(error);
        }
      } else {
        try {
          // wasAdded is a boolean. Like any RPC method, an error may be thrown.
          const wasAdded = await ethereum.request({
            method: "wallet_watchAsset",
            params: {
              type: "ERC20", // Initially only supports ERC20, but eventually more!
              options: {
                address: this.tokenInfo.address, // The address that the token is at.
                symbol: this.tokenInfo.symbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: this.tokenInfo.decimals, // The number of decimals in the token
                image: this.tokenInfo.image, // A string url of the token logo
              },
            },
          });

          if (wasAdded) {
            console.log("Thanks for your interest!");
          } else {
            this.disabled = false;
            console.log("Your loss!");
          }
        } catch (error) {
          this.disabled = false;
          console.log(error);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.token-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  padding: 4px 16px 4px 4px;
  gap: 4px;

  width: auto;
  height: 32px;

  margin: 18px 0 0 auto;

  background: #353535;
  border-radius: 16px;
  border: 1px solid transparent;
  cursor: pointer;

  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #ffffff;

  &:disabled {
    &:hover {
      cursor: not-allowed;
    }

    border: 1px solid lightgrey;
  }

  &:hover {
    border: 1px solid white;
  }

  img {
    max-width: 100%;
    height: auto;
  }
}
</style>
