import { Request, Response } from 'express';

import { Ong } from '@models/ong';

import { removePhoto } from '@utils/removePhoto';

export const removeOng = async (req: Request, res: Response) => {
  const { ongId } = req.params;

  const ong = await Ong.findById(ongId);

  if (ong) {
    await Ong.findByIdAndDelete(ongId);
    removePhoto(ong.profilePic);
    return res.sendStatus(204);
  } else {
    return res.status(404).send({ error: 'Error: ONG not found' });
  }
};
