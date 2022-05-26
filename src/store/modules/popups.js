export default {
  state: {
    showPopup: false,
    popupType: null,
    popupData: null,
  },
  mutations: {
    setPopupState(state, { type, isShow, datas }) {
      let checksPassed = true;
      // deleverage popup check
      if (type === "deleverage" && isShow === true) {
        checksPassed = checksPassed && canShowDeleverage();
      }

      if (checksPassed) {
        state.popupType = type;
        state.showPopup = isShow;
        state.popupData = datas;
      }
    },
    closePopups(state) {
      state.popupType = null;
      state.showPopup = false;
      state.popupData = null;
    },
  },
  getters: {
    getPopupState: (state) => state.showPopup,
    getPopupType: (state) => state.popupType,
    getPopupData: (state) => state.popupData,
  },
};

function canShowDeleverage() {
  const localStorageRecord = localStorage.getItem("neverShowDeleveragePopup");
  return !(localStorageRecord === "true") && localStorageRecord === null;
}
