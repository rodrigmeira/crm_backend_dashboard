import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getAllLeads = async (req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({
      include: { project: true }
    });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar leads' });
  }
};

export const createLead = async (req: Request, res: Response) => {
  const { name, email, phone, company, origin, status, projectId } = req.body

  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        company,
        origin,
        status,
        projectId,
      },
    })

    res.status(201).json(lead)
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar lead" })
  }
}


export const deleteLead = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.lead.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar lead' });
  }
};
