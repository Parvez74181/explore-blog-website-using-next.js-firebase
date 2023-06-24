import prisma from "../../../lib/prisma";
const { v4, v5 } = require("uuid");

export default async function handler(req, res) {
  const { name } = req.body;

  try {
    const MY_NAMESPACE = v4(); // generate a random namespace UUID from v4()
    const uuid = v5(process.env.JWT_SECRET, MY_NAMESPACE); // generate a uuid from v5(name, namespace)

    let newCategory = await prisma.categories.create({
      data: {
        UID: uuid,
        createdAt: new Date(),
        updatedAt: new Date(),
        name,
      },
    });
    res.status(201).json(newCategory);
  } catch (e) {
    console.error("Error creating category", e);
    res.status(500).json({ error: "Error creating category" });
  } finally {
    await prisma.$disconnect(); // Disconnect from the database
  }
}
