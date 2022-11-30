import api, { apiResource } from "..";
import { HomeSection } from "../../shared/types";

export const getHomeSelection = async (
  page: number = 0
): Promise<HomeSection[]> =>
  (
    await api.get(apiResource.home, {
      params: {
        page,
      },
    })
  ).data.data.recommendItems.filter((item) => !item.bannerProportion);

export default getHomeSelection;
