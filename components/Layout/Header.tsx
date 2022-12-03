import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import logo from "../../assets/images/logo.png";
const HEIGHT = 200;

const Header: FunctionComponent = () => {
  const route = useRouter();
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
  const navBarItems = [
    {
      path: "/my-list",
      label: "My list",
    },
    {
      path: "/history",
      label: "History",
    },
  ];

  return (
    <div
      className={classNames(
        [
          "fixed flex left-0 gap-5 text-shadow right-0 text-lg flex-row items-center w-full md:p-5 md:px-10 mx-auto z-[100] h-14",
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
      {navBarItems.map((item) => (
        <Link href={item.path} key={item.path}>
          <span
            className={classNames([
              route.pathname === item.path ? "font-bold shadow" : "",
            ])}
          >
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Header;
