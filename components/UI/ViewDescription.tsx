import { FC } from "react";

interface ViewDescriptionProps {
  text: string;
}
const ViewDescription: FC<ViewDescriptionProps> = ({ text }) => {
  return (
    <div className="p-3 border-l-4 border-red-500 w-fit bg-default/30">
      <span className="text-base lg:text-lg text-shadow">{text}...</span>
    </div>
  );
};

export default ViewDescription;
