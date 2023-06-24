import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const categories = await prisma.categories.findMany();

    res.status(200).json(categories);
  } catch (e) {
    console.log("Request error", e);
    res.status(500).json({ error: "Error fetching posts" });
  }
}
