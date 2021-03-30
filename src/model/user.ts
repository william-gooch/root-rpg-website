import { Campaign } from "./campaign";

export interface User {
  email: string;
  username: string;
  campaigns: Campaign[];
}
