import { NextPage } from "next";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import getHomeSelection from "../api/services/getHomeSelection";
import Banner from "../components/home/Banner";
import Layout from "../components/Layout";
import CategorySlide from "../components/UI/CategorySlide";
import Loading from "../components/UI/Loading";
import Splash from "../components/UI/Splash";
import { HomeSection } from "../shared/types";
const Home: NextPage = () => {
  const [page, setPage] = useState(0);
  const [homeSelection, setHomeSelection] = useState<HomeSection[]>([]);
  const [hasMore, setHasMore] = useState(true);
  console.log(homeSelection);

  const fetchData = async (page) => {
    const response = await getHomeSelection(page);
    if (response.length === 0) {
      setHasMore(false);
    }
    setPage(page + 1);
    setHomeSelection((oldState) => {
      return [...oldState, ...response];
    });
  };

  useEffect(() => {
    fetchData(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (homeSelection.length === 0) {
    return <Splash />;
  }

  return (
    <Layout withoutPadding>
      <>
        <Banner data={homeSelection[0]} />
        <div className="flex flex-col pb-5 gap-20 absolute left-0 right-0 top-[78%] z-[30]">
          <InfiniteScroll
            dataLength={homeSelection.length}
            hasMore={hasMore}
            loader={
              <div className="center">
                <Loading />
              </div>
            }
            next={() => fetchData(page)}
          >
            {homeSelection.map((list) => (
              <CategorySlide
                key={list.refId}
                data={list.recommendContentVOList}
                title={list.homeSectionName}
              />
            ))}
          </InfiniteScroll>
        </div>
      </>
    </Layout>
  );
};

export default Home;
