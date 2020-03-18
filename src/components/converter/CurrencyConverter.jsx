import React from 'react'

export const CurrencyConverter = ({ handleConverterChange, configs }) => {
  const aggregateChanges = e => {
    const isInputChanged = e.target instanceof HTMLInputElement
    const boundedElement = isInputChanged ? e.target.nextElementSibling : e.target.previousElementSibling
    const { value: changedCurrency, name: changedCurrencyName } = isInputChanged ? boundedElement : e.target
    const { value: changedInput, name: changedInputName } = !isInputChanged ? boundedElement : e.target
    const changedType = e.target.dataset.type

    handleConverterChange({ changedCurrency, changedCurrencyName, changedInput, changedInputName, changedType })
  }
  return (
    <form className="converter" onChange={aggregateChanges}>
      <ul>
        {configs.map(({ currency, inputValue, inputName, selectName, options, type }) => (
          <li className="converter-item" key={inputName}>
            <input data-type={type} onChange={() => `ok ama okae`} type="number" name={inputName} value={inputValue} className="converter-input" />
            <select data-type={type} className="converter-select" name={selectName} value={currency}>
              {options.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </li>
        ))}
      </ul>
    </form>
  )
}
