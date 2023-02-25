const { jwt } = require('jsonwebtoken');

interface DecodedToken {
  [key: string]: any;
}

export default function authenticationJwtToken (
  token: string,
  secret: string
): DecodedToken | null {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded as DecodedToken;
  } catch (err) {
    console.error(`Failed to authenticate JWT token: ${err}`);
    return null;
  }
}
