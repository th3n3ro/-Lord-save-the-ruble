import * as types from './cryptoTypes'
const defaultTsyms = [`BTC`, `ETH`, `BCH`, `EOS`, `LTC`, `USD`, `RUB`]
const initialState = {
  fsym: `USD`,
  tsyms: defaultTsyms,
  previousCryptoCourse: null,
  currentCryptoCourse: null,
  constCourse: null,
  errorMessage: null,
  standartCurrencyValue: 1,
  converter: {
    firstConverter: {
      type: 'firstConverter',
      currency: `USD`,
      inputValue: 1,
      inputName: `firstConverterInput`,
      selectName: `firstSelect`,
      options: defaultTsyms
    },
    secondConverter: {
      type: 'secondConverter',
      currency: `USD`,
      inputValue: 1,
      inputName: `secondConverterInput`,
      selectName: `secondSelect`,
      options: defaultTsyms
    }
  }
}

export const cryptoStoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_DATA_SUCSESS: {
      const { data: currentCryptoCourse } = action
      const previousCryptoCourse = { ...currentCryptoCourse }
      const constCourse = state.constCourse || { ...currentCryptoCourse }

      if (state.previousCryptoCourse) {
        for (const crypto in state.currentCryptoCourse) {
          previousCryptoCourse[crypto] =
            state.currentCryptoCourse[crypto] === currentCryptoCourse[crypto] ? state.previousCryptoCourse[crypto] : state.currentCryptoCourse[crypto]
        }
      }

      return { ...state, currentCryptoCourse, previousCryptoCourse, constCourse }
    }
    case types.LOAD_DATA_FAILURE: {
      const { data: errorMessage } = action

      return { ...state, errorMessage }
    }
    case types.CRYPTO_CONVERTER_CHANGE: {
      const {
        data: { changedType, changedCurrency, changedInput }
      } = action
      const {
        converter: { firstConverter, secondConverter },
        constCourse,
        converter
      } = state

      if (!constCourse) return state

      const standartCurrencyValue = changedInput / constCourse[changedCurrency]
      const temp = {}
      temp.firstConverter = constCourse && constCourse[firstConverter.currency] * standartCurrencyValue
      temp.secondConverter = constCourse && constCourse[secondConverter.currency] * standartCurrencyValue

      const changedConverter = { ...state.converter[changedType], inputValue: changedInput, currency: changedCurrency }
      const anotherConverter = firstConverter.type === changedType ? secondConverter : firstConverter

      return {
        ...state,
        standartCurrencyValue,
        converter: {
          ...converter,
          [changedType]: changedConverter,
          [anotherConverter.type]: { ...anotherConverter, inputValue: temp[anotherConverter.type] }
        }
      }
    }
    default: {
      return state
    }
  }
}
