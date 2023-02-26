const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

export default function generateJWT<T extends Record<string, any>>(user: T): string {
  if (typeof user !== 'object' || Array.isArray(user) || user === null) throw new Error('User object must be a plain object');
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string);
  if (!accessToken) throw new Error('Failed to generate JWT token');
  return accessToken;
}
