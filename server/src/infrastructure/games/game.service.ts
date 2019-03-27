import { PubSub } from 'graphql-subscriptions';
import { Model } from 'mongoose';
import sillyname from 'sillyname';
import { Events } from '../../app/eventListener';
import { IGamesLoader } from './game.loader';
import { IGameModel } from './game.model';
import { IGame, IGameFilterInput, IGameInput } from './game.types';

export interface IGameService {
  gamesLoader: IGamesLoader;
  eventListener: PubSub;
  games: Model<IGameModel, {}>;
  getAll(filter: IGameFilterInput): Promise<IGameModel[]>;
  getById(id: string): Promise<IGame>;
  getByPlayerId(id: string): Promise<IGame>;
  getByRoundId(id: string): Promise<IGame>;
  getByShareId(id: string): Promise<IGame>;
  createGame(input: IGameInput): Promise<IGameModel>;
  updateGame(id: string, input: any, returnNew?: boolean, publish?: boolean): Promise<IGameModel>;
  publishGame(game: IGame): Promise<void>;
  deleteGame(id: string): Promise<boolean>;
  prime(games: IGame[]): void;
  clearAll(): void;
}

export class GameService implements IGameService {
  public gamesLoader: IGamesLoader;
  public eventListener: PubSub;
  public games: Model<IGameModel, {}>;
  public name = sillyname();

  constructor(
    gamesLoader: IGamesLoader,
    eventListener: PubSub,
    games: Model<IGameModel, {}>
  ) {
    this.gamesLoader = gamesLoader;
    this.eventListener = eventListener;
    this.games = games;
  }

  public async getAll(filter: IGameFilterInput): Promise<IGameModel[]> {
    return await this.games.find({}, null, filter);
  }

  public async getById(id: string): Promise<IGame> {
    return await this.gamesLoader.byId.load(id);
  }

  public async getByPlayerId(id: string): Promise<IGame> {
    return await this.gamesLoader.byPlayerId.load(id);
  }

  public async getByRoundId(id: string): Promise<IGame> {
    return await this.gamesLoader.byRoundId.load(id);
  }

  public async getByShareId(id: string): Promise<IGame> {
    return await this.gamesLoader.byShareId.load(id);
  }

  public async createGame(input: IGameInput): Promise<IGameModel> {
    return await this.games.create(input);
  }

  public async updateGame(id: string, input: any, returnNew: boolean = false, publish: boolean = true): Promise<IGameModel> {
    const updatedGame = await this.games.findByIdAndUpdate(id, input, { new: returnNew });

    const game = returnNew ? updatedGame : input;

    this.clearAll();

    if (publish) {
      await this.publishGame(game);
    }

    return game;
  }

  public async publishGame(game: IGame) {
    await this.eventListener.publish(Events.GameUpdated, { gameUpdated: game, shareId: game.shareId });
  }

  public async deleteGame(id: string): Promise<boolean> {
    await this.games.findByIdAndRemove(id);
    return true;
  }

  public prime(games: IGame[]): void {
    for (const game of games) {
      this.gamesLoader.byId.prime(game.shareId, game);
      this.gamesLoader.byShareId.prime(game.shareId, game);
      game.players.forEach(player => this.gamesLoader.byPlayerId.prime(player.id, game));
      game.rounds.forEach(round => this.gamesLoader.byRoundId.prime(round.id, game));
    }
  }

  public clearAll(): void {
    this.gamesLoader.byId.clearAll();
    this.gamesLoader.byShareId.clearAll();
    this.gamesLoader.byPlayerId.clearAll();
    this.gamesLoader.byRoundId.clearAll();
  }
}
