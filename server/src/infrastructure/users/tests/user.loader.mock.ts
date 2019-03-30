import DataLoader from 'dataloader';
import { IUser } from '../user.types';

export const mockUsers: IUser[] = [
  {
    games: [
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
    ],
    id: 'fakeUserIdA',
    username: 'fakeUsernameA',
  },
  {
    games: [
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
    ],
    id: 'fakeUserIdB',
    username: 'fakeUsernameB',
  },
];

type BatchUser = (ids: string[]) => Promise<IUser[]>;


const batchUsers: BatchUser = async (ids) => {
  const users = mockUsers.filter(user => ids.includes(user.id));

  const userMap: { [key: string]: IUser } = {};
  users.forEach(user => {
    userMap[user.id] = user;
  });


  return ids.map(id => userMap[id]);
};

export const userLoaderMock = () => new DataLoader<string, IUser>(batchUsers);
