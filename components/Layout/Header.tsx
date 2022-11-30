import Image from "next/image";
import { FunctionComponent } from "react";
import logo from "../../assets/images/logo.png";

const Header: FunctionComponent = () => {
  return (
    <div className="container fixed z-20 flex flex-row items-center w-full p-5 px-10 mx-auto text-4xl font-bold uppercase h-14">
      <Image
        width={150}
        height={75}
        src={logo}
        loader={() => logo}
        alt="CineGate"
      />
    </div>
  );
};

export default Header;
