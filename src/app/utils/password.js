import bcrypt from 'bcrypt';

// Hash the password using bcrypt
export const hashPassword = async (password) => {
  const saltRounds = 13; // Number of salt rounds for bcrypt hashing
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};