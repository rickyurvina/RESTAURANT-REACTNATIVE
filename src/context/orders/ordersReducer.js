import {
    SELECT_ORDER,
    CONFIRM_ORDER_PLATE,
    SHOW_SUMMARY_ORDER,
    DELETE_PLATE,
    ORDER_PLACED
} from '../../types';
export default (state, action) => {

    switch (action.type) {
        case SELECT_ORDER:
            return {
                ...state,
                plate: action.payload
            }
        case CONFIRM_ORDER_PLATE:
            return {
                ...state,
                order: [...state.order, action.payload]
            }
        case SHOW_SUMMARY_ORDER:
            return {
                ...state,
                total: action.payload
            }
        case DELETE_PLATE:
            return {
                ...state,
                order: state.order.filter((plate) => plate.id !== action.payload)
            }
        case ORDER_PLACED:
            return {
                ...state,
                order: [],
                total: 0,
                idOrder: action.payload
            }
        default:
            return state;
    }
}