import express from 'express';
import 'dotenv/config';
import todoRoutes from './routes/todos.routes';

const PORT = process.env.PORT ?? 3000;
const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/api/todos`);
});
