import { all } from 'redux-saga/effects';
import { createSagas } from './containers/Pages/Create/sagas';
import { gameAdminSagas } from './containers/Pages/GameAdmin/sagas';

export default function* rootSaga() {
  yield all([
    ...createSagas,
    ...gameAdminSagas,
  ]);
};
