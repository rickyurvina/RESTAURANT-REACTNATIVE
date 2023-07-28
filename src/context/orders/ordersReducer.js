import SELECT_ORDER from '../../types';
export default (state, action) => {

    switch (action.type) {
        case SELECT_ORDER:
            return {
                ...state,
                plate: action.payload
            }
        default:
            return state;
    }
}