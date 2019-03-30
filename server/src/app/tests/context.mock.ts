
import eventListener from '../../app/eventListener';
import { GamesLoader } from '../../infrastructure/games/game.loader';
import { GameService, IGameService } from '../../infrastructure/games/game.service';
import { GameMockRepository } from '../../infrastructure/games/tests/game.repository.mock';
import { userLoaderMock } from '../../infrastructure/users/tests/user.loader.mock';
import { IContext } from '../../types/graphql';

export default class ScorekeeprContextMock implements IContext {
  public gameService: IGameService;
  public userLoader = userLoaderMock();

  constructor() {
    const repository = new GameMockRepository();
    const gamesLoader = new GamesLoader(repository);
    this.gameService = new GameService(gamesLoader, eventListener, repository);
  }
}
