import prisma from "../../../lib/prisma";
const { v4, v5 } = require("uuid");

export default async function handler(req, res) {
  const {
    thumbnail,
    title,
    slug,
    description,
    category,
    metaTitle,
    metaDescription,
    tags,
  } = req.body;
  // Perform field validation
  if (
    !thumbnail ||
    !title ||
    !slug ||
    !description ||
    !category ||
    !metaTitle ||
    !metaDescription ||
    !tags ||
    !Array.isArray(tags) ||
    tags.length === 0
  )
    return res.status(400).json({ error: "Invalid field values" });

  try {
    const MY_NAMESPACE = v4(); // generate a random namespace UUID from v4()

    const uuid = v5(process.env.JWT_SECRET, MY_NAMESPACE); // generate a uuid from v5(name, namespace)

    const newBlog = await prisma.blogs.create({
      data: {
        UID: uuid,
        createdAt: new Date(),
        updatedAt: new Date(),
        thumbnail,
        title,
        slug,
        description,
        category,
        metaTitle,
        metaDescription,
        tags: {
          // Map the tags received from the client to connectOrCreate objects
          connectOrCreate: tags.map((tagName) => ({
            where: { name: tagName },
            create: { name: tagName },
          })),
        },
      },
      include: {
        tags: true, // Include the associated tags in the response
      },
    });

    res.status(201).json(newBlog);
  } catch (e) {
    console.error("Request error", e);
    res.status(500).json({ error: "Error creating posts" });
  } finally {
    await prisma.$disconnect(); // Disconnect from the database
  }
}
