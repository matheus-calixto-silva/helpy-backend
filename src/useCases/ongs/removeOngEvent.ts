import { Request, Response } from 'express';

import { Ong } from '../../models/ong';
import { Event } from '../../models/event';

export const removeOngEvent = async (req: Request, res: Response) => {
  const { ongId, eventId } = req.params;

  const eventToRemove = await Event.findById(eventId);

  if (eventToRemove) {
    const ong = await Ong.findById(ongId);
    const filteredOngEvents = ong?.events.filter(event => event._id !== eventToRemove._id);

    await Event.findByIdAndDelete(eventId);
    await Ong.findByIdAndUpdate(ongId, { events: filteredOngEvents }, { new: true });

    const updatedOng = await Ong.findById(ongId).populate({
      path: 'events',
      populate: [
        { path: 'requiredSkills', populate: { path: 'category' } },
        { path: 'volunteers' }
      ]
    });

    return res.status(200).json(updatedOng?.events);
  } else {
    return res.status(500).send({ error: 'Internal server error' });
  }
};
