export interface IScore {
  id?: any;
  playerId: string;
  points: number;
}

export interface IScoreFilterInput {
  roundId: string;
  gameId: string;
}

export interface IScoresInput {
  scores: IScoreInput[];
  filter: IScoreFilterInput;
}

export interface IScoreInput {
  playerId: string;
  points: number;
}
