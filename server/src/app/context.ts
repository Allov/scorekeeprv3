import eventListener from '../app/eventListener';
import { GamesLoader } from '../infrastructure/games/game.loader';
import { Game } from '../infrastructure/games/game.model';
import { GameMongooseRepository } from '../infrastructure/games/game.repository';
import { GameService, IGameService } from '../infrastructure/games/game.service';
import { userLoader } from '../infrastructure/users/user.loader';
import { IContext } from '../types/graphql';

export default class ScorekeeprContext implements IContext {
  public gameService: IGameService;
  public userLoader = userLoader();

  constructor() {
    const gameRepository = new GameMongooseRepository(Game);
    const gamesLoader = new GamesLoader(gameRepository);
    this.gameService = new GameService(gamesLoader, eventListener, gameRepository);
  }
}
