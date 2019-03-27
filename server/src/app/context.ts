import eventListener from '../app/eventListener';
import { gamesByIdsLoader, gamesByPlayerIdsLoader, gamesByRoundIdsLoader, gamesByShareIdsLoader, IGamesLoader } from '../infrastructure/games/game.loader';
import { Game } from '../infrastructure/games/game.model';
import { GameService, IGameService } from '../infrastructure/games/game.service';
import { userLoader } from '../infrastructure/users/user.loader';
import { IContext } from '../types/graphql';

export default class ScorekeeprContext implements IContext {
  public gameService: IGameService;
  public userLoader = userLoader();

  constructor() {
    const gamesLoader = {
      byId: gamesByIdsLoader(this),
      byPlayerId: gamesByPlayerIdsLoader(this),
      byRoundId: gamesByRoundIdsLoader(this),
      byShareId: gamesByShareIdsLoader(this),
    }
    this.gameService = new GameService(gamesLoader, eventListener, Game);
  }
}
