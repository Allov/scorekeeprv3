import DataLoader from 'dataloader';
import { IGameRepository } from './game.repository';
import { IGame } from './game.types';

type BatchGamesByIds = (ids: string[], gameRepository: IGameRepository) => Promise<IGame[]>;

const batchGamesByIds: BatchGamesByIds = async (ids, gameRepository) => {
  const games = await gameRepository.getByIds(ids);

  const gameMap: { [key: string]: IGame } = {};
  games.forEach(game => {
    gameMap[game.id] = game;
  });
  return ids.map(id => gameMap[id]);
};

type BatchGamesByShareId = (shareIds: string[], gameRepository: IGameRepository) => Promise<IGame[]>;

const batchGamesByShareIds: BatchGamesByShareId = async (shareIds, gameRepository) => {
  const games = await gameRepository.search({ shareIds });

  const gameMap: { [key: string]: IGame } = {};
  games.forEach(game => {
    gameMap[game.shareId] = game;
  });

  return shareIds.map(id => gameMap[id]);
}

type BatchGamesByPlayerId = (playerIds: string[], gameRepository: IGameRepository) => Promise<IGame[]>;

const batchGamesByPlayerIds: BatchGamesByPlayerId = async (playerIds, gameRepository) => {
  const games = await gameRepository.search({ playerIds });

  const gameMap: { [key: string]: IGame } = {};
  games.forEach(game => {
    game.players.forEach(player => {
      gameMap[player.id] = game;
    });
  });

  return playerIds.map(id => gameMap[id]);
}

type BatchGamesByRoundId = (roundIds: string[], gameRepository: IGameRepository) => Promise<IGame[]>;

const batchGamesByRoundIds: BatchGamesByRoundId = async (roundIds, gameRepository) => {
  const games = await gameRepository.search({ roundIds });

  const gameMap: { [key: string]: IGame } = {};
  games.forEach(game => {
    game.rounds.forEach(round => {
      gameMap[round.id] = game;
    });
  });

  return roundIds.map(id => gameMap[id]);
}

// inspired by: https://github.com/facebook/dataloader#loading-by-alternative-keys
// humm. How to prevent all this code. Priming seems good ... but there must be a better way to batch prime.
export const gamesByIdsLoader = (gamesLoader:IGamesLoader, gameRepository: IGameRepository) => new DataLoader<string, IGame>(async (ids) => {
  const games = await batchGamesByIds(ids, gameRepository);
  gamesLoader.prime(games);
  return games;
});

export const gamesByShareIdsLoader = (gamesLoader:IGamesLoader, gameRepository: IGameRepository) => new DataLoader<string, IGame>(async (shareIds) => {
  const games = await batchGamesByShareIds(shareIds, gameRepository);
  gamesLoader.prime(games);
  return games;
});

export const gamesByPlayerIdsLoader = (gamesLoader:IGamesLoader, gameRepository: IGameRepository) => new DataLoader<string, IGame>(async (playerIds) => {
  const games = await batchGamesByPlayerIds(playerIds, gameRepository);
  gamesLoader.prime(games);
  return games;
});

export const gamesByRoundIdsLoader = (gamesLoader:IGamesLoader, gameRepository: IGameRepository) => new DataLoader<string, IGame>(async (roundsIds) => {
  const games = await batchGamesByRoundIds(roundsIds, gameRepository);
  gamesLoader.prime(games);
  return games;
});

export interface IGamesLoader {
  getById(id: string): Promise<IGame>;
  getByPlayerId(playerId: string): Promise<IGame>;
  getByRoundId(roundId: string): Promise<IGame>;
  getByShareId(shareId: string): Promise<IGame>;
  clearAll(): void;
  prime(games: IGame[]): void;
}

export class GamesLoader implements IGamesLoader {
  private byId: DataLoader<string, IGame>;
  private byPlayerId: DataLoader<string, IGame>;
  private byRoundId: DataLoader<string, IGame>;
  private byShareId: DataLoader<string, IGame>;

  constructor(gameRepository: IGameRepository) {
    this.byId = gamesByIdsLoader(this, gameRepository);
    this.byPlayerId = gamesByPlayerIdsLoader(this, gameRepository);
    this.byRoundId = gamesByRoundIdsLoader(this, gameRepository);
    this.byShareId = gamesByShareIdsLoader(this, gameRepository);
  }

  public async getById(id: string): Promise<IGame> {
    return await this.byId.load(id);

  }
  public async getByPlayerId(playerId: string): Promise<IGame> {
    return await this.byPlayerId.load(playerId);
  }
  public async getByRoundId(roundId: string): Promise<IGame> {
    return await this.byRoundId.load(roundId);
  }
  public async getByShareId(shareId: string): Promise<IGame> {
    return await this.byShareId.load(shareId);
  }
  public clearAll(): void {
    this.byId.clearAll();
    this.byPlayerId.clearAll();
    this.byRoundId.clearAll();
    this.byShareId.clearAll();
  }
  public prime(games: IGame[]): void {
    for (const game of games) {
      this.byId.prime(game.shareId, game);
      this.byShareId.prime(game.shareId, game);
      game.players.forEach(player => this.byPlayerId.prime(player.id, game));
      game.rounds.forEach(round => this.byRoundId.prime(round.id, game));
    }
  }
}
