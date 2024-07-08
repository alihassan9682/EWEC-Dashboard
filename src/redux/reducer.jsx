/** @format */
import { Maindata } from "../container/ecommercedata";
const initialState = {
  lang: "en",
  dir: "ltr",
  class: "light",
  dataMenuStyles: "dark",
  dataNavLayout: "vertical",
  dataHeaderStyles: "light",
  dataVerticalStyle: "overlay",
  toggled: "",
  dataNavStyle: "",
  horStyle: "",
  dataPageStyle: "regular",
  dataWidth: "fullwidth",
  dataMenuPosition: "fixed",
  dataHeaderPosition: "fixed",
  loader: "disable",
  iconOverlay: "",
  colorPrimaryRgb: "",
  colorPrimary: "",
  bodyBg: "",
  Light: "",
  darkBg: "",
  inputBorder: "",
  bgImg: "",
  iconText: "",
  body: {
    class: "",
  },
  userInfo: "",
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "ThemeChanger":
      state = payload;
      return state;
      break;

     case "USER":
       return {
         ...state.userInfo,
         userInfo:  payload,
       };

    case "ADD_TO_CART":
      state.ecommercedata = Maindata.filter((idx) => {
        return idx.id == payload;
      });

      return state;

    case "PRODUCT":
      state.ecommercedata = state.ecommercedata.filter((idx) => {
        return idx.id == payload;
      });
      return state;
      break;

    default:
      return state;
  }
}
