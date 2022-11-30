import NextImage, { ImageProps } from "next/image";
import { FunctionComponent } from "react";

interface ShowImageProps extends ImageProps {}

export const getImage = (url: string) => {
  return `https://images.weserv.nl/?url=${url}`;
};

const Image: FunctionComponent<ShowImageProps> = (props) => {
  const { width, height } = props;
  const src = getImage(props.src as string);
  return (
    <div
      style={{
        width,
        height,
      }}
      {...props}
    >
      <NextImage
        placeholder="blur"
        {...props}
        src={src}
        blurDataURL={src}
        loader={() => src}
      />
    </div>
  );
};
export default Image;
