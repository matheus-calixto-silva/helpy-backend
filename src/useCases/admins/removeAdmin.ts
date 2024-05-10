import { Request, Response } from 'express';

import { Admin } from '@models/admin';

import { removePhoto } from '@utils/removePhoto';

export const removeAdmin = async (req: Request, res: Response) => {
  const { adminId } = req.params;

  const admin = await Admin.findById(adminId);

  if (admin) {
    await Admin.findByIdAndDelete(adminId);
    removePhoto(admin.profilePic);

    return res.sendStatus(204);
  }

  return res.status(404).send({ error: 'Admin not found' });
};
