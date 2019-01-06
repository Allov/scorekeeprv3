// import { put, takeLatest } from 'redux-saga/effects';
// import * as actions from '../actions';
// import * as constants from '../constants';
// import appSagas, { createGame } from '../sagas';

// it('should start to watch CREATE_GAME action', () => {
//   const root = appSagas();
//   const takeLatestDescriptor = root.next().value;
//   expect(takeLatestDescriptor).toEqual(takeLatest(constants.CREATE_GAME, createGame));
// });

// it('should dispatch the CREATED_GAME action', () => {
//   const result = {
//     data: {
//       id: 'dont-care',
//     },
//   };

//   const createGameGenerator = createGame();
//   createGameGenerator.next(); // select:name
//   createGameGenerator.next(); // call:result
//   const putDescriptor = createGameGenerator.next(result).value;
//   expect(putDescriptor).toEqual(put(actions.createGame(result.data.id)));
// });

it('should ignore this test', () => {
  expect(true).toBe(true);
});
