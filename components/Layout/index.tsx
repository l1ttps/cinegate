import { FunctionComponent } from "react";
import Footer from "./Footer";
import Header from "./Header";
interface LayoutProps {
  container?: boolean;
  children: JSX.Element;
}

const Layout: FunctionComponent<LayoutProps> = (props) => {
  const { container, children } = props;
  return (
    <div className="h-screen">
      <Header />
      {container ? (
        <div className="container mx-auto">{children}</div>
      ) : (
        children
      )}
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  container: true,
};

export default Layout;
