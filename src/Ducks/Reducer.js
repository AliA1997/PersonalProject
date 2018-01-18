// import axios from 'axios';

const initialState = {
    user: null,
    homepage: [],
}

const LOGIN = 'LOGIN';
const HOME = 'HOME'

export default function reducer(state=initialState, action){
    switch (action.type) {
        case LOGIN:
        console.log('action', action.payload)
            return {...state, user: action.payload}
        case HOME:
            return {...state, homepage: action.payload}
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

export function home(images){
    return {
        type: HOME,
        payload: images
    }
}
