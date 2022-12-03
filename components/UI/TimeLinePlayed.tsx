import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";

interface TimeLinePlayedProps {
  movieId: string;
}

const TimeLinePlayed: FC<TimeLinePlayedProps> = ({ movieId }) => {
  const history = useAppSelector((store) => store.history.entities[movieId]);

  return history ? (
    <div className="h-1 bg-gray-100 rounded-full w-36 ">
      <div
        className={`bg-red-500 rounded-full h-1`}
        style={{
          width: `${(100 / history.totalTime) * history.currentTime}%`,
        }}
      ></div>
    </div>
  ) : (
    <></>
  );
};

export default TimeLinePlayed;
