import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';

export const upload = multer({
  storage: multer.diskStorage({
    destination(_req, _file, callback) {
      callback(null, path.resolve('uploads'));
    },
    filename(_req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

export const removeProfilePic = (profilePicPath: string) => {
  fs.unlink(path.resolve('uploads', profilePicPath), (err: unknown) => {
    if (err instanceof Error) throw err;
    console.log('File deleted!');
  });
};
