import { call, put, takeEvery } from "redux-saga/effects";
import { getCategoriesApi as fetchCategoriesApi } from "./api";
import { setData, setError, setLoading } from "./slice";
import { GET_CATEGORIES } from "./constant";

// Worker saga
export function* fetchCategoriesApiData(): any {
  try {
    yield put(setLoading());
    const data = yield call(fetchCategoriesApi);
    yield put(setData(data));
  } catch (error: any) {
    yield put(setError(error.message));
  }
}

// Watcher saga
function* categoriesSaga() {
  yield takeEvery(GET_CATEGORIES, fetchCategoriesApiData);
}

export default categoriesSaga;
