import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const data = await prisma.blogs.findMany({
      select: {
        slug: true,
        id: true,
      },
    });

    res.status(200).json(data);
  } catch (e) {
    console.error("Request error", e);
    res.status(500).json({ error: "Error fetching posts" });
  }
}
