import { IGame } from '../../../../../types';
import { addPlayerToGame as addPlayerToGameAction, fetchGame as fetchGameAction } from '../../actions';
import { addPlayerToGame, fetchGame } from '../sagas';

describe('fetchGame', () => {
  const shareId = 'dont-care';
  let fetchGameGenerator = fetchGame(fetchGameAction(shareId));

  beforeEach(() => {
    fetchGameGenerator = fetchGame(fetchGameAction(shareId));
    const callDescriptor = fetchGameGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  })

  it('dispatch the fetchedGame action if game was fetch correctly', () => {
    const gameByShareId: IGame = {
      createdBy: '',
      currentRound: 1,
      id: '',
      name: '',
      players: [],
      shareId,
    };

    const result = {
      data: {
        gameByShareId,
      }
    };

    const putDescriptor = fetchGameGenerator.next(result).value;
    expect(putDescriptor).toMatchSnapshot();
  });

  it('dispatch a notification error when no game was returned', () => {
    const gameByShareId: IGame | undefined = undefined;

    const result = {
      data: {
        gameByShareId,
      }
    };

    const putDescriptor = fetchGameGenerator.next(result).value;
    expect(putDescriptor).toMatchSnapshot();
  });

  // it('dispatch a notification error on error', () => {
  //   const putDescriptor = fetchGameGenerator.throw!('error').value;
  //   expect(putDescriptor).toMatchSnapshot();
  // });
});

describe('addPlayerToGame', () => {
  const gameId = 'dont-care';
  const name = 'dont-care';
  let addPlayerToGameGenerator = addPlayerToGame(addPlayerToGameAction(gameId, name));

  beforeEach(() => {
    addPlayerToGameGenerator = addPlayerToGame(addPlayerToGameAction(gameId, name));
    const callDescriptor = addPlayerToGameGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('adds a player correctly', () => {
    const result = {
      addPlayerToGame: {
        game: {},
      },
    };

    const putDescriptor = addPlayerToGameGenerator.next(result).value;
    expect(putDescriptor).toMatchSnapshot();
  });

  // it('dispatch a notification error on error', () => {
  //   const putDescriptor = addPlayerToGameGenerator.throw!().value;
  //   expect(putDescriptor).toMatchSnapshot();
  // });
});

