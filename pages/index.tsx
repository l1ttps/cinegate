import { FunctionComponent, useEffect } from "react";
import Banner from "../components/home/Banner";
import Layout from "../components/Layout";
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
      </>
    </Layout>
  );
};

export default Home;
