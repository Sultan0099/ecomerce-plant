import axios from "axios";

import { SET_ORDERS, UPDATE_STATUS } from "../_actionsTypes"

export const getOrders = (userId) => async dispatch => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:2019/order/get-orders/seller/${userId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        dispatch({ type: SET_ORDERS, payload: { orders: res.data.orders, totalOrders: res.data.totalOrders } })
        return res;
    } catch (err) {
        // console.log({ err });
        return { err: true, error: err }
    }
}

export const updateStatus = (orderId, status) => async dispatch => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.patch(`http://localhost:2019/order/update-status/${orderId}/${status}`, {}, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });

        console.log(res);

        await dispatch({ type: UPDATE_STATUS, payload: { _id: res.data._id, order: res.data.order } })
    } catch (error) {
        console.log({ error })
    }
}