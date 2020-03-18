import { call, put, take, delay } from 'redux-saga/effects'
import * as actions from '../cryptoActions'
import CryptoApi from './api'
let cryptoApi

const updateCryptoCourse = async () => {
  const apiResponse = await cryptoApi.request()
  return apiResponse
}

export function* updateResource() {
  let isRunning = false
  const {
    data: { tsyms, fsym }
  } = yield take('LOAD_CRYPTO_COURSE')
  cryptoApi = new CryptoApi(fsym, tsyms)
  isRunning = false
  if (!isRunning) {
    try {
      while (true) {
        const apiResponse = yield call(updateCryptoCourse)
        yield put(actions.loadDataSucsess(apiResponse))
        yield delay(2000)
      }
    } catch {
      yield put(actions.loadDataFailure(`some error when api call`))
    }
  }
}
