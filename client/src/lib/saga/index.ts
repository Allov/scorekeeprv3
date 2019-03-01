import { call, put } from 'redux-saga/effects';
import { notify } from '../../containers/Notifications/actions';
import { Notifications } from '../../types/constants';
import client from '../apollo';

export function* safeMutate(mutation: any, variables: any, errorMessagePrefix: string) {
  const result = yield safeGqlClient(client.mutate, { mutation, variables }, errorMessagePrefix);
  return result;
}

export function* safeQuery(query: any, variables: any, errorMessagePrefix: string) {
  const result = yield safeGqlClient(client.query, { query, variables }, errorMessagePrefix);
  return result;
}

export function* safeGqlClient(operation: any, params: any, errorMessagePrefix: string) {
  try {
    const result = yield call(operation, params);

    return result ? result.data : null;
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);

    yield put(notify(Notifications.Error, `${errorMessagePrefix}: ${error.message}`));
  }
}
