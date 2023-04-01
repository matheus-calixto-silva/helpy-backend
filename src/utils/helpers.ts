import path from 'node:path';
import bcrypt from 'bcrypt';
import multer from 'multer';

export const genNewPasswordHash = (newPassword: string) => {
  const saltRounds = 10;
  const passwordHash = bcrypt.hash(newPassword, saltRounds);

  return passwordHash;
};

export const upload = multer({
  storage: multer.diskStorage({
    destination(_req, _file, callback) {
      callback(null, path.resolve('uploads'));
    },
    filename(_req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }
  ),
});
