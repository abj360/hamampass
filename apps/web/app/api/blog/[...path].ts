import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { path } = req.query;
    const targetUrl = `https://nomadicated.com/${(path as string[]).join("/")}`;

    const response = await fetch(targetUrl);

    if (!response.ok) {
      res.status(response.status).send("Error fetching the content");
      return;
    }

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).send("Internal Server Error");
  }
}
