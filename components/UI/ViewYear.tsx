import { FC } from "react";

interface ViewYearProps {
  year: number;
}

const ViewYear: FC<ViewYearProps> = ({ year }) => {
  return <div className="px-1 mb-3 border-2 rounded-lg w-fit">{year}</div>;
};

export default ViewYear;
