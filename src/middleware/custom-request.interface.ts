// custom-request.interface.ts

import { Request } from 'express';

interface CustomRequest extends Request {
  userId: string;
  accessToken: string;
  role: string;
}

export default CustomRequest;
