import React, { useEffect, useCallback, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/crypto/cryptoActions'
import { CryptoTablePopup } from './popup/CryptoTablePopup'
import { CryptoTableRow } from './row/CryptoTableRow'
import { tsymsSigns } from '../../cryptoAssets'

export const CryptoTable = () => {
  const dispatch = useDispatch()
  const {
    firstConverter,
    secondConverter,
    fsym,
    tsyms,
    currentCryptoCourse,
    previousCryptoCourse,
    converter = { firstConverter, secondConverter }
  } = useSelector(s => s)
  const [{ x, y, openedPopup, clickedCurrency }, setState] = useReducer((a, s) => ({ ...a, ...s }), {
    openedPopup: false,
    x: 0,
    y: 0,
    clickedCurrency: null
  })

  function syntheticChangeConverter(changedConverter) {
    dispatch(
      actions.cryptoConverterChange({
        changedType: converter[changedConverter].type,
        changedCurrency: clickedCurrency,
        changedInput: converter[changedConverter].inputValue
      })
    )
    setState({ openedPopup: false })
  }

  const closePopup = () => setState({ openedPopup: false })

  const loadCryptoCourse = useCallback(() => {
    dispatch(actions.loadCryptoCourse(fsym, tsyms))
  }, [fsym, dispatch, tsyms])
  useEffect(loadCryptoCourse, [loadCryptoCourse])

  const handleRowClick = ({ target, clientX, clientY }) => {
    let tr
    tr = target.querySelector(`tr`)
    tr = tr || target.closest(`tr`)
    if (!tr) return

    const clickedCurrency = tr.dataset.tsym
    if (!clickedCurrency) return

    setState({ x: clientX + 15, y: clientY - 70, openedPopup: true, clickedCurrency })
  }
  const fixTo = 4
  return (
    <table className="crypto-table">
      <thead className="crypto-table__header">
        <tr className="crypto-table__header__row">
          <th className="crypto-table__header__data header__data-hash">#</th>
          <th className="crypto-table__header__data header__data-coin">Coin</th>
          <th className="crypto-table__header__data header__data-price">
            Price {` `}
            <span className="header__data-measurement">({fsym})</span>
          </th>
        </tr>
      </thead>
      <tbody className="crypto-table__body" onClick={handleRowClick}>
        {currentCryptoCourse &&
          tsyms.map((tsym, index) => (
            <CryptoTableRow
              key={tsym}
              {...{
                index,
                tsym,
                previousCoinValue: (1 / previousCryptoCourse[tsym]).toFixed(fixTo),
                currentCoinValue: (1 / currentCryptoCourse[tsym]).toFixed(fixTo),
                fsymSign: tsymsSigns[fsym]
              }}
            />
          ))}
      </tbody>
      <tfoot className="crypto-table__footer">
        <tr>
          <td>
            {openedPopup && (
              <CryptoTablePopup
                {...{
                  x,
                  y,
                  currency: clickedCurrency,
                  closePopup,
                  convertFromCallback: syntheticChangeConverter.bind(null, `secondConverter`),
                  convertToCallback: syntheticChangeConverter.bind(null, `firstConverter`)
                }}
              />
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  )
}
