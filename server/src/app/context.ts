import eventListener from '../app/eventListener';
import { gamesByIdsLoader, gamesByPlayerIdsLoader, gamesByRoundIdsLoader, gamesByShareIdsLoader, IGamesLoader } from '../infrastructure/games/game.loader';
import { Game } from '../infrastructure/games/game.model';
import { GameRepository, IGameRepository } from '../infrastructure/games/game.repository';
import { userLoader } from '../infrastructure/users/user.loader';
import { IContext } from '../types/graphql';

export default class ScorekeeprContext implements IContext {
  public gameRepository: IGameRepository;
  public userLoader = userLoader();

  constructor() {
    const gamesLoader = {
      byId: gamesByIdsLoader(this),
      byPlayerId: gamesByPlayerIdsLoader(this),
      byRoundId: gamesByRoundIdsLoader(this),
      byShareId: gamesByShareIdsLoader(this),
    }
    this.gameRepository = new GameRepository(gamesLoader, eventListener, Game);
  }
}
