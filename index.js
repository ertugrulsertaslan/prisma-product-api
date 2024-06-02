import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const { title, description, price } = req.body;
  const newProduct = await prisma.product.create({
    data: {
      title,
      description,
      price,
    },
  });
  res.json(newProduct);
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;
  const updateProduct = await prisma.product.update({
    where: { id: Number(id) },
    data: {
      title,
      description,
      price,
    },
  });
  res.json(updateProduct);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await prisma.product.delete({
    where: { id: Number(id) },
  });
  res.json(deletedProduct);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
