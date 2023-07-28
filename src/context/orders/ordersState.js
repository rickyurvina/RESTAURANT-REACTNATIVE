import React, { useReducer } from 'react'

import OrdersReducer from './ordersReducer'

import OrdersContext from './ordersContext'
import SELECT_PRODUCT from '../../types'

const OrderState = (props) => {

    const initialState = {
        order: [],
        plate: null
    }

    const [state, dispatch] = useReducer(OrdersReducer, initialState)

    const selectProduct = (product) => {
        console.log({product})
        dispatch({
            type: SELECT_PRODUCT,
            payload: product
        })
    }


    return (
        <OrdersContext.Provider value={{
            order: state.order,
            plate: state.plate,
            selectProduct
        }}>
            {props.children}
        </OrdersContext.Provider>
    )
}

export default OrderState;