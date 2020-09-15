import axios from "axios";
import { SET_PRODUCTS, CREATE_PRODUCT, DELETE_PRODUCT } from "../_actionsTypes";


export const getProducts = (category) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:2019/products/${category}`);

        dispatch({ type: SET_PRODUCTS, payload: res.data.products });

        return { err: false, data: res.data.products };

    } catch (err) {
        console.log(err);
        return {
            err: true, error: err
        }
    }

}



export const singleProduct = async (productId) => {
    try {
        const res = await axios.get(`http://localhost:2019/products/get-product/${productId}`)

        return { err: false, res }
    } catch (error) {
        console.log(error)
        return { err: true, error }
    }
}


export const searchProduct = async (searchQuery) => {
    try {
        const res = await axios.post(`http://localhost:2019/products/search`, { searchQuery })

        return { err: false, res }
    } catch (error) {
        console.log(error)
        return { err: true, error }
    }
}