const jwt = require('jsonwebtoken');

export default function generateJWT<T extends Record<string, any>>(user: T): string {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string);
  return accessToken;
}
