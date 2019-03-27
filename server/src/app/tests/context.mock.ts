import {
  gamesByIdsLoaderMock,
  gamesByPlayerIdsLoaderMock,
  gamesByRoundIdsLoaderMock,
  gamesByShareIdsLoaderMock,
} from 'infrastructure/games/tests/game.loader.mock';
import eventListener from '../../app/eventListener';
import { Game } from '../../infrastructure/games/game.model';
import { GameRepository, IGameRepository } from '../../infrastructure/games/game.repository';
import { userLoaderMock } from '../../infrastructure/users/tests/user.loader.mock';
import { IContext } from '../../types/graphql';

export default class ScorekeeprContextMock implements IContext {
  public gameRepository: IGameRepository;
  public userLoader = userLoaderMock();

  constructor() {
    const gamesLoader = {
      byId: gamesByIdsLoaderMock(this),
      byPlayerId: gamesByPlayerIdsLoaderMock(this),
      byRoundId: gamesByRoundIdsLoaderMock(this),
      byShareId: gamesByShareIdsLoaderMock(this),
    }
    this.gameRepository = new GameRepository(gamesLoader, eventListener, Game);
  }
}
