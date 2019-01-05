// import { gql } from 'apollo-boost';
// import { call, put, select, takeLatest } from 'redux-saga/effects'
// import client from '../../lib/apollo';
// import { createGame as createGameAction } from './actions';
// import { CREATE_GAME } from './constants';
// import { makeSelectGameName } from './selectors';

// const QUERY = gql`
//   mutation AddUser($name: String!, $shareId: String!) {
//     addUser(input: {
//       name: $name,
//       shareId: $shareId
//     }) {
//       id
//     }
//   }
// `;

// export function* createGame() {
//   const name = yield select(makeSelectGameName());
//   const result = yield call(client.mutate, { mutation: QUERY, variables: { name, shareId: 'sapin3' }});
//   // todo: circular...
//   yield put(createGameAction(result.data.id));
// }

// function* rootSaga() {
//   yield takeLatest(CREATE_GAME, createGame);
// }

// export default rootSaga;
