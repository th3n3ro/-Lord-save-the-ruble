import React from 'react'

export const CryptoTablePopup = ({ x, y, currency, convertToCallback, convertFromCallback, closePopup }) => {
  return (
    <section
      className="crypto-table__popup"
      style={{
        top: `${y}px`,
        left: `${x}px`
      }}>
      <button onClick={closePopup} className="crypto-table__popup__closer">
        X
      </button>
      <button className="crypto-table__popup__button" onClick={convertToCallback}>
        Convert to {currency}
      </button>
      <button className="crypto-table__popup__button" onClick={convertFromCallback}>
        Convert from {currency}
      </button>
    </section>
  )
}
