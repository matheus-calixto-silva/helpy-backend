import { Router } from 'express';

import { createOng } from '../useCases/ongs/createOng';
import { createOngEvent } from '../useCases/ongs/createOngEvent';
import { getOngById } from '../useCases/ongs/getOngById';
import { getOngEventById } from '../useCases/ongs/getOngEventById';
import { listEventsByOng } from '../useCases/ongs/listEventsByOng';
import { listOngs } from '../useCases/ongs/listOngs';
import { removeOng } from '../useCases/ongs/removeOng';
import { removeOngEvent } from '../useCases/ongs/removeOngEvent';
import { updateOng } from '../useCases/ongs/updateOng';
import { updateOngEvent } from '../useCases/ongs/updateOngEvent';

import { auth } from '../middlewares/autheticationMiddleware';
import { upload } from '../utils/helpers';

export const ongsRouter = Router();

ongsRouter.get('/ongs', auth, listOngs);

ongsRouter.get('/ongs/:ongId', auth, getOngById);

ongsRouter.put('/ongs/:ongId', auth, updateOng);

ongsRouter.get('/ongs/:ongId/events', auth, listEventsByOng);

ongsRouter.patch(
  '/ongs/:ongId/events',
  auth,
  upload.single('photo'),
  createOngEvent
);

ongsRouter.patch(
  '/ongs/:ongId/events/:eventId/:action',
  auth,
  upload.single('photo'),
  (req, res) => {
    const action = req.params.action;

    if (action === 'update') {
      updateOngEvent(req, res);
    } else if (action === 'delete') {
      removeOngEvent(req, res);
    } else {
      res.status(400).json({ message: 'Invalid action' });
    }
  }
);

ongsRouter.get('/ongs/:ongId/events/:eventId', auth, getOngEventById);

ongsRouter.post('/ongs', upload.single('photo'), createOng);

ongsRouter.delete('/ongs/:ongId', auth, removeOng);
