import { IScore } from 'infrastructure/scores/score.types';

export interface IRound {
  roundNumber: number;
  scores: IScore;
}
