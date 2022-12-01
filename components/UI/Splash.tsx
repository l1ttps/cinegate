import logo from "../../assets/images/logo.png";
import Image from "../common/Image";
const Splash = () => {
  return (
    <div className="z-[200] fixed bg-black/60 h-screen w-screen center">
      <Image
        width={300}
        height={150}
        src={logo}
        loader={() => logo}
        alt="CineGate"
      />
    </div>
  );
};

export default Splash;
