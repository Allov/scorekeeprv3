import { IScore, IScoreInput } from 'infrastructure/scores/score.types';

export interface IRound {
  roundNumber: number;
  scores: IScore;
}

export interface IRoundInput {
  gameId: string;
  scores: IScoreInput[];
  roundNumber: number;

}
