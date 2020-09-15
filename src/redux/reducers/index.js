import { combineReducers } from "redux";

import categoryReducer from "./categoryReducer";
import authReducer from "./authReducer";
import productsReducer from "./products";
import ordersReducer from "./orders";


const rootReducer = combineReducers({
    categories: categoryReducer,
    auth: authReducer,
    products: productsReducer,
    orders: ordersReducer,
});

export default rootReducer;