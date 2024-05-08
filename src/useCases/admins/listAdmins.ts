import { Request, Response } from 'express';

import { Admin } from '@models/admin';

export const listAdmins = async (_req: Request, res: Response) => {
  const admins = await Admin.find();

  return res.status(200).json(admins);
};
