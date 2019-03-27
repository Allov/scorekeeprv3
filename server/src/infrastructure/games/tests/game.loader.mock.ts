import DataLoader from 'dataloader';
import { IContext } from 'types/graphql';
import { IGame } from '../game.types';


export const mockGames: IGame[] = [
  {
    createdBy: 'fakeUserIdA',
    id: 'fakeIdA',
    name: 'fakeNameA',
    players: [
      {
        archived: false,
        id: 'fakePlayerId1A',
        name: 'fakePlayerName1A'
      },
      {
        archived: false,
        id: 'fakePlayerId2A',
        name: 'fakePlayerName2A'
      },
      {
        archived: true,
        id: 'fakePlayerId3A',
        name: 'fakePlayerName3A'
      }
    ],
    rounds: [
      {
        id: 'fakeRoundId1A',
        roundNumber: 1,
        scores: [
          {
            id: 'fakeScore1A',
            playerId: 'fakePlayerId1A',
            points: 3,
          },
          {
            id: 'fakeScore2A',
            playerId: 'fakePlayerId2A',
            points: 6,
          },
        ],
      },
      {
        id: 'fakeRoundId2A',
        roundNumber: 2,
        scores: [
          {
            id: 'fakeScore3A',
            playerId: 'fakePlayerId1A',
            points: 4,
          },
          {
            id: 'fakeScore4A',
            playerId: 'fakePlayerId2A',
            points: 7,
          },
        ],
      },
    ],
    shareId: 'fakeShareIdA',
  },
  {
    createdBy: 'fakeUserIdB',
    id: 'fakeIdB',
    name: 'fakeNameB',
    players: [
      {
        archived: false,
        id: 'fakePlayerId1B',
        name: 'fakePlayerName1B'
      },
      {
        archived: false,
        id: 'fakePlayerId2B',
        name: 'fakePlayerName2B'
      },
      {
        archived: true,
        id: 'fakePlayerId3B',
        name: 'fakePlayerName3B'
      }
    ],
    rounds: [
      {
        id: 'fakeRoundId1B',
        roundNumber: 1,
        scores: [
          {
            id: 'fakeScore1B',
            playerId: 'fakePlayerId1B',
            points: 3,
          },
          {
            id: 'fakeScore2B',
            playerId: 'fakePlayerId2B',
            points: 6,
          },
        ],
      },
      {
        id: 'fakeRoundId2B',
        roundNumber: 2,
        scores: [
          {
            id: 'fakeScore3B',
            playerId: 'fakePlayerId1B',
            points: 4,
          },
          {
            id: 'fakeScore4B',
            playerId: 'fakePlayerId2B',
            points: 7,
          },
        ],
      },
    ],
    shareId: 'fakeShareIdB',
  },
];

type BatchGamesByIds = (ids: string[]) => Promise<IGame[]>;

const batchGamesByIds: BatchGamesByIds = async (ids) => {
  const games = await mockGames.filter(x => ids.includes(x.id));

  const gameMap : { [key: string]: IGame } = {};
  games.forEach(game => {
    gameMap[game.id] = game;
  });

  return ids.map(id => gameMap[id]);
};

type BatchGamesByShareId = (shareIds: string[]) => Promise<IGame[]>;

const batchGamesByShareIds: BatchGamesByShareId = async (shareIds) => {
  const games = await mockGames.filter(x => shareIds.includes(x.shareId));

  const gameMap : { [key: string]: IGame } = {};
  games.forEach(game => {
    gameMap[game.shareId] = game;
  });

  return shareIds.map(id => gameMap[id]);
}

type BatchGamesByPlayerId = (playerIds: string[]) => Promise<IGame[]>;

const batchGamesByPlayerIds: BatchGamesByPlayerId = async (playerIds) => {

  const games = mockGames.filter(game => game.players.some(player => playerIds.includes(player.id)));

  const gameMap : { [key: string]: IGame } = {};
  games.forEach(game => {
    game.players.forEach(player => {
      gameMap[player.id] = game;
    });
  });

  return playerIds.map(id => gameMap[id]);
}

type BatchGamesByRoundId = (roundIds: string[]) => Promise<IGame[]>;

const batchGamesByRoundIds: BatchGamesByRoundId = async (roundIds) => {
  const games = mockGames.filter(game => game.rounds.some(round => roundIds.includes(round.id)));

  const gameMap : { [key: string]: IGame } = {};
  games.forEach(game => {
    game.rounds.forEach(round => {
      gameMap[round.id] = game;
    });
  });

  return roundIds.map(id => gameMap[id]);
}

export const gamesByIdsLoaderMock = (context: IContext) => new DataLoader<string, IGame>(async (ids) => {
  const games = await batchGamesByIds(ids);

  context.gameService.prime(games);

  return games;
});

export const gamesByShareIdsLoaderMock = (context: IContext) => new DataLoader<string, IGame>(async (shareIds) => {
  const games = await batchGamesByShareIds(shareIds);

  context.gameService.prime(games);

  return games;
});

export const gamesByPlayerIdsLoaderMock = (context: IContext) =>  new DataLoader<string, IGame>(async (playerIds) => {
  const games = await batchGamesByPlayerIds(playerIds);

  context.gameService.prime(games);

  return games;
});

export const gamesByRoundIdsLoaderMock = (context: IContext) => new DataLoader<string, IGame>(async (roundsIds) => {
  const games = await batchGamesByRoundIds(roundsIds);

  context.gameService.prime(games);

  return games;
});
