import Loading from "./Loading";

const BackdropLoading = () => {
  return (
    <div className="z-[200] fixed bg-black/60 h-screen w-screen center">
      <Loading />
    </div>
  );
};

export default BackdropLoading;
