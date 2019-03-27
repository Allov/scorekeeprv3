import {
  gamesByIdsLoaderMock,
  gamesByPlayerIdsLoaderMock,
  gamesByRoundIdsLoaderMock,
  gamesByShareIdsLoaderMock,
} from 'infrastructure/games/tests/game.loader.mock';
import eventListener from '../../app/eventListener';
import { Game } from '../../infrastructure/games/game.model';
import { GameService, IGameService } from '../../infrastructure/games/game.service';
import { userLoaderMock } from '../../infrastructure/users/tests/user.loader.mock';
import { IContext } from '../../types/graphql';

export default class ScorekeeprContextMock implements IContext {
  public gameService: IGameService;
  public userLoader = userLoaderMock();

  constructor() {
    const gamesLoader = {
      byId: gamesByIdsLoaderMock(this),
      byPlayerId: gamesByPlayerIdsLoaderMock(this),
      byRoundId: gamesByRoundIdsLoaderMock(this),
      byShareId: gamesByShareIdsLoaderMock(this),
    }
    this.gameService = new GameService(gamesLoader, eventListener, Game);
  }
}
