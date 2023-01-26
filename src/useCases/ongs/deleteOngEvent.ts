import { Request, Response } from 'express';

import { Ong } from '../../models/ong';

export const deleteOngEvent = async (req: Request, res: Response) => {
  const { ongId } = req.params;

  const ong = await Ong.findById(ongId);

  res.sendStatus(204);
};
