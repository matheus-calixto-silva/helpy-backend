import { Request, Response } from 'express';

import { Ong } from '@models/ong';

export const getOngById = async (req: Request, res: Response) => {
  const { ongId } = req.params;
  const ong = await Ong.findById(ongId).populate({
    path: 'events',
    populate: [
      { path: 'requiredSkills', populate: { path: 'category' } },
      { path: 'volunteers' },
    ],
  });

  if (ong) {
    return res.status(200).json(ong);
  }

  return res.status(404).send({ error: 'Error: ONG not found' });
};
