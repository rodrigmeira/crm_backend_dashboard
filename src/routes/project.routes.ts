import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

// Listar todos os projetos
router.get("/", async (req, res) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar projetos" });
  }
});

// Criar um projeto
router.post("/", async (req, res) => {
  const { name, description } = req.body;

  try {
    const project = await prisma.project.create({
      data: { name, description },
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar projeto" });
  }
});

// Buscar projeto por ID
router.get("/:id", async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar projeto" });
  }
});

// Atualizar projeto
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const project = await prisma.project.update({
      where: { id },
      data: { name, description },
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar projeto" });
  }
});

// Deletar projeto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.project.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar projeto" });
  }
});

export default router;
