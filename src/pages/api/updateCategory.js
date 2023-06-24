import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { name, id } = req.body;

  try {
    const deleteCategory = await prisma.categories.update({
      where: { id: parseInt(id) },
      data: { name },
    });

    res.status(200).json({ message: deleteCategory });
  } catch (error) {
    console.error("Error updating category", error);
    res.status(500).json({ error: "Error updating category" });
  } finally {
    await prisma.$disconnect(); // Disconnect from the database
  }
}
