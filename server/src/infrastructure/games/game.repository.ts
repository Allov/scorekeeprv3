import { PubSub } from 'graphql-subscriptions';
import { Model } from 'mongoose';
import { Events } from '../../app/eventListener';
import { IGamesLoader } from './game.loader';
import { IGameModel } from './game.model';
import { IGame, IGameFilterInput, IGameInput } from './game.types';

export interface IGameRepository {
  gamesLoader: IGamesLoader;
  eventListener: PubSub;
  games: Model<IGameModel, {}>;
  getAll(filter: IGameFilterInput): Promise<IGameModel[]>;
  getById(id: string): Promise<IGame>;
  getByPlayerId(id: string): Promise<IGame>;
  getByRoundId(id: string): Promise<IGame>;
  getByShareId(id: string): Promise<IGame>;
  createGame(input: IGameInput): Promise<IGameModel>;
  updateGame(id: string, input: any, returnNew?: boolean): Promise<IGameModel>;
  deleteGame(id: string): Promise<boolean>;
  prime(game: IGame[]): void;
}

export class GameRepository implements IGameRepository {
  public gamesLoader: IGamesLoader;
  public eventListener: PubSub;
  public games: Model<IGameModel, {}>;

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

  public async updateGame(id: string, input: any, returnNew: boolean = false): Promise<IGameModel> {
    const updatedGame = await this.games.findByIdAndUpdate(id, input, { new: returnNew });
    this.eventListener.publish(Events.GameUpdated, { gameUpdated: updatedGame, shareId: updatedGame.shareId });
    return updatedGame;
  }

  public async deleteGame(id: string): Promise<boolean> {
    await this.games.findByIdAndRemove(id);
    return true;
  }

  public prime(games: IGame[]): void {
    for(const game of games) {
      this.gamesLoader.byId.prime(game.shareId, game);
      this.gamesLoader.byShareId.prime(game.shareId, game);
      game.players.forEach(player => this.gamesLoader.byPlayerId.prime(player.id, game));
      game.rounds.forEach(round => this.gamesLoader.byRoundId.prime(round.id, game));
    }
  }
}
