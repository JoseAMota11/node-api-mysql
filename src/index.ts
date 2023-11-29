import express from 'express';
import 'dotenv/config';
import route from './routes/todos.routes';

const PORT = process.env.PORT ?? 3000;
const app = express();

app.use('/api/todos', route);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/api/todos`);
});
