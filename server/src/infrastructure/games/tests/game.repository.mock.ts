import { IGameRepository, IGameSearchCriteria } from '../game.repository';
import { IGame, IGameFilterInput, IGameInput } from '../game.types';

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

export class GameMockRepository implements IGameRepository {
  public async getAll(filter: IGameFilterInput): Promise<IGame[]> {
    return mockGames;
  }
  public async getById(id: string): Promise<IGame> {
    return (await this.getByIds([id])).shift();
  }
  public async getByIds(ids: string[]): Promise<IGame[]> {
    return mockGames.filter(x => ids.includes(x.id));
  }
  public async search(searchCriteria: IGameSearchCriteria): Promise<IGame[]> {
    if (searchCriteria.shareIds) {
      return mockGames.filter(x => searchCriteria.shareIds.includes(x.shareId));
    }
    if (searchCriteria.playerIds) {
      return mockGames.filter(game => game.players.some(player => searchCriteria.playerIds.includes(player.id)));
    }
    if (searchCriteria.roundIds) {
      return mockGames.filter(game => game.rounds.some(round => searchCriteria.roundIds.includes(round.id)));
    }
  }

  public async create(input: IGameInput): Promise<IGame> {
    const game: IGame = {
      createdBy: input.userId,
      id: 'fakeIdC',
      name: input.name,
      players: [],
      rounds: input.rounds,
      shareId: 'shareId',
    };
    mockGames.push(game);
    return game;
  }
  public async update(id: string, input: any, returnNew?: boolean): Promise<IGame> {
    throw new Error("Method not implemented.");
  }
  public async delete(id: string): Promise<boolean> {
    const index = mockGames.findIndex(x => x.id === id);
    if (index === -1) { return false; }
    mockGames.splice(index, 1);
    return true;
  }
}
