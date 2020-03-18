import React from 'react'
export const StandartCovnerter = ({ standartCurrency, boundedCurrency, boundedValue, precision = 3 }) => {
  return (
    <div className="standart-converter">
      <div className="standart-converter__top">
        <span className="standart-converter__standart-value">1</span>
        {` `}
        <span className="standart-converter__standart-currency">{standartCurrency}</span>
        {` `} is equal
      </div>
      <div className="standart-converter__botom">
        <span className="standart-converter__bounded-value">{boundedValue.toFixed(precision)}</span>
        {` `}
        <span className="standart-converter__bounded-currency">{boundedCurrency}</span>
      </div>
    </div>
  )
}
