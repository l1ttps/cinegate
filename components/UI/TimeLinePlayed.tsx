import classNames from "classnames";
import { FC } from "react";
import { useAppSelector } from "../../hooks/redux";

interface TimeLinePlayedProps {
  movieId: string;
  showTime?: boolean;
  fullWidth?: boolean;
}

const TimeLinePlayed: FC<TimeLinePlayedProps> = ({
  movieId,
  showTime,
  fullWidth,
}) => {
  const history = useAppSelector((store) => store.history.entities[movieId]);
  return history && history.currentTime > 60 ? (
    <div className="flex items-center gap-2">
      <div
        className={classNames(
          ["h-1 bg-gray-100 rounded-full"],
          fullWidth ? "w-full" : "w-36"
        )}
      >
        <div
          className={`bg-red-500 rounded-full h-1`}
          style={{
            width: `${(100 / history.totalTime) * history.currentTime}%`,
          }}
        ></div>
      </div>
      {showTime && (
        <span className="font-bold">
          {(history.currentTime / 60).toFixed()} of{" "}
          {(history.totalTime / 60).toFixed()}m
        </span>
      )}
    </div>
  ) : (
    <></>
  );
};

TimeLinePlayed.defaultProps = {
  showTime: true,
  fullWidth: false,
};
export default TimeLinePlayed;
