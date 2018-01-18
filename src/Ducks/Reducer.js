// import axios from 'axios';

const initialState = {
    user: null,
}

const LOGIN = 'LOGIN'

export default function reducer(state=initialState, action){
    switch (action.type) {
        case LOGIN:
        console.log('action', action.payload)
            return {...state, user: action.payload}
        default:
        console.log(action.type)
            return state
    }

}

export const login = (user) => {
    return {
        type: LOGIN,
        payload: user
    }
}