import { FunctionComponent } from "react";
import { Pagination } from "swiper";
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
    <div className="flex flex-col p-10 netflix-slider">
      <span className="absolute text-2xl font-bold">{title}</span>
      <div className="relative flex flex-row swiper-container">
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },

            1024: {
              slidesPerView: 10,
              spaceBetween: 50,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="swiper-wrapper"
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
