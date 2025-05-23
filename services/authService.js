import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authModel from '../models/authModel.js';

const register = async (name, email, password, role) => {
  const existingUser = await authModel.findUserByEmail(email);
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await authModel.createUser(name, email, hashedPassword, role);
  return { id: user.id, name: user.name, email: user.email, role: user.role };
};

const login = async (email, password) => {
  const user = await authModel.findUserByEmail(email);
  if (!user) throw new Error('User not found');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Incorrect password');

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};

export default { register, login };
