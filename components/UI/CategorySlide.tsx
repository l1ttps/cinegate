import { FunctionComponent } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { RecommendContentVOList } from "../../shared/types";
import CardMovie from "./CardMovie";

interface CategorySlideProps {
  data: RecommendContentVOList[];
  title: string;
}

const CategorySlide: FunctionComponent<CategorySlideProps> = (props) => {
  const { data, title } = props;

  return (
    <div className="flex flex-col px-2 md:px-10 netflix-slider">
      <span className="mb-3 text-2xl font-bold ">{title}</span>
      <div className="relative flex flex-row swiper-container">
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1000: {
              slidesPerView: 6,
              spaceBetween: 40,
            },
            1500: {
              slidesPerView: 8,
              spaceBetween: 50,
            },
            2000: {
              slidesPerView: 10,
              spaceBetween: 50,
            },
          }}
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
              <CardMovie movie={movie} />
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
