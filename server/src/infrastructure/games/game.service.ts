import { PubSub } from 'graphql-subscriptions';
import { Events } from '../../app/eventListener';
import { IGamesLoader } from './game.loader';
import { IGameModel } from './game.model';
import { IGameRepository } from './game.repository';
import { IGame, IGameFilterInput, IGameInput } from './game.types';

export interface IGameService {
  getAll(filter: IGameFilterInput): Promise<IGame[]>;
  getById(id: string): Promise<IGame>;
  getByPlayerId(id: string): Promise<IGame>;
  getByRoundId(id: string): Promise<IGame>;
  getByShareId(id: string): Promise<IGame>;
  createGame(input: IGameInput): Promise<IGame>;
  updateGame(id: string, input: any, returnNew?: boolean, publish?: boolean): Promise<IGameModel>;
  publishGame(game: IGame): Promise<void>;
  deleteGame(id: string): Promise<boolean>;
}

export class GameService implements IGameService {
  private readonly gamesLoader: IGamesLoader;
  private readonly eventListener: PubSub;
  private readonly gameRepository: IGameRepository;

  constructor(
    gamesLoader: IGamesLoader,
    eventListener: PubSub,
    gameRepository: IGameRepository
  ) {
    this.gamesLoader = gamesLoader;
    this.eventListener = eventListener;
    this.gameRepository = gameRepository;
  }

  public async getAll(filter: IGameFilterInput): Promise<IGame[]> {
    return await this.gameRepository.getAll(filter);
  }

  public async getById(id: string): Promise<IGame> {
    const games = await this.gamesLoader.getById(id);
    return games;
  }

  public async getByPlayerId(id: string): Promise<IGame> {
    return await this.gamesLoader.getByPlayerId(id);
  }

  public async getByRoundId(id: string): Promise<IGame> {
    return await this.gamesLoader.getByRoundId(id);
  }

  public async getByShareId(id: string): Promise<IGame> {
    return await this.gamesLoader.getByShareId(id);
  }

  public async createGame(input: IGameInput): Promise<IGame> {
    return await this.gameRepository.create(input);
  }

  public async updateGame(id: string, input: any, returnNew: boolean = false, publish: boolean = true): Promise<IGameModel> {
    const updatedGame = await this.gameRepository.update(id, input, returnNew);

    const game = returnNew ? updatedGame : input;

    this.gamesLoader.clearAll();

    if (publish) {
      await this.publishGame(game);
    }

    return game;
  }

  public async publishGame(game: IGame) {
    await this.eventListener.publish(Events.GameUpdated, { gameUpdated: game, shareId: game.shareId });
  }

  public async deleteGame(id: string): Promise<boolean> {
    return await this.gameRepository.delete(id);
  }
}
