import * as types from './cryptoTypes'
export const loadDataSucsess = data => ({
  type: types.LOAD_DATA_SUCSESS,
  data
})
export const loadDataFailure = errorMessage => ({
  data: errorMessage,
  type: types.LOAD_DATA_FAILURE
})

export const loadCryptoCourse = (fsym = 'USD', tsyms = [`USD`]) => ({
  type: types.LOAD_CRYPTO_COURSE,
  data: {
    fsym,
    tsyms
  }
})

export const cryptoConverterChange = data => ({
  type: types.CRYPTO_CONVERTER_CHANGE,
  data
})
