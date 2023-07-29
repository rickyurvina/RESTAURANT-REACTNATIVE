import {SELECT_ORDER,CONFIRM_ORDER_PLATE} from '../../types';
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
        default:
            return state;
    }
}