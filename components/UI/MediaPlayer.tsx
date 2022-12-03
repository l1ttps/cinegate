import { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import getResourceMovie from "../../api/services/getResourceMovie";
import { EpisodeVo, ResourceMovie, TypeResource } from "../../shared/types";

interface MediaPlayerProps {
  id: string;
  category: number;
  episode: EpisodeVo;
}

const MediaPlayer: FC<MediaPlayerProps> = (props) => {
  const { id, category, episode } = props;
  const [movieResource, setMovieResource] = useState<ResourceMovie[]>(
    [] as any
  );

  useEffect(() => {
    (async () => {
      const _movieResource = await Promise.all(
        episode.definitionList.map((definition) =>
          getResourceMovie(
            id,
            category,
            episode.id,
            TypeResource[definition.code]
          )
        )
      ).then((res) => res.filter((data) => data));
      setMovieResource(_movieResource);
    })();
  }, [category, episode.definitionList, episode.id, id]);

  if (movieResource.length === 0) {
    return <></>;
  }
  return (
    <div className="border rounded-lg player-wrapper border-stone-800">
      <ReactPlayer
        width={"100%"}
        height={"100%"}
        controls
        playing
        className="rounded-lg"
        url={movieResource[0].mediaUrl}
      />
    </div>
  );
};

export default MediaPlayer;
