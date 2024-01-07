import 'express-async-errors';
import http from 'http';
import express from 'express';
import router from './routers';
import cors from 'cors';
import { errorMiddleware } from './middleware/errorMiddleware';

const app = express();
const server = http.createServer(app);
server.timeout = 10000; // request timeout in milliseconds

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.json());
app.use(cors());
app.use(router);

app.use(errorMiddleware);

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running in PORT ${PORT}`));
