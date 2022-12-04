import NextImage, { ImageProps } from "next/image";
import { FunctionComponent } from "react";

// For CDN of LoklokTV

export enum SizeType {
  fullSize = "?imageMogr2/format/webp/format/webp",
  cardHorizontal = "?imageView2/1/w/532/h/380/format/webp/interlace/1/ignore-error/1/q/90!/format/webp",
  cardVertical = "?imageView2/1/w/380/h/532/format/webp/interlace/1/ignore-error/1/q/90!/format/webp",
}
interface ShowImageProps extends ImageProps {
  sizeType: SizeType;
}

export const getImage = (url: string, sizeType) => {
  if (!url.includes("https://")) {
    // local path
    return url;
  }
  return `${url}${sizeType}`;
};

const Image: FunctionComponent<ShowImageProps> = (props) => {
  const { width, height, sizeType } = props;
  const src = getImage(props.src as string, sizeType);
  return (
    <div
      style={{
        width,
        height,
      }}
      {...props}
    >
      <NextImage {...props} src={src} loader={() => src} />
    </div>
  );
};
export default Image;
