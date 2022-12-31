import express, { json } from 'express';
import { catchAll } from './3-middleware/error-handle';
import { logRequest } from './3-middleware/log';
import { saturdayForbidden } from './3-middleware/saturday';
import { authRouter } from './6-controllers/auth-controller';
import { cardsRouter } from './6-controllers/cards-controller';
import cors from "cors" 

const server = express();

server.use(cors())
/* server.use(saturdayForbidden);*/ 
server.use(json());
server.use(logRequest);

server.use('/api', cardsRouter);
server.use('/api', authRouter);

server.use(catchAll);

server.listen(3040, () => {
    console.log('Listening on port 3040...');
});