import { gql } from 'apollo-boost';
import { call, put, takeLatest } from 'redux-saga/effects'
import { createGame } from '../actions';
import client from '../apollo';
import { FETCH_HELLOWORLD } from '../constants';

const QUERY = gql`
  {
    hello
  }
`;


function* fetchHelloWorld() {
  const result = yield call(client.query, { query: QUERY });
  yield put(createGame(result.data.hello));
}

function* rootSaga() {
  yield takeLatest(FETCH_HELLOWORLD, fetchHelloWorld);
}

export default rootSaga;
