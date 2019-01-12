import { Game as GameRepository } from '../games/game.model';

export const roundResolvers = {
  Mutation: {
    addRoundToGame: async (_, { input }) => {
      let game: any = await GameRepository.findById(input.gameId);
      if (!game) {
        return null;
      }
      input.roundNumber = game.rounds.length + 1;
      input.scores = [];
      game.rounds.push(input);
      game = await GameRepository.findByIdAndUpdate(game.id, game);
      return game;
    },
    deleteRound: async (_, { id, gameId }) => {
      let game: any = await GameRepository.findById(gameId);
      if (!game) {
        return null;
      }

      const foundIndex = game.rounds.findIndex(x => x.id === id);
      if (foundIndex > -1) {
        game.rounds.foreach((round, index, array) => {
          if(index > foundIndex) {
            array[index].roundNumber--;
          }
        });
        game.rounds.splice(foundIndex, 1);
        game = await GameRepository.findByIdAndUpdate(game.id, game);
      }

      return game;
    },
    updateRound: async (_, { id, input }) => {
      let game: any = await GameRepository.findById(input.gameId);
      if (!game) {
        return null;
      }
      const foundIndex = game.rounds.findIndex(x => x.id === id);
      if (foundIndex > -1) {
        const round = game.rounds[foundIndex];
        round.scores = input.scores;
        game.rounds[foundIndex] = round;
        game = await GameRepository.findByIdAndUpdate(game.id, game);
      }
      return game;
    },
  }
};
