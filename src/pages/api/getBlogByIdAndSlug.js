import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { slug, id } = req.query;

  try {
    const blogs = await prisma.blogs.findFirst({
      where: {
        slug,
        id: parseInt(id), // Parse the id as an integer
      },
    });

    const categories = await prisma.categories.findMany();

    res.status(200).json({ blogs, categories });
  } catch (e) {
    console.log("Request error", e);
    res.status(500).json({ error: "Error fetching posts" });
  }
}
