import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.body;

  try {
    const deleteCategory = await prisma.categories.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: deleteCategory });
  } catch (error) {
    console.error("Error deleting category", error);
    res.status(500).json({ error: "Error deleting category" });
  } finally {
    await prisma.$disconnect(); // Disconnect from the database
  }
}
