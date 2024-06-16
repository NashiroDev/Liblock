import { jwtVerify } from 'jose/jwt/verify';

export async function getUserIdFromToken(token) {
  try {
    const { payload } = await jwtVerify(token, {
      issuer: 'urn:example:issuer',
      audience: 'urn:example:audience',
    });
    return payload.userId;
  } catch (error) {
    // Handle invalid or expired token
    console.log(error, 'biwa');
    return null;
  }
}

export async function getUserNameFromToken(token) {
  try {
    const { payload } = await jwtVerify(token, {
      issuer: 'urn:example:issuer',
      audience: 'urn:example:audience',
    });
    return payload.name;
  } catch (error) {
    // Handle invalid or expired token
    console.log(error, 'wabi');
    return null;
  }
}