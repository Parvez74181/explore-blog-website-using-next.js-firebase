import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    let deleteBlog = await prisma.blogs.delete({
      where: { id: parseInt(id) },
    });

    res.status(201).json(deleteBlog);
  } catch (e) {
    console.error("Error creating category", e);
    res.status(500).json({ error: "Error creating category" });
  } finally {
    await prisma.$disconnect(); // Disconnect from the database
  }
}
