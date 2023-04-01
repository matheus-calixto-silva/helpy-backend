import { Request, Response } from 'express';
import { Admin } from '../../models/admin';

export const getAdminById = async (req: Request, res: Response) => {
  const { adminId } = req.params;
  const admin = await Admin.findById(adminId);

  if (admin) {
    return res.status(200).json(admin);
  }

  return res.status(404).send({ error: 'Admin not found' });
};
