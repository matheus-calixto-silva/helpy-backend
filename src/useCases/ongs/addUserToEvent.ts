import { Request, Response } from 'express';

import { User } from '../../models/user';
import { Event } from '../../models/event';
import { Ong } from '../../models/ong';

import { IUser } from '../../types';
import { IEvent } from '../../types';
import { IOng } from '../../types';


const checkMaxVolunteers = (event: IEvent) => {
  return event.volunteers.length === event.maxVolunteers;
};

const checkIfUserIsAlredyRegistered = (user: IUser, event: IEvent) => {
  const convertedVonluteersId = event.volunteers.map(volunteer => volunteer.toString());
  const userId = user._id;

  return convertedVonluteersId.find(volunteer => volunteer === userId);
};

const checkIfUserHasRequiredSkill = (user: IUser, event: IEvent) => {
  const convertedRequiredSkills = event.requiredSkills.map(skill => skill.toString());
  const allUserSkillsIds = user.skills.map(skill => skill._id.toString());

  return allUserSkillsIds.some(skill => convertedRequiredSkills.includes(skill));
};

export const addUserToEvent = async (req: Request, res: Response) => {
  const { ongId, eventId, userId } = req.params;

  const ong = await Ong.findById(ongId) as IOng;
  const event = await Event.findById(eventId) as IEvent;
  const user = await User.findById(userId) as IUser;

  if (ong && event && user) {

    if (checkMaxVolunteers(event)) {
      return res.status(401).json({ error: 'Event is full' });
    }

    if (!checkIfUserHasRequiredSkill(user, event)) {
      return res.status(401).json({ error: 'User do not have required skills to this event' });
    }

    if (checkIfUserIsAlredyRegistered(user, event)) {
      return res.status(401).json({ error: 'User is alredy registered to this event' });
    }

    const updatedOngVolunteers = [...event.volunteers, user._id];
    await Event.findByIdAndUpdate(eventId, { volunteers: updatedOngVolunteers }, { new: true });

    const ongWithPopulatedData = await Ong.findById(ongId).populate({
      path: 'events',
      populate: { path: 'requiredSkills' }
    });

    return res.status(200).json(ongWithPopulatedData?.events);
  } else {
    return res.status(404).json({ error: 'Ong, Event or User not found' });
  }
};


