import { FunctionComponent, useEffect } from "react";
import Banner from "../components/home/Banner";
import Layout from "../components/Layout";
import CategorySlide from "../components/UI/CategorySlide";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchHomeSelection } from "../redux/slices/homeSelection";

const Home: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHomeSelection());
  }, [dispatch]);

  const homeSelection = useAppSelector((store) => store.homeSelection);

  if (homeSelection.data.length === 0) {
    return <></>;
  }

  return (
    <Layout>
      <>
        <Banner data={homeSelection.data[0]} />
        <div className="flex flex-col absolute left-0 right-0 top-[78%] z-[100]">
          {homeSelection.data.map((list) => (
            <CategorySlide
              key={list.refId}
              data={list.recommendContentVOList}
              title={list.homeSectionName}
            />
          ))}
        </div>
      </>
    </Layout>
  );
};

export default Home;
