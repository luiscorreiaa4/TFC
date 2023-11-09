import { sign, verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'fallen';

type Payload = {
  email: string;
  password: string;
};

const fSign = (payload: Payload) => sign(payload, secret);

function fVerify(token: string): Payload | null {
  try {
    const data = verify(token, secret) as Payload;
    return data;
  } catch {
    return null;
  }
}

export default {
  fSign,
  fVerify,
};
