import jwt from 'jsonwebtoken';

const JWT_SECRET = 'hgqe45h654g65df5h5h55fd6fh12ez657hf5';

export function getUserIdFromToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.userId;
  } catch (error) {
    // Handle invalid or expired token
    return null;
  }
}

export function getUserNameFromToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.name;
  } catch (error) {
    // Handle invalid or expired token
    return null;
  }
}