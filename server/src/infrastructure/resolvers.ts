import { gameResolvers } from './games/game.resolvers';
import { playerResolvers } from './players/player.resolvers';
import { roundResolvers } from './rounds/round.resolvers';
import { scoreResolvers } from './scores/score.resolvers';

export default [
  gameResolvers,
  playerResolvers,
  roundResolvers,
  scoreResolvers,
];
