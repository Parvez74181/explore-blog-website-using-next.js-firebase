import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { search, page, pageSize } = req.query;
  const parsedPage = parseInt(page);
  const parsedPageSize = parseInt(pageSize);
  try {
    const blogs = await prisma.blogs.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: (parsedPage - 1) * parsedPageSize, // Calculate the number of items to skip. ex: parsedPage is 2 then 2-1 = 1 and finallay parsedPageSize is show many items do I want to show, so 1*parsedPageSize = 1*12 = 12 to skip
      take: parsedPageSize, // Define the number of items to take per page
      where: {
        OR: [
          { title: search },
          { category: search },
          { metaTitle: search },
          { title: { contains: search } },
          { tags: { some: { name: search } } },
          { metaTitle: { contains: search } },
          { metaDescription: { contains: search } },
        ],
      },
    });

    res.status(200).json(blogs);
  } catch (e) {
    console.log("Request error", e);
    res.status(500).json({ error: "Error fetching posts" });
  }
}
