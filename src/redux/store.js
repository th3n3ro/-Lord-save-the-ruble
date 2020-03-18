import { createStore, applyMiddleware } from 'redux'
import { cryptoStoreReducer } from './crypto/cryptoReducer'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './rootSaga'

const sagaMiddlware = createSagaMiddleware()

export const store = createStore(cryptoStoreReducer, applyMiddleware(sagaMiddlware))

sagaMiddlware.run(rootSaga)
