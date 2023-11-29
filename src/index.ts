import express, { Response } from 'express';
import 'dotenv/config';

const PORT = process.env.PORT ?? 3000;
const app = express();

app.get('/api', (_, res: Response) => {
  res.json({ message: "I'm alive!" });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}/api`);
});
