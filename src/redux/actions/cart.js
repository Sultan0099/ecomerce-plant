import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';

import { base_url } from "../../constants";

export const ADD_TO_CART = 'ADD_TO_CART';
export const GET_CART_DETAILS = 'GET_CART_DETAILS';
export const UPDATE_CART = 'UPDATE_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (cartItem) => {
    return async dispatch => {
        try {
            // const response = await fetch(`${base_url}/cart/add`, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'auth-token': token
            //     },
            //     body: JSON.stringify(cartItem),
            //     method: 'POST'
            // });
            // const jsonResposne = await response.json();
            const token = await AsyncStorage.getItem("token")
            const res = await axios.post(`${base_url}/cart/add`, cartItem, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            if (res.status === 201) {
                dispatch({
                    type: ADD_TO_CART,
                    cartItem: cartItem
                });
            }

            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export const getCartItems = (userId) => {
    return async dispatch => {

        try {

            // const response = await fetch(`${base_url}/cart/user/${userId}`, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'auth-token': token
            //     },
            //     method: 'POST'
            // });

            // const jsonResposne = await response.json();
            // if (response.status === 200) {
            //     dispatch({
            //         type: GET_CART_DETAILS,
            //         cartItems: jsonResposne.message[0]
            //     });
            // }

            const token = await AsyncStorage.getItem("token");

            const res = await axios.get(`${base_url}/cart/cart-items`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            if (res.status === 200 && res.data.cartItems) {
                console.log(res.data.cartItems)
                dispatch({
                    type: GET_CART_DETAILS,
                    cartItems: res.data.cartItems
                });
                return { err: false, data: res.data };
            } else {
                dispatch({
                    type: CLEAR_CART
                });
            }


        } catch (error) {
            console.log(error);
            dispatch({
                type: CLEAR_CART
            });
            return { err: true, error }
        }

    }
}

export const updateCart = (userId, product) => {
    return async dispatch => {
        try {
            const token = await AsyncStorage.getItem("token")


            const response = await axios.put(`${base_url}/cart/update/quantity`, {
                userId,
                productId: product.productId,
                quantity: product.quantity,
                total: product.total
            }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            if (response.status === 201) {
                dispatch({
                    type: UPDATE_CART,
                    item: product
                });
            }

            return response.data.message;


        } catch (error) {
            console.log(error);
        }
    }
}

export const clearCart = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_CART,
            payload: null
        });
    }
}