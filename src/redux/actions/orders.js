import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";

import { SET_ORDERS, UPDATE_STATUS } from "../_actionsTypes"

export const createOrders = async (buyerId, productId, orderData) => {
    try {

        const data = {
            buyer: buyerId,
            product: productId,
            buyerAddress: {
                fullName: orderData.fullName,
                mobileNumber: orderData.mobileNumber,
                pinCode: "0000",
                locality: "pakistan",
                address: orderData.address.toLowerCase(),
                cityDistrictTown: orderData.city,
                province: orderData.provinceName,
                landmark: orderData.landmark ? orderData.landmark : ''
            },
            paymentType: "cash on delivery",
            paymentStatus: "not paid"
        }

        const token = await AsyncStorage.getItem("token");
        const res = await axios.post('https://glacial-bayou-56103.herokuapp.com/order/create', data, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })

        return res;
    } catch (err) {
        console.log(err)
    }
}


export const getOrders = (userId) => async dispatch => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://glacial-bayou-56103.herokuapp.com/order/get-orders/seller/${userId}`, {
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
        const res = await axios.patch(`https://glacial-bayou-56103.herokuapp.com/order/update-status/${orderId}/${status}`, {}, {
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