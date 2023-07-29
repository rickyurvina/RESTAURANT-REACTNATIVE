import React, { useReducer } from 'react'

import OrdersReducer from './ordersReducer'

import OrdersContext from './ordersContext'
export const SHOW_SUMMARY_ORDER= 'SHOW_SUMMARY_ORDER'
import { SELECT_PRODUCT, CONFIRM_ORDER_PLATE, DELETE_PLATE } from '../../types'

const OrderState = (props) => {

    const initialState = {
        order: [],
        plate: null,
        total: 0
    }

    const [state, dispatch] = useReducer(OrdersReducer, initialState)

    const selectProduct = (product) => {
        dispatch({
            type: SELECT_PRODUCT,
            payload: product
        })
    }

    const confirmOrderPlate = (order) => {
        dispatch({
            type: CONFIRM_ORDER_PLATE,
            payload: order
        })
    }

    const showTotalToPay = (total) => {
        dispatch({
            type: SHOW_SUMMARY_ORDER,
            payload: total
        })
    }

    const deletePlate = (id) => {
        dispatch({
            type: DELETE_PLATE,
            payload: id
        })
    }


    return (
        <OrdersContext.Provider value={{
            order: state.order,
            plate: state.plate,
            total: state.total,
            selectProduct,
            confirmOrderPlate,
            showTotalToPay,
            deletePlate
        }}>
            {props.children}
        </OrdersContext.Provider>
    )
}

export default OrderState;