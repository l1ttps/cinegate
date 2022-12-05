// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import getHomeSelection from "../../api/services/getHomeSelection";
import { HomeSection } from "../../shared/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HomeSection[]>
) {
  const homeData = await getHomeSelection();
  res.status(200).json(homeData);
}
