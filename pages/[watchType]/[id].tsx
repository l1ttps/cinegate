import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import AddFavorite from "../../components/UI/AddFavorite";
import BackdropLoading from "../../components/UI/BackdropLoading";
import Episodes from "../../components/UI/Episodes";
import MediaPlayer from "../../components/UI/MediaPlayer";
import MoreLikeThis from "../../components/UI/MoreLikeThis";
import TagList from "../../components/UI/TagList";
import ViewDescription from "../../components/UI/ViewDescription";
import ViewVote from "../../components/UI/ViewVote";
import ViewYear from "../../components/UI/ViewYear";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchDetailMovie } from "../../redux/slices/detailMovie";
import { addHistory } from "../../redux/slices/history";
import { Favorite, Movie, WatchType } from "../../shared/types";
interface WatchViewProps {
  watchType: WatchType.TV | WatchType.MOVIE;
  id: number;
  movie: Movie;
}

const WatchView: NextPage<WatchViewProps> = (props) => {
  const router = useRouter();
  const { id, watchType, episode } = router.query;
  const episodeId = episode ? parseInt(episode as string) : 1;
  const dispatch = useAppDispatch();
  const detailMovie = useAppSelector((store) => store.detailMovie);
  const movie = detailMovie.data;
  const category = watchType === WatchType.TV ? 1 : 0;

  useEffect(() => {
    !movie &&
      dispatch(fetchDetailMovie({ id: parseInt(id as string), category }));
  }, [category, dispatch, id, movie, watchType]);

  useEffect(() => {
    if (!!movie) {
      dispatch(
        addHistory({
          id: movie.id,
          coverHorizontalUrl: movie.coverHorizontalUrl,
          createdAt: new Date().valueOf(),
          currentTime: 0,
          totalTime: 0,
          name: movie.name,
          episodeId,
        })
      );
    }
  }, [dispatch, episode, episodeId, movie]);

  if (!movie) {
    return <BackdropLoading />;
  }

  if (typeof episodeId === "number" && episodeId > movie.episodeVo.length) {
    router.push(router.asPath.split("?")[0]);
    return <></>;
  }

  const dataFavorite: Favorite = {
    id: movie.id,
    coverHorizontalUrl: movie.coverHorizontalUrl,
    createdAt: new Date().valueOf(),
    name: movie.name,
  };

  return (
    <>
      <Head>
        <title>{movie.name}</title>
      </Head>
      <Layout>
        <div className="grid grid-cols-4 gap-5 p-5">
          <div className="flex flex-col col-span-3 gap-3">
            <MediaPlayer
              episodeId={episodeId}
              movie={movie}
              category={category}
              id={movie.id}
            />
            <div className="flex items-center justify-between w-full">
              <span className="text-2xl font-bold">{movie.name}</span>
              <AddFavorite favorite={dataFavorite} />
            </div>
            <div className="flex gap-3">
              <ViewYear year={movie.year} />
              <ViewVote score={movie.score} />
            </div>
            {movie.episodeCount > 0 && (
              <div className="flex flex-row items-center gap-3 font-bold">
                <span>Playing</span>
                <div className="px-3 bg-red-500 rounded-lg w-fit center">
                  {episodeId}
                </div>
              </div>
            )}
            <ViewDescription text={movie.introduction} />
            <TagList tagList={movie.tagList} />
            <Episodes movie={movie} />
          </div>
          <div className="col-span-1">
            <MoreLikeThis forceGridCol likeList={movie.likeList} />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default WatchView;
