import express from 'express';
import cors from 'cors';
import leadRoutes from './routes/lead.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(leadRoutes);

app.get('/', (req, res) => {
  res.send('API is running 🚀');
});

export default app;
