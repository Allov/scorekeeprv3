import gameRepository from '../games/game.model';

export const scoreResolvers = {
  Mutation: {
    addScoresToRound: async (_, { gameId, roundId, input }) => {
      let game: any = await gameRepository.findById(gameId);
      if (!game) {
        return null;
      }
      const roundIndex = game.rounds.findIndex(x => x.id === roundId);
      if(roundIndex > -1) {
        game.rounds[roundIndex].scores = input;
        game.rounds.push(input);
        game = await gameRepository.findByIdAndUpdate(game.id, game);
      }
      return game;
    },
    deleteScore: async (_, { id, gameId, roundId}) => {
      let game: any = await gameRepository.findById(gameId);
      if (!game) {
        return null;
      }

      const roundIndex = game.rounds.findIndex(x => x.id === roundId);
      if (roundIndex > -1) {
        const scoreIndex = game.rounds[roundIndex].scores.findIndex(x => x === id);
        if(scoreIndex > -1){
          game.rounds[roundIndex].splice(scoreIndex,1);
          game = await gameRepository.findByIdAndUpdate(game.id, game);
        }
      }
      return game;
    },
    updateScore: async (_, { id, gameId, roundId, input }) => {
      let game: any = await gameRepository.findById(gameId);
      if (!game) {
        return null;
      }
      const roundIndex = game.rounds.findIndex(x => x.id === roundId);
      if (roundIndex > -1) {
        const scoreIndex = game.rounds.scores.findIndex(x => x.id === id);
        if(scoreIndex > -1){
          game.rounds[roundIndex].scores[scoreIndex] = input;
          game = await gameRepository.findByIdAndUpdate(game.id, game);
        }
      }
      return game;
    },
  }
};
