import express from 'express';
import 'dotenv/config';
import todoRoutes from './routes/todos.routes';
import cors, { CorsOptions } from 'cors';

const PORT = process.env.PORT ?? 3000;
const app = express();

const corsOptions: CorsOptions = {
  origin: process.env.URL_ORIGIN?.split(','),
};

// Middlewares
app.use(cors(corsOptions));

app.disable('x-powered-by');
app.use(express.json());
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/api/todos`);
});
