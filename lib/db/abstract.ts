/* eslint-disable no-unused-vars */
import { DatabaseResult } from '@/types/Cosmos';
import { CheaseGoogleUser, CheaseUserProfile } from '@/types/User';
import { CheatSheetType } from '@/types/CheatsheetT';

export abstract class AbstractCheaseDatabase<TDatabase> {
  public abstract init(): Promise<DatabaseResult>;
  public abstract getDB(): TDatabase;
  public abstract login(user: CheaseGoogleUser): Promise<DatabaseResult>;
  public abstract getUser(user: CheaseGoogleUser): Promise<DatabaseResult>;
  public abstract getAllCheatsByEmail(email: string): Promise<any>;
  public abstract saveCheatForUser(cheatsheet: CheatSheetType, user: CheaseUserProfile): Promise<any>;
}
