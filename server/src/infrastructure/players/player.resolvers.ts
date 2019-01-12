import { Game as GameRepository } from '../games/game.model';

export const playerResolvers = {
  Mutation: {
    addPlayerToGame: async (_, { gameId, input }) => {
      let game: any = await GameRepository.findById(gameId);
      if (!game) {
        return null;
      }
      game.players.push(input);
      game = await GameRepository.findByIdAndUpdate(game.id, game, {new: true});
      const player = game.players[game.players.length - 1];

      game.rounds.forEach(async (element, index, array) => {
        game.rounds[index].scores.push({ playerId: player.id, points: 0 });
      });
      game = await GameRepository.findByIdAndUpdate(game.id, game, {new: true});
      return game.players[game.players.length - 1];
    },
    deletePlayer: async (_, { id, gameId }) => {
      let game: any = await GameRepository.findById(gameId);
      if (!game) {
        return null;
      }

      const foundIndex = game.rounds.findIndex(x => x.id === id);
      if (foundIndex > -1) {
        game.players[foundIndex].archived = true;
        game = await GameRepository.findByIdAndUpdate(game.id, game);
      }
      return game;
    },
    updatePlayer: async (_, { id, gameId, input }) => {
      let game: any = await GameRepository.findById(gameId);
      if (!game) {
        return null;
      }
      const foundIndex = game.players.findIndex(x => x.Id === id);
      if (foundIndex > -1) {
        const player = game.players[foundIndex];
        player.name = input.name;
        game.players[foundIndex] = player;
        game = await GameRepository.findByIdAndUpdate(game.id, game);
      }
      return game;
    },
  }
};
