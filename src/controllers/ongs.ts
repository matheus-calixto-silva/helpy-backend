import path from 'node:path';
import multer from 'multer';
import { Router } from 'express';

import { createOng } from '../useCases/ongs/createOng';
import { listOngs } from '../useCases/ongs/listOngs';
import { removeOng } from '../useCases/ongs/removeOng';
import { listEventsByOng } from '../useCases/ongs/listEventsByOng';
import { createOngEvent } from '../useCases/ongs/createOngEvent';
import { removeOngEvent } from '../useCases/ongs/removeOngEvent';
import { addUserToEvent } from '../useCases/ongs/addUserToEvent';
import { getOngById } from '../useCases/ongs/getOngById';
import { updateOng } from '../useCases/ongs/updateOng';

export const ongsRouter = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve('uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});


ongsRouter.get('/ongs', listOngs);

ongsRouter.get('/ongs/:ongId', getOngById);

ongsRouter.put('/ongs/:ongId', updateOng);

ongsRouter.get('/ongs/:ongId/events', listEventsByOng);

ongsRouter.patch('/ongs/:ongId/events', createOngEvent);

ongsRouter.patch('/ongs/:ongId/events/:eventId', removeOngEvent);

ongsRouter.patch('/ongs/:ongId/events/:eventId/:userId', addUserToEvent);

ongsRouter.post('/ongs', upload.single('photo'), createOng);

ongsRouter.delete('/ongs/:ongId', removeOng);
