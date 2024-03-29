import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { random } from "lodash";
import { FunctionComponent, memo, useEffect, useMemo, useState } from "react";
import getDetailMovie from "../../api/services/getDetailMovie";
import { useAppDispatch } from "../../hooks/redux";
import {
  fetchDetailMovie,
  openPopupDetailMovie,
} from "../../redux/slices/detailMovie";
import { Movie, RecommendContentVOList } from "../../shared/types";
import Image, { SizeType } from "../common/Image";
import AddFavorite from "../UI/AddFavorite";
import BackdropLoading from "../UI/BackdropLoading";
import Button from "../UI/Button";
import PlayButton from "../UI/PlayButton";
import TagList from "../UI/TagList";
import TimeLinePlayed from "../UI/TimeLinePlayed";
import ViewDescription from "../UI/ViewDescription";
interface BannerProps {
  recommendContentVOList: RecommendContentVOList[];
}

const Banner: FunctionComponent<BannerProps> = (props) => {
  const dispatch = useAppDispatch();
  const { recommendContentVOList } = props;
  const filmBanner = useMemo(() => {
    return recommendContentVOList[random(1, 30)];
  }, [recommendContentVOList]);
  // const detailMovie = useAppSelector((store) => store.detailMovie);
  const [detailMovie, setDetailMovie] = useState<Movie>();

  useEffect(() => {
    (async () => {
      if (filmBanner) {
        const { id, category } = filmBanner;
        const _detailMovie = await getDetailMovie(id, category);
        setDetailMovie(_detailMovie);
      }
    })();
  }, [dispatch, filmBanner]);

  if (!detailMovie) {
    return <BackdropLoading />;
  }
  const imagePath = new URL(detailMovie?.coverHorizontalUrl as string);

  const handleClickDetailMovie = () => {
    const { id, category } = detailMovie;
    dispatch(openPopupDetailMovie());
    dispatch(fetchDetailMovie({ id: parseInt(id), category }));
  };

  return (
    <div
      style={{
        // backgroundImage: `url(${imagePath.href})`,
        backgroundSize: "100% 100%",
      }}
      className="h-[100%] bg-no-repeat  relative w-full flex flex-col justify-center px-2 md:px-10"
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-gradient-to-r from-black via-stone-800 to-black opacity-95 img-fade">
        <Image
          className="hidden md:inline-block z-1"
          unoptimized
          src={imagePath.href}
          alt={filmBanner.title}
          fill={true}
          sizeType={SizeType.fullSize}
        />
        <Image
          sizeType={SizeType.fullSize}
          className="flex z-1 md:hidden"
          unoptimized
          src={filmBanner.imageUrl}
          alt={filmBanner.title}
          fill={true}
        />
      </div>
      <div className="z-20 flex flex-col w-full gap-3 lg:w-1/2">
        <div className="flex items-center ">
          <div className="flex flex-col items-center justify-center w-12 h-12 mr-5 font-bold text-gray-800 bg-red-600 rounded-lg shadow-lg ">
            <span>TOP</span>
            <span>{recommendContentVOList.length}</span>
          </div>
        </div>
        <div className="text-2xl md:text-3xl lg:text-5xl text-shadow">
          {filmBanner.title}
        </div>
        <ViewDescription text={detailMovie?.introduction.split(".")[0]} />
        <div className="flex items-center gap-3">
          <PlayButton movie={detailMovie} />
          <Button onClick={handleClickDetailMovie} variant="secondary">
            <div className="flex items-center">
              <InformationCircleIcon className="mr-1" width={30} />
              <span>Detail</span>
            </div>
          </Button>
          <AddFavorite movie={detailMovie} />
        </div>
        <TimeLinePlayed movieId={detailMovie.id} />
        <div>
          <TagList tagList={detailMovie.tagList} />
        </div>
      </div>
    </div>
  );
};

export default memo(Banner);
