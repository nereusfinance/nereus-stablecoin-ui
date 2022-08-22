<template>
  <div class="deposit-borrow-block">
    <h3 v-if="actionType === 'borrow'">Deposit collateral</h3>
    <h3 v-if="actionType === 'repay'">Repay {{ tokenPairName }}</h3>

    <div v-if="this.tokenName === 'WAVAX'" class="checkbox-wrap">
      <div
        :class="{ active: useAVAX }"
        class="box-wrap"
        data-cy="use-avax"
        @click="toggleUseAVAX"
      >
        <div v-if="useAVAX" class="checkbox">
          <img
            alt=""
            class="checkbox-checked"
            src="@/assets/images/checkboxChecked.svg"
          />
        </div>
        <div v-else class="checkbox">
          <img alt="" src="@/assets/images/checkbox.svg" />
        </div>
      </div>
      <p class="label-text" @click="toggleUseAVAX">Use AVAX</p>
    </div>

    <div class="input-wrap">
      <ValueInput
        :cy-data="'main-input'"
        :error="mainValueError"
        :max="maxMainValue"
        :decimals="mainValueDecimals"
        :parentValue="mainValue"
        :valueName="mainValueTokenName"
        @onchange="updateMainValue"
      />
    </div>

    <h3 v-if="actionType === 'borrow'">Borrow {{ tokenPairName }}</h3>
    <h3 v-if="actionType === 'repay'">Remove collateral</h3>

    <div class="input-wrap">
      <ValueInput
        :cy-data="'pair-input'"
        :disabled="actionType === 'repay' && showDeleverage"
        :error="pairValueError"
        :max="maxPairValue"
        :decimals="pairValueDecimals"
        :parentValue="pairValue"
        :showMax="showMax"
        :valueName="pairValueTokenName"
        @onchange="updatePairValue"
      />
    </div>

    <div v-if="!(showLeverage || showDeleverage)" class="estimate-box">
      <EstimationBlock
        :liquidityPrice="liquidationPrice"
        :maxValue="ltv"
        :nxusdAmount="
          this.actionType === 'borrow' ? this.pairValue : -this.mainValue
        "
        :pool="pool"
        :tokentToNUSD="tokentToNUSD"
        :value="percentValue"
        @onchange="updatePercentValue"
      />
    </div>

    <div v-if="actionType === 'borrow' && !showLeverage" class="config-box">
      <LiquidationRules
        :liquidationPrice="liquidationPrice"
        :maxValue="ltv"
        :value="percentValue"
        @onchange="updatePercentValue"
      />
    </div>

    <div v-if="actionType === 'borrow' && false" class="config-box">
      <div class="checkbox-wrap">
        <div
          :class="{ active: showLeverage }"
          class="box-wrap"
          data-cy="leverage-checkbox"
          @click="toggleShowLeverage"
        >
          <div v-if="showLeverage" class="checkbox">
            <img
              alt=""
              class="checkbox-checked"
              src="@/assets/images/checkboxChecked.svg"
            />
          </div>
          <div v-else class="checkbox">
            <img alt="" src="@/assets/images/checkbox.svg" />
          </div>
        </div>
        <p class="label-text" @click="toggleShowLeverage">Change leverage</p>

        <img
          v-tooltip="
            'Allows users to leverage their position. Read more about this in the documents!'
          "
          alt=""
          class="info-icon"
          src="@/assets/images/i-icon.svg"
        />
      </div>

      <template v-if="showLeverage">
        <SlipageBlock :slipage="slipage" @update="updateSlipage" />
        <LeverageBar
          :mainValue="mainValue"
          :maxPairValue="maxPairValue"
          :multiplier="multiplier"
          :pairValue="pairValue"
          :pool="pool"
          :tokentToNUSD="tokentToNUSD"
          @update="updateMultiplier"
        />
      </template>
    </div>

    <div v-if="actionType === 'repay' && false" class="config-box">
      <div class="checkbox-wrap">
        <div
          :class="{ active: showDeleverage }"
          class="box-wrap"
          data-cy="checkbox-deleverage"
          @click="toggleShowDeleverage"
        >
          <div v-if="showDeleverage" class="checkbox">
            <img
              alt=""
              class="checkbox-checked"
              src="@/assets/images/checkboxChecked.svg"
            />
          </div>
          <div v-else class="checkbox">
            <img alt="" src="@/assets/images/checkbox.svg" />
          </div>
        </div>
        <p class="label-text" @click="toggleShowDeleverage">Deleverage</p>

        <img
          v-tooltip="
            'Allows users to spend some collateral to repay larger amount. Read more about this in the documents!'
          "
          alt=""
          class="info-icon"
          src="@/assets/images/i-icon.svg"
        />
      </div>
      <template v-if="showDeleverage">
        <SlipageBlock :slipage="slipage" @update="updateSlipage" />
        <DeleverageBar
          :amountToRepay="this.mainValue.toString()"
          :collateralToRemove="this.pairValue ? this.pairValue.toString() : '0'"
          :liquidationPrice="this.liquidationPrice"
          :mainTokenName="mainValueTokenName"
          :maxAmountToRepay="this.maxMainValue.toString()"
          :maxCollateralToRemove="this.maxPairValue.toString()"
          :minCollateralToRemove="this.minPairValue.toString()"
          :pairTokenName="pairValueTokenName"
          :pool="pool"
          @updateAmountToRepay="updateMainValue"
          @updateCollateralToRemove="updatePairValue"
        />
      </template>
    </div>

    <div class="action-wrap">
      <div class="checkbox-wrap">
        <div
          :class="{ active: updatePrice }"
          class="box-wrap"
          @click="toggleUpdatePrice"
        >
          <div v-if="updatePrice" class="checkbox">
            <img
              alt=""
              class="checkbox-checked"
              src="@/assets/images/checkboxChecked.svg"
            />
          </div>
          <div v-else class="checkbox">
            <img alt="" src="@/assets/images/checkbox.svg" />
          </div>
        </div>
        <p class="label-text" @click="toggleUpdatePrice">Update price</p>

        <img
          v-tooltip="
            'Update Collateral price from the oracle, for a small gas fee!'
          "
          alt=""
          class="info-icon"
          src="@/assets/images/i-icon.svg"
        />
      </div>

      <button
        :disabled="actionBtnText === 'Nothing to do'"
        class="btn action-btn"
        data-cy="borrow-repay"
        @click="actionHandler"
      >
        {{ actionBtnText }}
      </button>
    </div>
  </div>
</template>

<script>
const ValueInput = () => import("@/components/UiComponents/ValueInput");
const LiquidationRules = () => import("@/components/Pool/LiquidatonRules");
const EstimationBlock = () => import("@/components/Pool/EstimationBlock");
const LeverageBar = () => import("@/components/Pool/LeverageBar");
const SlipageBlock = () => import("@/components/Pool/SlipageBlock");
const DeleverageBar = () => import("@/components/Pool/DeleverageBar");
import { floorToFixed } from "@/utils/fiexdMath/fixedMath";

export default {
  props: {
    poolId: {
      required: true,
    },
    balance: {
      required: true,
    },
    balanceNativeToken: {
      required: false,
    },
    pairBalance: {
      require: true,
    },
    tokenName: {
      type: String,
      required: true,
    },
    tokenToUsd: {
      type: Number,
      default: 1,
    },
    tokenPairToUsd: {
      type: Number,
      default: 1,
    },
    tokenPairName: {
      type: String,
      required: true,
    },
    userTotalCollateral: {
      required: true,
    },
    userTotalBorrowed: {
      required: true,
    },
    actionType: {
      type: String,
      required: true,
    },
    tokenDecimals: {
      type: Number,
      required: true,
    },
    tokenPairDecimals: {
      type: Number,
      required: true,
    },
    ltv: {
      type: Number,
      required: true,
    },
    isUpdatePrice: {
      type: Boolean,
    },
    exchangeRate: {
      required: true,
    },
  },
  data() {
    return {
      inputData: false,
      userBalance: null,
      userBalanceNativeToken: null,

      mainValue: "",
      mainValueError: "",

      pairValue: "",
      pairValueError: "",

      percentValue: "",

      updatePrice: this.isUpdatePrice,

      multiplier: 1,
      slipage: 1,
      showLeverage: false,
      showDeleverage: false,
      poolsWithoutLeveradge: ["DAI", "AVAX", "WBTC", "WETH", "WXT"],
    };
  },
  watch: {
    actionType() {
      this.clearData();
    },
    /*
    For active deleverage collateral slider
    minPairValue(newMinValue) {
      if (!this.pairValue || parseFloat(this.pairValue) < newMinValue) {
        this.updatePairValue(newMinValue);
      }
    },
    */
    showDeleverage(newVal) {
      if (newVal) {
        this.updatePairValue(undefined);
      }
    },
  },
  computed: {
    pool() {
      const poolId = Number(this.$route.params.id);
      return this.$store.getters.getPoolById(poolId);
    },
    useAVAX() {
      return this.$store.getters.getUseAVAX;
    },
    liquidationMultiplier() {
      return (200 - this.ltv) / 100;
    },
    showMax() {
      let show =
        this.actionType === "repay" ||
        (this.actionType === "borrow" &&
          +this.$store.getters.getUserCollateralShare(this.poolId) +
            +this.mainValue);
      if (show) return true;
      else return false;
    },
    maxMainValueWithoutDeleverage() {
      const balance = this.getAVAXStatus()
        ? this.$ethers.utils.formatEther(
            this.$store.getters.getBalanceNativeToken(this.poolId).toString()
          )
        : this.$ethers.utils.formatUnits(
            this.$store.getters.getBalanceToken(this.poolId).toString(),
            this.tokenDecimals
          );

      if (this.actionType === "borrow") return balance;
      if (this.actionType === "repay") {
        const userBorrowPart = this.$store.getters.getUserBorrowPart(
          this.poolId
        );
        return parseFloat(userBorrowPart) > parseFloat(this.parsedPairBalance)
          ? this.parsedPairBalance
          : userBorrowPart;
      }

      return 0;
    },
    maxMainValue() {
      if (!this.showDeleverage) {
        return this.maxMainValueWithoutDeleverage;
      }

      const exchangeRateWithSlipage =
        (100 - this.slipage) / 100 / this.exchangeRate;
      // Max value that can be repayed using the user collateral
      const maxValueForCollateral =
        parseFloat(this.maxMainValueWithoutDeleverage) +
        this.maxCollateralAvailableForDeleverage * exchangeRateWithSlipage;
      // User can not repay more than he has borrowed
      const maxValueUserBorrowed = parseFloat(
        this.$store.getters.getUserBorrowPart(this.poolId)
      );
      return Math.min(maxValueForCollateral, maxValueUserBorrowed);
    },
    minPairValue() {
      const parsedValue = parseFloat(this.mainValue);
      const parsedMax = parseFloat(this.maxMainValueWithoutDeleverage);
      if (parsedValue <= parsedMax) {
        return "0";
      }
      const exchangeRateWithSlipage =
        (100 * this.exchangeRate) / (100 - this.slipage);
      return (parsedValue - parsedMax) * exchangeRateWithSlipage || 0;
    },
    mainValueTokenName() {
      const tokenSymbol = this.getAVAXStatus() ? "AVAX" : this.tokenName;
      if (this.actionType === "borrow") return tokenSymbol;
      if (this.actionType === "repay") return this.tokenPairName;
      return "XX";
    },
    pairValueTokenName() {
      const tokenSymbol = this.getAVAXStatus() ? "AVAX" : this.tokenName;
      if (this.actionType === "borrow") return this.tokenPairName;
      if (this.actionType === "repay") return tokenSymbol;
      return "XX";
    },
    pairValueDecimals() {
      if (this.actionType === "borrow") return this.tokenPairDecimals;
      if (this.actionType === "repay") return this.tokenDecimals;
      return 18;
    },
    mainValueDecimals() {
      if (this.actionType === "borrow") return this.tokenDecimals;
      if (this.actionType === "repay") return this.tokenPairDecimals;
      return 18;
    },
    parsedPairBalance() {
      return this.$ethers.utils.formatUnits(
        this.$store.getters.getBalancePairToken(this.poolId).toString(),
        this.tokenPairDecimals
      );
    },
    tokentToNUSD() {
      const tokenToNUSD = 1 / this.exchangeRate;
      // eslint-disable-next-line no-useless-escape
      let re = new RegExp(`^-?\\d+(?:\.\\d{0,` + (4 || -1) + `})?`);
      return tokenToNUSD.toString().match(re)[0];
    },
    maxPairValue() {
      if (this.actionType === "borrow") {
        let valueInDolars;
        let maxPairValue;

        valueInDolars =
          (+this.$store.getters.getUserCollateralShare(this.poolId) +
            +this.mainValue) /
          this.tokenToUsd;
        maxPairValue =
          (valueInDolars / 100) * (this.ltv - 1) -
          this.$store.getters.getUserBorrowPart(this.poolId);

        return floorToFixed(
          maxPairValue *
            ((100 - this.$store.getters.getBorrowFee(this.poolId)) / 100),
          this.pairValueDecimals
        );
      }

      if (this.actionType === "repay") {
        const borrowedInDolarts =
          this.$store.getters.getUserBorrowPart(this.poolId) /
          this.tokenPairToUsd;
        const collateralInDolarts =
          this.$store.getters.getUserCollateralShare(this.poolId) /
          this.tokenToUsd;

        let maxAmount;

        if (this.mainValue) {
          const collateralInUSDNeedToLeft =
            ((borrowedInDolarts -
              Math.min(this.mainValue, this.maxMainValueWithoutDeleverage)) *
              100) /
            this.ltv;
          const collateralInUSDCanRemove =
            collateralInDolarts - collateralInUSDNeedToLeft;
          maxAmount =
            (collateralInUSDCanRemove * this.userTotalCollateral) /
            collateralInDolarts;
        } else {
          const collateralInUSDNeedToLeft =
            (borrowedInDolarts * 100) / this.ltv;
          const collateralInUSDCanRemove =
            collateralInDolarts - collateralInUSDNeedToLeft;
          maxAmount =
            (collateralInUSDCanRemove * this.userTotalCollateral) /
            collateralInDolarts;
        }

        return floorToFixed(maxAmount, this.pairValueDecimals);
      }

      return 0;
    },
    maxCollateralAvailableForDeleverage() {
      const borrowedInDolarts =
        this.$store.getters.getUserBorrowPart(this.poolId) /
        this.tokenPairToUsd;
      const collateralInDolarts =
        this.$store.getters.getUserCollateralShare(this.poolId) /
        this.tokenToUsd;

      const collateralInUSDNeedToLeft =
        ((borrowedInDolarts - this.maxMainValueWithoutDeleverage) * 100) /
        this.ltv;
      const collateralInUSDCanRemove =
        collateralInDolarts - collateralInUSDNeedToLeft;
      const maxAmount =
        (collateralInUSDCanRemove * this.userTotalCollateral) /
        collateralInDolarts;

      return floorToFixed(maxAmount, this.pairValueDecimals);
    },
    signer() {
      return this.$store.getters.getSigner;
    },
    actionBtnText() {
      if (this.mainValueError || this.pairValueError) return "Nothing to do";

      if (this.actionType === "borrow") {
        if (this.mainValue && this.pairValue && parseFloat(this.pairValue) > 0)
          return "Add collateral and borrow";
        if (this.mainValue) return "Add collateral";
        if (this.pairValue) return "Borrow";
      }

      if (this.actionType === "repay") {
        if (this.mainValue && this.pairValue && parseFloat(this.pairValue) > 0)
          return "Remove collateral and repay";
        if (this.mainValue) return "Repay";
        if (this.pairValue) return "Remove collateral";
      }

      return "Nothing to do";
    },

    liquidationPrice() {
      const userCollateralShare = +this.$store.getters.getUserCollateralShare(
        this.poolId
      );

      if (this.actionType === "borrow") {
        const liquidationPrice =
          (+this.$store.getters.getUserBorrowPart(this.poolId) +
            +this.pairValue) /
          (((userCollateralShare + +parseFloat(+this.mainValue)) * this.ltv) /
            100);

        return liquidationPrice;
      } else {
        const numerator =
          +this.$store.getters.getUserBorrowPart(this.poolId) - +this.mainValue;

        const denominator =
          ((userCollateralShare - +parseFloat(+this.pairValue || 0)) *
            this.ltv) /
          100;

        const liquidationPrice = numerator / denominator;

        return liquidationPrice === Infinity || liquidationPrice <= 0
          ? "xxx.xx"
          : liquidationPrice;
      }
    },
  },
  methods: {
    getAVAXStatus() {
      return this.$store.getters.getUseAVAX;
    },
    updateMultiplier(newVal) {
      this.multiplier = newVal;
    },
    updateSlipage(newVal) {
      this.slipage = newVal;
    },
    toggleUpdatePrice() {
      this.updatePrice = !this.updatePrice;
    },
    toggleShowLeverage() {
      if (this.showLeverage === true) {
        this.multiplier = 1;
      } else {
        this.updatePairValue(this.maxPairValue);
      }

      this.showLeverage = !this.showLeverage;
    },
    toggleShowDeleverage() {
      this.showDeleverage = !this.showDeleverage;
    },
    toggleUseAVAX() {
      const AVAXStatus = this.$store.getters.getUseAVAX;
      this.$store.commit("setUseAVAX", !AVAXStatus);
      this.updateMainValue(this.mainValue);
      this.updatePairValue(this.pairValue);
    },
    toFixed(num, fixed) {
      // eslint-disable-next-line no-useless-escape
      let re = new RegExp(`^-?\\d+(?:\.\\d{0,` + (fixed || -1) + `})?`);
      if (!num.toString().match(re)) {
        return "0";
      }
      return num.toString().match(re)[0];
    },
    actionHandler() {
      if (this.mainValue && this.pairValue && parseFloat(this.pairValue) > 0) {
        if (this.actionType === "borrow") {
          const parsedAmount = this.$ethers.utils.parseUnits(
            this.mainValue.toString(),
            this.mainValueDecimals
          );

          const parsedPair = this.$ethers.utils.parseUnits(
            this.toFixed(this.pairValue, 6),
            this.pairValueDecimals
          );

          const payload = {
            collateralAmount: parsedAmount,
            amount: parsedPair,
            updatePrice: this.updatePrice,
          };

          if (this.multiplier > 1) {
            payload.amount = this.toFixed(this.pairValue, 6);
            this.multiplierHandle(payload, "addAndBorrowMultiple");
            return false;
          }
          this.$emit("addAndBorrow", payload);
          this.clearData();
        }

        if (this.actionType === "repay") {
          let parsedAmount = this.$ethers.utils.parseUnits(
            this.toFixed(this.mainValue, 6),
            this.mainValueDecimals
          );
          let parsedPair = this.$ethers.utils.parseUnits(
            this.pairValue.toString(),
            this.pairValueDecimals
          );

          let payload = {
            collateralAmount: parsedAmount,
            amount: parsedPair,
            updatePrice: this.updatePrice,
          };

          if (
            this.mainValue === this.maxMainValue &&
            this.pairValue === this.maxPairValue
          ) {
            parsedAmount = this.$ethers.utils.parseUnits(
              this.userTotalBorrowed,
              this.mainValueDecimals
            );
            parsedPair = this.$ethers.utils.parseUnits(
              this.userTotalCollateral,
              this.pairValueDecimals
            );

            payload = {
              collateralAmount: parsedAmount,
              amount: parsedPair,
              updatePrice: this.updatePrice,
            };

            this.$emit("removeAndRepayMax", payload);
            this.clearData();
            return false;
          }

          this.$emit("removeAndRepay", payload);
          this.clearData();
        }
        return false;
      }

      if (this.mainValue) {
        if (this.actionType === "borrow") {
          const parsedAmount = this.$ethers.utils.parseUnits(
            this.mainValue.toString(),
            this.mainValueDecimals
          );

          const payload = {
            amount: parsedAmount,
            updatePrice: this.updatePrice,
          };

          this.$emit("addCollateral", payload);
          this.clearData();
        }
        if (this.actionType === "repay") {
          const parsedAmount = this.$ethers.utils.parseUnits(
            this.toFixed(this.mainValue, 6),
            this.mainValueDecimals
          );

          if (this.showDeleverage && parseFloat(this.minPairValue) > 0) {
            this.$store.commit("setPopupState", {
              type: "deleverage",
              isShow: true,
            });
            const payload = {
              walletAmount: this.$ethers.utils.parseUnits(
                this.maxMainValueWithoutDeleverage.toString(),
                this.mainValueDecimals
              ),
              amount: parsedAmount,
              updatePrice: this.updatePrice,
              collateralAmount: this.$ethers.utils.parseUnits(
                floorToFixed(
                  this.minPairValue,
                  this.pairValueDecimals
                ).toString(),
                this.pairValueDecimals
              ),
            };
            this.$emit("repayWithDeleverage", payload);
          } else {
            const payload = {
              amount: parsedAmount,
              updatePrice: this.updatePrice,
            };
            this.$emit("repay", payload);
          }

          this.clearData();
        }
        return false;
      }

      if (this.pairValue) {
        if (this.actionType === "borrow") {
          const parsedPair = this.$ethers.utils.parseUnits(
            this.toFixed(this.pairValue, 6),
            this.pairValueDecimals
          );

          const payload = {
            amount: parsedPair,
            updatePrice: this.updatePrice,
          };

          if (this.multiplier > 1) {
            payload.amount = this.toFixed(this.pairValue, 6);
            this.multiplierHandle(payload, "borrowMultiple");
            return false;
          }

          this.$emit("borrow", payload);
          this.clearData();
        }
        if (this.actionType === "repay") {
          const parsedPair = this.$ethers.utils.parseUnits(
            this.pairValue.toString(),
            this.pairValueDecimals
          );

          const payload = {
            amount: parsedPair,
            updatePrice: this.updatePrice,
          };

          this.$emit("removeCollateral", payload);
          this.clearData();
        }

        return false;
      }
    },
    multiplierHandle(data, type) {
      const percentValue = parseFloat(this.percentValue);

      if (!percentValue) return false;

      console.log("DATA", data);

      const slipageMutiplier = (100 - this.slipage) / 100;

      const amountMultiplyer = percentValue / 100;

      let startAmount = data.amount * 0.995;
      let finalAmount = 0;

      for (let i = this.multiplier; i > 0; i--) {
        if (i > 1) {
          finalAmount += +startAmount;
          startAmount = startAmount * amountMultiplyer;
        } else {
          finalAmount += +startAmount * i;
        }
      }

      const mimAmount = this.$ethers.utils.parseUnits(
        this.toFixed(finalAmount, this.pairValueDecimals),
        this.pairValueDecimals
      );

      const minValue = finalAmount * this.tokenToUsd * slipageMutiplier;

      const minValueParsed = this.$ethers.utils.parseUnits(
        this.toFixed(minValue, this.mainValueDecimals),
        this.mainValueDecimals
      );

      const payload = {
        ...data,
        amount: mimAmount,
        minExpected: minValueParsed,
      };

      console.log("AMOUNT AFTER", type, mimAmount.toString());

      this.$emit(type, payload);
    },
    clearData() {
      this.mainValue = "";
      this.mainValueError = "";
      this.pairValue = "";
      this.pairValueError = "";
      this.percentValue = "";
    },
    updateMainValue(value) {
      this.mainValue = value;
      if (parseFloat(value) > parseFloat(this.maxMainValue)) {
        this.mainValueError = `Insufficient amount. The value available ${this.maxMainValue}`;
        return false;
      }

      this.mainValueError = "";

      if (parseFloat(value) > parseFloat(this.maxMainValue)) {
        this.mainValueError = `Insufficient amount. The value available ${this.maxMainValue}`;
        return false;
      }

      this.mainValueError = "";

      if (this.actionType === "repay") {
        const collateralPercent = (this.pairValue / this.maxPairValue) * 100;
        const borrowPercent =
          (value / this.$store.getters.getUserBorrowPart(this.poolId)) * 100; //this.userTotalBorrowed
        const borrowedInDolarts =
          this.$store.getters.getUserBorrowPart(this.poolId) /
          this.tokenPairToUsd; //this.userTotalBorrowed
        const collateralInDolarts =
          this.$store.getters.getUserCollateralShare(this.poolId) /
          this.tokenToUsd; //this.userTotalCollateral
        const userHasDolars = collateralInDolarts - borrowedInDolarts;
        const acceptedPercent = (userHasDolars / collateralInDolarts) * 100;
        if (
          collateralPercent <= borrowPercent &&
          collateralPercent < acceptedPercent
        ) {
          this.pairValueError = "";
          return false;
        }
      }

      if (this.pairValue) {
        this.updatePairValue(this.pairValue);
      }

      console.log("1this.percentValue", this.percentValue);
      if (this.percentValue && value) {
        this.pairValue = (this.maxPairValue * this.percentValue) / this.ltv;
      }
    },
    updatePairValue(value) {
      if (parseFloat(value) > parseFloat(this.maxPairValue)) {
        this.pairValueError = `Insufficient amount. The value available ${this.maxPairValue}`;
        return false;
      }
      if (this.actionType === "repay") {
        if (!value) {
          this.pairValueError = "";
          this.pairValue = value;
        }
        const collateralPercent = (value / this.maxPairValue) * 100;
        if (collateralPercent > 100) {
          this.pairValueError = `You have insufficient collateral. Please enter a smaller amount or repay more.`;
          this.pairValue = value;
          return false;
        }

        this.pairValueError = "";
        this.pairValue = value;

        return false;
      }

      this.pairValueError = "";
      this.pairValue = value;

      if (!value) {
        this.updatePercentValue("");
        return false;
      }

      this.updatePercentValue(
        parseFloat((this.pairValue / this.maxPairValue) * this.ltv).toFixed(4),
        true
      );
    },
    updatePercentValue(value, fromPair) {
      console.log(">>updatePercentValue", value);
      this.percentValue = value;

      if (fromPair) return false;

      if (this.mainValue && value) {
        this.pairValue = (this.maxPairValue * value) / this.ltv;
      }
    },
    async getUserBalance() {
      const parsedBalance = this.$ethers.utils.formatUnits(
        this.balance.toString(),
        this.tokenDecimals
      );

      this.userBalance = parsedBalance;

      console.log("FORMAT BALANCE:", this.userBalance);

      if (this.balanceNativeToken) {
        const parsedBalanceNativeToken = this.$ethers.utils.formatEther(
          this.balanceNativeToken.toString()
        );

        this.userBalanceNativeToken = parsedBalanceNativeToken;

        console.log(
          "FORMAT BALANCE NATIVE TOKEN:",
          this.userBalanceNativeToken
        );
      }
    },
  },
  async created() {
    await this.getUserBalance();
  },
  components: {
    ValueInput,
    LiquidationRules,
    EstimationBlock,
    LeverageBar,
    SlipageBlock,
    DeleverageBar,
  },
};
</script>

<style lang="scss" scoped>
@import "src/mixins/screen-size";

.deposit-borrow-block {
  padding: 0 24px;
  background: $clrBg2;
  border-radius: 4px;
  width: 100%;
  @include respond-to(sm) {
    margin-bottom: 16px;
  }

  .estimate-box {
    background: rgba(255, 255, 255, 0.02);
    border-radius: 4px;
    border: 1px solid #606060;
    padding: 16px 12px;
    margin-bottom: 8px;
    @include respond-to(sm) {
      margin-bottom: 16px;
    }
  }

  .config-box {
    background: rgba(255, 255, 255, 0.02);
    border-radius: 4px;
    border: 1px solid #606060;
    padding: 16px 12px;
    margin-bottom: 8px;
    @include respond-to(sm) {
      padding: 16px;
    }
  }

  .checkbox-wrap {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 20px;

    .label-text {
      cursor: pointer;
    }

    .info-icon {
      width: 13px;
      height: 13px;
      margin-left: 5px;
      @include respond-to(sm) {
        width: 24px;
        height: 24px;
        margin-left: 10px;
      }
    }

    .box-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      margin-right: 10px;
      background: rgba(255, 255, 255, 0.06);
      cursor: pointer;
      transition: all 0.1s ease;

      &.active {
        .box {
          opacity: 1;
        }
      }

      &.disabled .checkbox {
        cursor: not-allowed;
        filter: brightness(0) saturate(100%) invert(61%) sepia(1%)
          saturate(2362%) hue-rotate(40deg) brightness(90%) contrast(83%);
      }

      .checkbox {
        height: 18px;
        width: 18px;
      }

      .checkbox-checked {
        filter: brightness(0) saturate(100%) invert(81%) sepia(54%)
          saturate(404%) hue-rotate(18deg) brightness(108%) contrast(98%);
      }

      .box {
        background: $clrBlue;
        border-radius: 4px;
        width: 12px;
        height: 12px;
        opacity: 0;
        transition: all 0.1s ease;
      }
    }
  }

  .action-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 16px 0 24px;
    @include respond-to(sm) {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }

  h3 {
    margin: 24px 0 16px;
    text-align: left;
    font-size: 16px;
    line-height: 24px;
  }

  .input-wrap {
    margin: 16px 0;
    @include respond-to(sm) {
      margin: 18px 0;
    }
  }

  .action-btn {
    color: #000000;
    margin-left: auto;
    width: 200px;
    height: 32px;
    @include respond-to(sm) {
      margin-top: 28px;
      margin-left: 0;
      width: 100%;
      height: 48px;
      font-size: 18px;
    }
  }

  .btn {
    &:disabled {
      color: $clrDisableText;
    }
  }
}

@media screen and(max-width: 780px) {
  .deposit-borrow-block {
    padding-left: 16px;
    padding-right: 16px;
  }

  .deposit-borrow-block {
    padding: 10px;
  }
}
</style>
