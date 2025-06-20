import { Router } from 'express';
import {
  getAllLeads,
  createLead,
  deleteLead
} from '../controllers/lead.controller';

const router = Router();

router.get('/', getAllLeads);
router.post('/', createLead);
router.delete('/:id', deleteLead);

export default router;
