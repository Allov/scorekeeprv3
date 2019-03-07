import { all } from 'redux-saga/effects';
import { createSagas } from './containers/Pages/Create/sagas';
import { gameAdminSagas } from './containers/Pages/Game/GameAdmin/sagas';
import { gameViewSagas } from './containers/Pages/Game/GameView/sagas';


export default function* rootSaga() {
  yield all([
    ...createSagas,
    ...gameAdminSagas,
    ...gameViewSagas,
  ]);
};
