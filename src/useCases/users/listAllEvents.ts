import { Request, Response } from 'express';
import { Types } from 'mongoose';

import { Ong } from '@models/ong';

export const listAllEvents = async (_req: Request, res: Response) => {
  const ongs = await Ong.find().populate({
    path: 'events',
    populate: [
      { path: 'requiredSkills', populate: { path: 'category' } },
      { path: 'volunteers' },
    ],
  });

  if (ongs) {
    const allEvents = ongs.reduce((acc: Types.ObjectId[], ong) => {
      if (ong.events && ong.events.length > 0) {
        acc.push(...ong.events);
      }
      return acc;
    }, []);

    return res.status(200).json(allEvents);
  }

  return res
    .status(500)
    .json({ error: 'Failed to fetch events from all ONGs.' });
};
