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
      <Header />
      <div className="h-full mx-auto ">{children}</div>
      <Footer />
      <PopupDetailMovie />
    </div>
  );
};

export default Layout;
