import { AccentColorType } from './CheatsheetT';
import { CosmosExtrasType } from './Cosmos';

// export type CheaseUser = {
//   id?: string;
//   username: string;
//   email: string;
//   password: string;
// };

export type CheaseGoogleUser = CosmosExtrasType & {
  id?: string;
  username: string;
  email: string;
  image: string;
  cheatsheetNames: string[];
};

export type CheaseUserProfile = {
  id: string;
  email: string;
  username: string;
  about?: string;
  password: string;
  accentColor: AccentColorType;
};

export type DatabaseResult = {
  result: boolean;
  data: any;
};
