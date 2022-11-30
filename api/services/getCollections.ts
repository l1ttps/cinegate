import api from "..";

enum OrderBy {
  ASC = "ASC",
  DESC = "DESC",
}
interface GetCollectionsParams {
  order?: OrderBy;
  order_by?: string;
  page: number;
}

const getCollections = ({
  order = OrderBy.DESC,
  order_by = "listing_time",
  page,
}: GetCollectionsParams) => {
  return api
    .get("collections", {
      params: {
        order,
        order_by,
        page,
      },
    })
    .then((res) => res.data.data);
};

export default getCollections;
