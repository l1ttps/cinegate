import { FunctionComponent } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import breakpointsSwiper from "../../config/breakpointsSwiper";
import { RecommendContentVOList } from "../../shared/types";
import CardSwiper from "./CardSwiper";

interface CategorySlideProps {
  data: RecommendContentVOList[];
  title: string;
}

const CategorySlide: FunctionComponent<CategorySlideProps> = (props) => {
  const { data, title } = props;

  return (
    <div className="flex flex-col px-2 mb-10 md:px-10 netflix-slider">
      <span className="mb-3 text-2xl font-bold ">{title}</span>
      <div className="relative flex flex-row">
        <Swiper
          className="w-full"
          breakpoints={breakpointsSwiper}
          pagination={{
            clickable: true,
          }}
          navigation
          modules={[Navigation]}
          // className="swiper-wrapper"
          loop={false}
        >
          {data.map((movie) => (
            <SwiperSlide key={movie.id}>
              <CardSwiper movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

CategorySlide.defaultProps = {
  data: [],
  title: "Untitled",
};
export default CategorySlide;
