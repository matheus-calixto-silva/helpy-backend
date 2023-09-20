import { Request, Response } from 'express';

import { Event } from '../../models/event';

export const getOngEventById = async (req: Request, res: Response) => {
  const { eventId } = req.params;

  try {
    const foundEvent = await Event.findById(eventId).populate([
      { path: 'requiredSkills', populate: { path: 'category' } },
      { path: 'volunteers' }
    ]);

    if (foundEvent) {
      return res.status(200).json(foundEvent);
    } else {
      return res.status(404).json({ error: 'Event not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred while searching for the event' });
  }
};
