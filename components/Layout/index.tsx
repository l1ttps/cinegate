import { FunctionComponent } from "react";
import PopupDetailMovie from "../UI/PopupDetailMovie";
import Footer from "./Footer";
import Header from "./Header";
interface LayoutProps {
  children: JSX.Element;
}

const Layout: FunctionComponent<LayoutProps> = (props) => {
  const { children } = props;
  return (
    <div className="h-full">
      <div className="block h-full text-xl font-bold text-gray-100 md:hidden center">
        The device will be supported soon.
      </div>
      <div className="hidden h-full md:block">
        <Header />
        <div className="h-full mx-auto ">{children}</div>
        <Footer />
        <PopupDetailMovie />
      </div>
    </div>
  );
};

export default Layout;
