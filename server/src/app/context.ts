import { gamesByIdsLoader, gamesByPlayerIdsLoader, gamesByRoundIdsLoader, gamesByShareIdsLoader, IGamesLoader } from '../infrastructure/games/game.loader';
import { userLoader } from '../infrastructure/users/user.loader';
import { IContext } from '../types/graphql';

export default class ScorekeeprContext implements IContext {
  public gamesLoader?: IGamesLoader = null;
  public userLoader = userLoader();

  constructor() {
    this.gamesLoader = {
      byId: gamesByIdsLoader(this),
      byPlayerId: gamesByPlayerIdsLoader(this),
      byRoundId: gamesByRoundIdsLoader(this),
      byShareId: gamesByShareIdsLoader(this),
    }
  }
}
