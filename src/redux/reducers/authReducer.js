import { SET_USER } from "../_actionsTypes";

const initialState = {
    user: null,
    token: ''
}

const autReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }

}

export default autReducer;