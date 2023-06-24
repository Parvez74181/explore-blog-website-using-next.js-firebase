import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const totalCount = await prisma.blogs.count(); // Get the total count of categories

    res.status(200).json(totalCount);
  } catch (e) {
    console.error("Request error", e);
    res.status(500).json({ error: "Error fetching posts" });
  }
}
