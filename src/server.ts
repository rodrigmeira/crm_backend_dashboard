import express from 'express';
import cors from 'cors';

import leadRouter from './routes/lead.routes';
import projectRouter from './routes/project.routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/leads', leadRouter);
app.use('/api/projects', projectRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
