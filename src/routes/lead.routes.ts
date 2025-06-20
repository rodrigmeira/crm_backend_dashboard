import { Router } from 'express';
import {
  getAllLeads,
  createLead,
  deleteLead
} from '../controllers/lead.controller';

const router = Router();

router.get('/leads', getAllLeads);
router.post('/leads', createLead);
router.delete('/leads/:id', deleteLead);

export default router;
