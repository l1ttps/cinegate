import { FunctionComponent } from "react";
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
    </div>
  );
};

export default Layout;
