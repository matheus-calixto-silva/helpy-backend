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
import { getOngEventById } from '../useCases/ongs/getOngEventById';
import { updateOngEvent } from '../useCases/ongs/updateOngEvent';

import { auth } from '../utils/middleware';
import { upload } from '../utils/helpers';

export const ongsRouter = Router();

ongsRouter.get('/ongs', auth, listOngs);

ongsRouter.get('/ongs/:ongId', auth, getOngById);

ongsRouter.put('/ongs/:ongId', auth, updateOng);

ongsRouter.get('/ongs/:ongId/events', auth, listEventsByOng);

ongsRouter.patch('/ongs/:ongId/events', auth, upload.single('photo'), createOngEvent);

ongsRouter.patch('/ongs/:ongId/events/:eventId', auth, upload.single('photo'), updateOngEvent);

ongsRouter.get('/ongs/:ongId/events/:eventId', auth, getOngEventById);

ongsRouter.patch('/ongs/:ongId/events/:eventId', auth, removeOngEvent);

ongsRouter.patch('/ongs/:ongId/events/:eventId/:userId', auth, addUserToEvent);

ongsRouter.post('/ongs', upload.single('photo'), createOng);

ongsRouter.delete('/ongs/:ongId', auth, removeOng);
