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

export const pilotRankTranslations = {
  PROBATIONARY_PILOT: 'Piloto Probatório',
  PILOT: 'Piloto',
  EXPERIENCED_PILOT: 'Piloto Experiente',
  SENIOR_PILOT: 'Piloto Sênior',
  VETERAN_PILOT: 'Piloto Veterano',
  SUB_COMMAND: 'Subcomando',
  COMMAND: 'Comando',
};

export type AuthResponse = {
  user: User;
  accessToken: string;
};