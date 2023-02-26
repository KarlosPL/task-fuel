import jwt from 'jsonwebtoken';

interface DecodedToken {
  [key: string]: any;
}

export default function authenticateJwtToken (
  token: string,
  secret: string
): DecodedToken | null {
  if (!token || !secret) throw new Error('Nie podano wymaganych parametrów');
  try {
    const decoded = jwt.verify(token, secret);
    return decoded as DecodedToken;
  } catch (err) {
    console.error(`Failed to authenticate JWT token: ${err}`);
    return null;
  }
}
