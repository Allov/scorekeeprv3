export interface IScore {
  id?: any;
  playerId: string;
  points: number;
}

export interface IScoresInput {
  roundId: string;
  scores: IScoreInput[];
  gameId: string;
}

export interface IScoreInput {
  playerId: string;
  points: number;
}
