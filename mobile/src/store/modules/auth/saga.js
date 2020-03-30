import { Alert } from 'react-native';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signInFailure } from './actions';

function* singIn({ payload }) {
  try {
    const { id } = payload;

    if (!id) {
      Alert.alert('ID inválido', 'Informe seu ID');

      yield put(signInFailure());

      return;
    }

    const response = yield call(api.post, '/sessions/deliveryman', { id });

    const deliveryman = response.data;

    yield put(signInSuccess(deliveryman));
  } catch (error) {
    Alert.alert(
      'Erro ao realizar login',
      'Confira o seu ID com o prestador de serviço e tente novamente'
    );

    yield put(signInFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', singIn)]);
