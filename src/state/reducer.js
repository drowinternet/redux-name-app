import actionTypes from "./actionTypes";

const initState = {
    description: {
        id: "1",
        item: '',
    },
    value: '',
    loading: false,
};

export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_LOAD:
            return {...state, value: '', loading: true, };
        case actionTypes.SET_NAME:
            return {...state, loading: false, description: {item: action.payload}}
        case actionTypes.ADD_NAME:
            return {...state, loading: false, description: {item: action.payload}}
        case actionTypes.HANDLE_CHANGE:
            return {...state, value: action.payload}
        case actionTypes.ON_RESET:
            return {...state, loading: false, description: {item: ''}}
        default: 
            return state;
    }
};