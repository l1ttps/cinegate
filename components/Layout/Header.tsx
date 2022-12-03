import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import logo from "../../assets/images/logo.png";
const HEIGHT = 200;

const Header: FunctionComponent = () => {
  const [fillBg, setFillBg] = useState(false);
  window.addEventListener("scroll", (e) => {
    let scrollPosition =
      window.pageYOffset ||
      window.scrollY ||
      document.body.scrollTop ||
      document.documentElement.scrollTop;
    if (fillBg !== scrollPosition > HEIGHT) {
      setFillBg(!fillBg);
    }
  });

  return (
    <div
      className={classNames(
        [
          "fixed flex left-0 gap-5 text-shadow right-0 text-lg flex-row items-center w-full p-5 px-10 mx-auto z-[100] h-14",
        ],
        fillBg ? "bg-default shadow-lg" : ""
      )}
    >
      <Link href={"/"}>
        <Image
          width={150}
          height={75}
          src={logo}
          loader={() => logo}
          alt="CineGate"
        />
      </Link>
      <Link href={"/my-list"}>
        <span>My list</span>
      </Link>
    </div>
  );
};

export default Header;
