import { InformationCircleIcon, PlayIcon } from "@heroicons/react/20/solid";
import { FunctionComponent, useEffect, useState } from "react";
import getDetailMovie from "../../api/services/getDetailMovie";
import { useAppDispatch } from "../../hooks/redux";
import {
  fetchDetailMovie,
  openPopupDetailMovie,
} from "../../redux/slices/detailMovie";
import { Favorite, HomeSection } from "../../shared/types";
import Image from "../common/Image";
import AddFavorite from "../UI/AddFavorite";
import Button from "../UI/Button";
import TagList from "../UI/TagList";
import ViewDescription from "../UI/ViewDescription";
interface BannerProps {
  data: HomeSection;
}

const Banner: FunctionComponent<BannerProps> = (props) => {
  const dispatch = useAppDispatch();
  const { data } = props;
  const top = 3;
  const filmBanner = data.recommendContentVOList[top - 1];
  // const detailMovie = useAppSelector((store) => store.detailMovie);
  const [detailMovie, setDetailMovie] = useState<any>();

  useEffect(() => {
    (async () => {
      if (filmBanner) {
        const { id, category } = filmBanner;
        const _detailMovie = await getDetailMovie(id, category);
        console.log(_detailMovie, "_detailMovie");

        setDetailMovie(_detailMovie);
      }
    })();
  }, [dispatch, filmBanner]);

  if (!detailMovie) {
    return <></>;
  }
  const imagePath = new URL(detailMovie?.coverHorizontalUrl as string);
  const dataFavorite: Favorite = {
    id: detailMovie.id,
    coverHorizontalUrl: detailMovie.coverHorizontalUrl,
    coverVerticalUrl: detailMovie.coverVerticalUrl,
    createdAt: new Date().valueOf(),
    name: detailMovie.name,
  };
  const handleClickDetailMovie = () => {
    const { id, category } = detailMovie;
    dispatch(openPopupDetailMovie());
    dispatch(fetchDetailMovie({ id, category }));
  };

  return (
    <div
      style={{
        // backgroundImage: `url(${imagePath.href})`,
        backgroundSize: "100% 100%",
      }}
      className="h-[100%] bg-no-repeat  relative w-full flex flex-col justify-center px-10"
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 z-10 img-fade">
        <Image
          className="hidden md:inline-block z-1"
          unoptimized
          src={imagePath.href}
          alt={filmBanner.title}
          fill={true}
        />
        <Image
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
            <span>{data.recommendContentVOList.length}</span>
          </div>

          <div className="text-2xl font-bold text-shadow">
            #{top} in {filmBanner.contentType}
          </div>
        </div>
        <div className="text-5xl text-shadow">{filmBanner.title}</div>
        <ViewDescription text={detailMovie?.introduction.split(".")[0]} />
        <div className="flex gap-3">
          <Button variant="primary">
            <div className="flex items-center">
              <PlayIcon className="mr-1" width={30} />
              <span>Play</span>
            </div>
          </Button>
          <Button onClick={handleClickDetailMovie} variant="secondary">
            <div className="flex items-center">
              <InformationCircleIcon className="mr-1" width={30} />
              <span>View detail</span>
            </div>
          </Button>
          <AddFavorite favorite={dataFavorite} />
        </div>
        <div>
          <TagList tagList={detailMovie.tagList} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
