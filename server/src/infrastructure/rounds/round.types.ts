import { IScore, IScoreInput } from 'infrastructure/scores/score.types';

export interface IRound {
  id?: any;
  roundNumber: number;
  scores: IScore[];
}

export interface IRoundInput {
  gameId: string;
  scores: IScoreInput[];
  roundNumber: number;
}

export interface IRoundFilter {
  roundNumber: number;
}
