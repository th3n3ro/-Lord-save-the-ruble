import React from 'react'
import { Provider } from 'react-redux'
import { store } from './redux/store'

export const Context = ({ children }) => <Provider store={store}>{children}</Provider>
