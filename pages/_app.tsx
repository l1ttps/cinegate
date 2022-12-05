import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "swiper/css";
import "swiper/css/navigation";
import HeadSEO from "../components/home/HeadSEO";
import store from "../redux/store";
import "../styles/globals.css";
const persistor = persistStore(store);

const firebaseConfig = {
  apiKey: "AIzaSyC2yz2afUnbU0w_mSB_8sJCoq4Q4dflx8g",
  authDomain: "cinegate-29311.firebaseapp.com",
  projectId: "cinegate-29311",
  storageBucket: "cinegate-29311.appspot.com",
  messagingSenderId: "371087322187",
  appId: "1:371087322187:web:cca5e9f09794df033df1ce",
  measurementId: "G-L08LGQ8QBW",
};

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined") {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }
  return (
    <>
      <HeadSEO />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}
