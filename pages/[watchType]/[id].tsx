import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import ReactPlayer from "react-player";
import getDetailMovie from "../../api/services/getDetailMovie";
import Layout from "../../components/Layout";
import AddFavorite from "../../components/UI/AddFavorite";
import MoreLikeThis from "../../components/UI/MoreLikeThis";
import TagList from "../../components/UI/TagList";
import ViewDescription from "../../components/UI/ViewDescription";
import ViewVote from "../../components/UI/ViewVote";
import ViewYear from "../../components/UI/ViewYear";
import { Favorite, Movie, WatchType } from "../../shared/types";
interface WatchViewProps {
  watchType: WatchType.TV | WatchType.MOVIE;
  id: number;
  movie: Movie;
}

const WatchView: NextPage<WatchViewProps> = (props) => {
  const { movie } = props;
  const dataFavorite: Favorite = {
    id: movie.id,
    coverHorizontalUrl: movie.coverHorizontalUrl,
    coverVerticalUrl: movie.coverVerticalUrl,
    createdAt: new Date().valueOf(),
    name: movie.name,
  };
  return (
    <>
      <Head>
        <title>{movie.name}</title>
      </Head>
      <Layout>
        <div className="grid grid-cols-2 gap-3 ">
          <div className="flex flex-col col-span-1 gap-3">
            <ReactPlayer
              width={"100%"}
              controls
              playing
              className=""
              url="http://akm-cdn-play.loklok.tv/597bc81948884d2f8da0277cfbcde0fb/07f8365b5c0d4606a58c2afb62e7153e-5590187641bb0fdeb9c71cb6c97501b5-sd.m3u8?hdnts=exp=1669925309-acl=/*-hmac=4c5c1d83ee684e83fcf548d842528c8a9fd7289e893b4120578bf5a4ab601f7f"
            />
            <div className="flex items-center justify-between w-full">
              <span className="text-2xl font-bold">{movie.name}</span>
              <AddFavorite favorite={dataFavorite} />
            </div>
            <div className="flex gap-3">
              <ViewYear year={movie.year} />
              <ViewVote score={movie.score} />
            </div>
            <ViewDescription text={movie.introduction} />
            <TagList tagList={movie.tagList} />
          </div>
          <div className="py-4">
            <MoreLikeThis likeList={movie.likeList} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const watchType = ctx?.params?.watchType;
  const id = +(ctx?.params?.id || 1);
  const category = watchType === WatchType.TV ? 1 : 0;
  const movie = await getDetailMovie(id, category);
  const props = {
    watchType,
    id,
    movie,
  };
  return {
    props,
  };
};
export default WatchView;
