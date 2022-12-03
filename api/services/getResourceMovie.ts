import api, { apiResource } from "..";
import { ResourceMovie, TypeResource } from "../../shared/types";

const getResourceMovie = async (
  contentId: string,
  category: number,
  episodeId: number,
  definition: TypeResource
): Promise<ResourceMovie> =>
  (
    await api.get(apiResource.resourceMovie, {
      params: {
        contentId,
        category,
        definition,
        episodeId,
      },
    })
  ).data.data;

export default getResourceMovie;
