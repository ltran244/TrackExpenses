import jwt from 'jsonwebtoken';

export const signJwt = (payload: object) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: '1h'});
  return token;
}

export const verifyJwt = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    return null;
  }
};