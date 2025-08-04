import { fetchApiData } from './api';
import { GET_HOME_CONTENT } from './constants';
import { setLoading, setData, setError } from './slice';
import { call, put, takeEvery } from 'redux-saga/effects';

// Add `action` to get page number
function* fetchApiDataSaga(action: any): any {
  try {
    yield put(setLoading());

    const page = action.payload.page;
    const data = yield call(fetchApiData, page); // pass page to API

    yield put(setData(data));
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

export function* homeSaga() {
  yield takeEvery(GET_HOME_CONTENT, fetchApiDataSaga);
}

export default homeSaga;
