const { SET_ORDERS, UPDATE_STATUS } = require("../_actionsTypes")

const initialState = {
    orders: [],
    totalOrders: 0,
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return {
                ...state,
                orders: action.payload.orders,
                totalOrders: action.payload.totalOrders
            }
        case UPDATE_STATUS:
            console.log(action.payload);
            const copyOrders = [...state.orders]
            const orderToUpdate = copyOrders.findIndex((order) => order._id == action.payload._id);

            copyOrders.splice(orderToUpdate, 1, action.payload.order);

            console.log(copyOrders)
            return {
                ...state,
                orders: copyOrders
            }
        default:
            return state
    }
}

export default orderReducer;