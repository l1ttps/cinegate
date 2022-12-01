import { FC } from "react";

interface ViewVoteProps {
  score: number;
}
const ViewVote: FC<ViewVoteProps> = ({ score }) => {
  return (
    <div className="mb-1 font-bold text-green-500">
      {(100 / 10) * score}% Match
    </div>
  );
};

export default ViewVote;
