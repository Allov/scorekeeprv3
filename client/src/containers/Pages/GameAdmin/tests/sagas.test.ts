import { IGame } from '../../../../types';
import { addPlayerToGame as addPlayerToGameAction, fetchGame as fetchGameAction } from '../actions';
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
      id: '',
      name: '',
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

  it('dispatch a notification error on error', () => {
    const response = new Error('Woops');
    // compiler gives 'cannot invoke an object which is possibly 'undefined'' and I can't find anything to fix this to save my life.
    // casting createGameGenerator as any here fixes the compiler error and the code runs just fine.
    const putDescriptor = (fetchGameGenerator as any).throw(response).value;

    expect(putDescriptor).toMatchSnapshot();
  });
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
      data: {
        addPlayerToGame: {
          game: {},
        },
      },
    };

    const putDescriptor = addPlayerToGameGenerator.next(result).value;
    expect(putDescriptor).toMatchSnapshot();
  });

  it('dispatch a notification error on error', () => {
    const response = new Error('Woops');

    // compiler gives 'cannot invoke an object which is possibly 'undefined'' and I can't find anything to fix this to save my life.
    // casting createGameGenerator as any here fixes the compiler error and the code runs just fine.
    const putDescriptor = (addPlayerToGameGenerator as any).throw(response).value;

    expect(putDescriptor).toMatchSnapshot();
  });
});

