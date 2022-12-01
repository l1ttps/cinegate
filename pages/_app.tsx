import type { AppProps } from "next/app";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "swiper/css";
import "swiper/css/navigation";
import HeadSEO from "../components/home/HeadSEO";
import BackdropLoading from "../components/UI/BackdropLoading";
import store from "../redux/store";
import "../styles/globals.css";
const persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  const [routeChange, setRouteChange] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      setRouteChange(true);
    });

    Router.events.on("routeChangeComplete", (url) => {
      setRouteChange(false);
    });

    Router.events.on("routeChangeError", (url) => {
      setRouteChange(false);
    });
  }, []);
  return (
    <>
      <HeadSEO />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
          {routeChange && <BackdropLoading />}
        </PersistGate>
      </Provider>
    </>
  );
}
