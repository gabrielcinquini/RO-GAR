export type User = {
  id: string;
  fullName: string;
  phone: string;
  internalRole: PilotRank;
}

export enum PilotRank {
  PROBATIONARY_PILOT = 'PROBATIONARY_PILOT',
  PILOT = 'PILOT',
  EXPERIENCED_PILOT = 'EXPERIENCED_PILOT',
  SENIOR_PILOT = 'SENIOR_PILOT',
  VETERAN_PILOT = 'VETERAN_PILOT',
  SUB_COMMAND = 'SUB_COMMAND',
  COMMAND = 'COMMAND',
}

export type AuthResponse = {
  user: User;
  accessToken: string;
};