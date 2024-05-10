import { Request, Response } from 'express';

import { Event } from '@models/event';

export const updateOngEvent = async (req: Request, res: Response) => {
  const { ongId, eventId } = req.params;
  const eventPic = req.file?.filename;
  const hasIds = ongId && eventId;
  const {
    name,
    street,
    city,
    uf,
    latitude,
    longitude,
    date,
    description,
    skills,
    volunteers,
    maxVolunteers,
  } = req.body;

  const parsedSkills = skills.split(',').map((skill: string) => skill.trim());

  if (hasIds) {
    const address = {
      street,
      city,
      uf,
      latitude,
      longitude,
    };

    const eventToUpdate = {
      name,
      address,
      date,
      description,
      requiredSkills: parsedSkills,
      maxVolunteers,
      eventPic,
      volunteers,
    };

    if (eventPic) {
      eventToUpdate.eventPic = eventPic;
    }

    await Event.findByIdAndUpdate(eventId, eventToUpdate, { new: true });

    const eventWithPopulatedData = await Event.findById(eventId).populate([
      { path: 'requiredSkills', populate: { path: 'category' } },
      { path: 'volunteers' },
    ]);

    return res.status(200).json(eventWithPopulatedData);
  }

  return res.status(404).send({ error: 'Error: ONG or Event not found' });
};
