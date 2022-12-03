import classnames from "classnames";
import { FunctionComponent, Suspense } from "react";
import PopupDetailMovie from "../UI/PopupDetailMovie";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  children: JSX.Element;
  withoutPadding?: boolean;
}

const Layout: FunctionComponent<LayoutProps> = (props) => {
  const { children, withoutPadding } = props;

  return (
    <div className="h-full">
      <div className="block h-full text-xl font-bold text-gray-100 md:hidden center">
        The device will be supported soon.
      </div>
      <div className="hidden h-full md:block">
        <Header />
        <Suspense fallback={<>loading</>}>
          <div
            className={classnames([
              "h-full contain",
              withoutPadding ? "p-0" : "mx-auto container pt-20  ",
            ])}
          >
            {children}
          </div>
        </Suspense>
        <Footer />
        <PopupDetailMovie />
      </div>
    </div>
  );
};

Layout.defaultProps = {
  withoutPadding: false,
};

export default Layout;
