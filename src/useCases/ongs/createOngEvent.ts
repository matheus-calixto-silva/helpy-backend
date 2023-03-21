import { Request, Response } from 'express';

import { Ong } from '../../models/ong';
import { Event } from '../../models/event';

export const createOngEvent = async (req: Request, res: Response) => {
  const { ongId } = req.params;
  const { name, local, date, description, requiredSkills, maxVolunteers } = req.body;

  const parsedSkills = requiredSkills.split(',').filter(Boolean);

  const ong = await Ong.findById(ongId);

  if (ong) {
    const newEvent = {
      name,
      local,
      date,
      description,
      requiredSkills: parsedSkills,
      maxVolunteers,
      volunteers: [],
    };

    const event = await Event.create(newEvent);

    const updatedEvents = ong?.events ? [...ong.events, event._id] : [event._id];

    await Ong.findByIdAndUpdate(ongId, { events: updatedEvents }, { new: true });

    const ongWithPopulatedData = await Ong.findById(ongId).populate({
      path: 'events',
      populate: [
        { path: 'requiredSkills', populate: { path: 'category' } },
        { path: 'volunteers' }
      ]
    });

    return res.status(200).json(ongWithPopulatedData);
  } else {
    return res.status(404).send({ error: 'Error: ONG not found' });
  }
};
