
import { GET_PRODUCTS_EXIT } from "../../types";

export default (state, action) => {
    switch (action.type) {
        case GET_PRODUCTS_EXIT:
            return {
                ...state,
                menu: action.payload
            }
        default:
            return state;
    }
}