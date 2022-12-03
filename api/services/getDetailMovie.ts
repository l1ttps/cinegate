import api, { apiResource } from "..";
import { Movie } from "../../shared/types";

const getDetailMovie = async (id: number, category: number): Promise<Movie> =>
  (
    await api.get(apiResource.detailMovie, {
      params: {
        id,
        category,
      },
    })
  ).data.data;

export default getDetailMovie;
