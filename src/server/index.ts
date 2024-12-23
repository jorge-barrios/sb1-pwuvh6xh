import express from 'express';
import cors from 'cors';
import webhookRouter from './routes/webhook';
import requestsRouter from './routes/requests';
import decideRouter from './routes/decide';

const app = express();
const port = 5173;

app.use(cors());
app.use(express.json());

app.use('/webhook', webhookRouter);
app.use('/requests', requestsRouter);
app.use('/decide', decideRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});