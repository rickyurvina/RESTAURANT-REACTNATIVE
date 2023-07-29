import {SELECT_ORDER,CONFIRM_ORDER_PLATE, SHOW_SUMMARY_ORDER, DELETE_PLATE} from '../../types';
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
        default:
            return state;
    }
}