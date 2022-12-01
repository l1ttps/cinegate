import { FunctionComponent } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { RecommendContentVOList } from "../../shared/types";
import Image from "../common/Image";

interface CategorySlideProps {
  data: RecommendContentVOList[];
  title: string;
}

const CategorySlide: FunctionComponent<CategorySlideProps> = (props) => {
  const { data, title } = props;
  console.log(data);

  return (
    <div className="flex flex-col">
      <span className="mb-3 text-2xl font-bold">{title}</span>
      <div className="relative flex flex-row">
        <Swiper
          breakpoints={{
            // when window width is >= 640px
            640: {
              width: 640,
              slidesPerView: 2,
            },
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 4,
            },
          }}
          spaceBetween={0}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
          loop={false}
        >
          {data.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Image
                className="rounded-lg cursor-pointer hover:opacity-1"
                height={246}
                width={175}
                src={movie.imageUrl}
                alt={movie.title}
              />
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
