import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sequelize from './db.js';
import router from './routes/index.js';
import models from './models/models.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(
        `Server has been started on port:${PORT} \n http://localhost:${PORT}/ \n or http://192.168.0.103:7200 `));
  } catch (e) {
    console.log(e);
  }
};

start();
