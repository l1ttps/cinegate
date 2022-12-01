import { FC } from "react";

interface Tag {
  id: number;
  name: string;
}

interface TagListProps {
  tagList: Tag[];
}
const TagList: FC<TagListProps> = ({ tagList }) => {
  return (
    <div className="flex gap-3 my-3">
      {tagList.map((tag, index) => (
        <div
          className="p-2 px-3 text-white rounded-full cursor-pointer active:scale-90 bg-stone-500 w-fit"
          key={tag.id}
        >
          {tag.name}
        </div>
      ))}
    </div>
  );
};

export default TagList;
