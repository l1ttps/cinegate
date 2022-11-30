import axios from "axios";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    lang: "en",
    versioncode: "11",
    clienttype: "ios_jike_default",
  },
});

api.interceptors.request.use((config) => {
  return config;
});

const apiResource = {
  home: "homePage/getHome",
  detailFilm: "movieDrama/get",
};

export { apiResource };
export default api;
