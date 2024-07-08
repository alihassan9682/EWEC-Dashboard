/** @format */

import { Outlet } from "react-router-dom";
import {store} from "../redux/store";
import { Provider } from "react-redux";
import { Fragment, useEffect } from "react";
import labware from "../assets/images/brand-logos/labwarelogo1.png";
import { Toaster } from "react-hot-toast";

const Auth = () => {
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <Fragment>
      <Provider store={store}>
        <Toaster />
        <Outlet />
      </Provider>
      <div className="fixed bottom-0 right-0 text-white flex flex-col items-center ">
        <div className="ml-9 !mt-4 absolute  text-sm font-extrabold">
          Powered by
        </div>
        <img src={labware} alt="logo" className="w-44 h-auto ml-4" />
      </div>
    </Fragment>
  );
};

export default Auth;
