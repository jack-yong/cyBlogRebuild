import { RCode } from '../constant/rcode';
export interface Response {
  code?: RCode;
  msg: string;
  data?: any;
}
