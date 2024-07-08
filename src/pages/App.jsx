/** @format */

import { Fragment, useEffect, useState } from "react";
import Footer from "../components/common/footer/footer";
import Sidebar from "../components/common/sidebar/sidebar";
import Switcher from "../components/common/switcher/switcher";
import Header from "../components/common/header/header";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { Provider } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Tabtotop from "../components/common/tabtotop/tabtotop";
import { Toaster } from "react-hot-toast";
import { PiTagSimpleFill } from "react-icons/pi";

function App() {
  const [MyclassName, setMyClass] = useState("");
  const location = useLocation();

  useEffect(() => {
    import("preline");
  }, []);

  const getPageName = (path) => {
    if (path) {
      return path.replace(/\/+/g, "");
    }
    return ""
  };

  const pageName = getPageName(location.pathname);

  return (
    <Fragment>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HelmetProvider>
            <Helmet
              htmlAttributes={{
                lang: "en",
                dir: "ltr",
                "data-menu-styles": "dark",
                class: "light",
                "data-nav-layout": "vertical",
                "data-header-styles": "light",
                "data-vertical-style": "overlay",
                loader: "disable",
                "data-icon-text": MyclassName,
              }}
            />
            <Switcher />
            <div className="page">
              <Sidebar />
              <div className="content main-index">
                <div className="main-content">
                  <Toaster />

                  <Outlet />
                </div>
              </div>
            </div>
            <Tabtotop />
          </HelmetProvider>
        </PersistGate>
      </Provider>
    </Fragment>
  );
}

export default App;
