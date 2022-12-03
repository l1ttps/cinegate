import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import AddFavorite from "../../components/UI/AddFavorite";
import BackdropLoading from "../../components/UI/BackdropLoading";
import MediaPlayer from "../../components/UI/MediaPlayer";
import MoreLikeThis from "../../components/UI/MoreLikeThis";
import TagList from "../../components/UI/TagList";
import ViewDescription from "../../components/UI/ViewDescription";
import ViewVote from "../../components/UI/ViewVote";
import ViewYear from "../../components/UI/ViewYear";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchDetailMovie } from "../../redux/slices/detailMovie";
import { Favorite, Movie, WatchType } from "../../shared/types";
interface WatchViewProps {
  watchType: WatchType.TV | WatchType.MOVIE;
  id: number;
  movie: Movie;
}

const WatchView: NextPage<WatchViewProps> = (props) => {
  const router = useRouter();
  const { id, watchType } = router.query;
  const episodeId = 0;
  const dispatch = useAppDispatch();
  const detailMovie = useAppSelector((store) => store.detailMovie);
  const movie = detailMovie.data;
  const category = watchType === WatchType.TV ? 1 : 0;
  useEffect(() => {
    !movie &&
      dispatch(fetchDetailMovie({ id: parseInt(id as string), category }));
  }, [category, dispatch, id, movie, watchType]);

  if (!movie) {
    return <BackdropLoading />;
  }

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
        <div className="grid grid-cols-4 gap-3 ">
          <div className="flex flex-col col-span-3 gap-3">
            <MediaPlayer
              category={category}
              id={movie.id}
              episode={movie.episodeVo[episodeId]}
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
          <MoreLikeThis forceGridCol likeList={movie.likeList} />
        </div>
      </Layout>
    </>
  );
};

export default WatchView;
