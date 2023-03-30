import bcrypt from 'bcrypt';

export const genNewPasswordHash = (newPassword: string) => {
  const saltRounds = 10;
  const passwordHash = bcrypt.hash(newPassword, saltRounds);

  return passwordHash;
};
