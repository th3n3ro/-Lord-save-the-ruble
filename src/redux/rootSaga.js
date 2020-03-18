import { all } from 'redux-saga/effects'
import { updateResource } from './crypto/sagas/sagas'

export default function* rootSaga() {
  yield all([updateResource()])
}
