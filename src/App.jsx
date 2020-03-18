import React, { useEffect, useCallback } from 'react'
import { CurrencyConverter } from './components/converter/CurrencyConverter'
import { CryptoTable } from './components/crypto/Table'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from './redux/crypto/cryptoActions'
import { StandartCovnerter } from './components/converter/StandartConverter'

const App = () => {
  const { fsym, tsyms, constCourse, converter } = useSelector(s => s)

  const dispatch = useDispatch()

  const loadCryptoCourse = useCallback(() => {
    dispatch(actions.loadCryptoCourse(fsym, tsyms))
  }, [fsym, dispatch, tsyms])

  useEffect(loadCryptoCourse, [loadCryptoCourse])
  const handleConverterChange = data => dispatch(actions.cryptoConverterChange(data))

  return (
    <div className="app">
      <section className="crypto-table-container">
        <CryptoTable />
      </section>
      <section className="converter-section">
        <div className="standart-converter-container">
          {constCourse && (
            <StandartCovnerter
              standartCurrency={converter.secondConverter.currency}
              boundedCurrency={converter.firstConverter.currency}
              boundedValue={constCourse[converter.firstConverter.currency] / constCourse[converter.secondConverter.currency]}
            />
          )}
        </div>
        <div className="converter-container">
          <CurrencyConverter {...{ configs: Object.values(converter), handleConverterChange }} />
        </div>
      </section>
    </div>
  )
}

export default App
