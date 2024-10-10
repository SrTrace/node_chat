'use strict';

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { roomRouter } from './routes/room.route.js';
import { messageRouter } from './routes/message.route.js';

const PORT = process.env.PORT || 3005;
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_HOST,
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.send('Home page');
});

app.use(roomRouter);
app.use(messageRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
