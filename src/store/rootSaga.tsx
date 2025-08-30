import { all, fork } from "redux-saga/effects";
import categoriesSaga from "@modules/categories/api/saga";
import homeSaga from "@modules/home/api/saga";

export default function* rootSaga() {
  yield all([
    fork(homeSaga),
    fork(categoriesSaga),
  ]);
}
