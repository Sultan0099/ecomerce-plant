import { SET_PRODUCTS, CREATE_PRODUCT, DELETE_PRODUCT } from "../_actionsTypes"

const initialState = {
    products: []
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case CREATE_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case DELETE_PRODUCT:
            const productsAfterDelete = state.products.filter(product => product._id !== action.payload)
            return {
                ...state,
                products: [...productsAfterDelete]
            }

        default:
            return state;
    }
}


export default productReducer;