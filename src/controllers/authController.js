import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../../../nodejs-basics/src/models/user.js';
import {
  createSession,
  setSessionCookies,
} from '../../../nodejs-basics/src/services/auth.js';
import { Session } from '../../../nodejs-basics/src/models/session.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const isEmailInUse = await User.findOne({ email });
  if (isEmailInUse) {
    throw createHttpError(400, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hashedPassword });

  const newSession = await createSession(newUser._id);

  setSessionCookies(res, newSession);

  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await Session.deleteOne({ userId: user._id });
  const newSession = await createSession(user._id);

  setSessionCookies(res, newSession);

  res.status(200).json(user);
};
