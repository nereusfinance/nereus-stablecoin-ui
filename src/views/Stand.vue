<template>
  <div v-if="isConnected" class="stand-view">
    <div class="container mini">
      <div class="stand-group">
        <h1>NXUSD Markets</h1>

        <div class="stand-container">
          <div class="search-container">
            <input
              v-model="search"
              class="search-input"
              placeholder="Search"
              type="text"
            />
          </div>
          <div class="stand-sort">
            <div
              id="select"
              :class="{ active: active }"
              :disabled="disabledSort"
              @click="isActive"
            >
              {{ setSortParam(sortParam) }}
            </div>
            <div v-if="active" class="table">
              <div
                v-for="item in sortedBy"
                :key="item"
                class="select-item"
                @click="setSortParam(item)"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <StandTable :items="filteredList" :tableType="2" />
        <p
          v-if="!filteredList.length && this.search.length !== 0"
          class="notExist"
        >
          The search has not given any results
        </p>
      </div>
    </div>
  </div>
  <div v-else class="stand-action-view">
    <ActionComponent
      :disabled-status="disabledStatus"
      :name="name"
      :onClick="walletBtnHandler"
      :text="text"
    />
  </div>
</template>

<script>
const StandTable = () => import("@/components/Stand/Table");
const ActionComponent = () =>
  import("@/components/UiComponents/ActionComponent");

export default {
  data() {
    return {
      text: "Please connect your wallet",
      name: "Connect",
      disabledStatus: false,
      active: false,

      sortParam: "Sorted by Title",
      sortedBy: [
        "Sorted by Title",
        "NXUSD borrowed",
        "Liquidation fee",
        "NXUSD left",
      ],
      disabledSort: false,
      search: "",
    };
  },
  components: {
    StandTable,
    ActionComponent,
  },
  computed: {
    pools() {
      return this.$store.getters.getPools;
    },
    isConnected() {
      return (
        this.$store.getters.getWalletIsConnected ||
        this.$store.getters.getWalletProviderName === "Default"
      );
    },
    filteredList() {
      let sortedArray = this.pools;
      if (this.search.length !== 0) {
        sortedArray = sortedArray.filter((pool) => {
          return pool.name.toLowerCase().includes(this.search.toLowerCase());
        });
      }
      if (this.sortParam === "Liquidation fee") {
        return sortedArray.sort(this.sortByFee);
      }
      if (this.sortParam === "NXUSD borrowed") {
        return sortedArray.sort(this.sortByTVL);
      }
      if (this.sortParam === "NXUSD left") {
        return sortedArray.sort(this.sortByNXUSDleft);
      }
      return sortedArray.sort(this.sortByTitle);
    },
  },
  methods: {
    isActive() {
      this.active = this.active === false;
    },
    sortByFee(d1, d2) {
      return d1.stabilityFee < d2.stabilityFee ? 1 : -1;
    },
    sortByNXUSDleft(d1, d2) {
      return Number(d1.dynamicBorrowAmount) < Number(d2.dynamicBorrowAmount)
        ? 1
        : -1;
    },
    sortByTitle(d1, d2) {
      return d1.name > d2.name ? 1 : -1;
    },
    sortByTVL(d1, d2) {
      let borrowD1 = parseFloat(
        this.$ethers.utils.formatEther(
          this.$store.getters.getTotalBorrow(d1.id)
        )
      );

      let borrowD2 = parseFloat(
        this.$ethers.utils.formatEther(
          this.$store.getters.getTotalBorrow(d2.id)
        )
      );
      return Number(borrowD1) < Number(borrowD2) ? 1 : -1;
    },
    setSortParam(sortParam) {
      this.sortParam = sortParam;
      return sortParam;
    },
    async walletBtnHandler() {
      if (this.isConnected) {
        return false;
      }

      this.$store.commit("setPopupState", {
        type: "connectWallet",
        isShow: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/mixins/screen-size";

.stand-view {
  padding: 40px 0;
  position: relative;
  flex: 1;

  .stand-group {
    position: relative;
    z-index: 2;

    h1 {
      text-align: left;
      margin-bottom: 24px;
      font-size: 32px;
      line-height: 36px;
    }
  }
}

.stand-action-view {
  position: relative;
  flex: 1;
  background: #1c1c1c;
  @include respond-to(sm) {
    display: flex;
    justify-content: center;
  }
}

.stand-container {
  display: flex;
  flex-direction: row;
  height: 50px;
  @include respond-to(sm) {
    flex-direction: column;
    height: 88px;
    margin-bottom: 24px;
  }
}

.search-input {
  background: #353535 url(../assets/images/search-icon.svg) 98% center no-repeat;
  display: flex;
  height: 32px;
  width: 160px;
  border: 1px solid #8a8a8a;
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: 400;
  font-size: 12px;
  padding: 8px;
  margin-bottom: 32px;
  margin-right: 12px;
  transition: 0.15s all ease-in-out;
  color: #8a8a8a;

  @include respond-to(sm) {
    height: 40px;
    width: 100%;
    margin-bottom: 8px;
    border-radius: 8px;
  }
  &:focus {
    outline: none;
    color: white;
    border-color: white;
  }
}

.stand-sort #select {
  background: #353535 url(../assets/images/arrow-list.svg) 98% center no-repeat;
  appearance: none;
  color: #8a8a8a;
  display: flex;
  flex-direction: row;
  height: 32px;
  width: 160px;
  border: 1px solid #8a8a8a;
  box-sizing: border-box;
  border-radius: 4px;
  padding-top: 8px;
  padding-left: 8px;
  margin-bottom: 30px;
  font-size: 12px;
  cursor: pointer;
  @include respond-to(sm) {
    height: 40px;
    width: 100%;
    margin-bottom: 0px;
    padding-top: 12px;
    border-radius: 8px;
  }
}

div#select.active {
  background: #262626 url(../assets/images/arrow-list.svg) 98% center no-repeat;
  border: 1px solid #ffffff;
  color: white;
}

.select-item {
  z-index: 1;
  position: relative;
  top: -23.5px;
  padding: 8px 12px;
  font-size: 12px;
  width: 159px;
  height: 32px;
  background: #262626;
  cursor: pointer;
  text-align: left;

  &:first-child {
    border-radius: 4px 4px 0 0;
  }

  &:last-child {
    border-radius: 0 0 4px 4px;
    box-shadow: 0 10px 20px 2px rgba(0, 0, 0, 0.25);
  }

  &:not(:last-child) {
    border-bottom: 0.1px solid #1c1c1c;
  }

  &:hover {
    background: #1c1c1c;
    color: white;
  }
}

.notExist {
  margin: 64px 0 88px 0;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
}

@media screen and(max-width: 980px) {
  .stand-view .stand-group:first-child {
    padding-top: 0px;
  }
}

@media screen and(max-width: 780px) {
}

@media screen and(max-width: 640px) {
  .stand-view .stand-group h1 {
    margin-bottom: 20px;
  }
  .stand-view {
    padding-bottom: 100px;
  }
}
</style>
