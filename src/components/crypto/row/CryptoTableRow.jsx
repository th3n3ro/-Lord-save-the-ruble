import React, { memo } from 'react'
import { coinsFullName, coinsImage } from '../../../cryptoAssets'

export const CryptoTableRow = memo(({ tsym, index, currentCoinValue, fsymSign, previousCoinValue }) => (
  <tr className="crypto-table__body__row" data-tsym={tsym} key={tsym}>
    <td className="crypto-table__body__data body__data-hash">{index + 1}</td>
    <td className="crypto-table__body__data body__data-coin">
      {coinsImage[tsym] && <img src={coinsImage[tsym]} alt={tsym} />}
      {` `}
      <span className="body__data-coin-fullname">{coinsFullName[tsym] || tsym}</span>
    </td>
    <td className={` `}>
      <span
        className={`body__data-coin-value  ${currentCoinValue > previousCoinValue && 'currency-increase'} ${previousCoinValue > currentCoinValue &&
          'currency-fail'}`}>
        {fsymSign} {currentCoinValue}
      </span>
    </td>
  </tr>
))
