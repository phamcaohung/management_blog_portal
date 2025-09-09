import * as types from "../constants/authConstants"

const initialState = {
    token: null,
    refreshToken: null,

    signInError: null,
    signUpError: [],
    successMessage: null,

}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case types.SET_ACCESS_TOKEN:
            return {
                ...state,
                token: payload ? payload : null
            }
        case types.SET_REFRESH_TOKEN:
            return {
                ...state,
                refreshToken: payload ? payload : null
            }
        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                signInError: null,
                signUpError: [],
                successMessage: payload ? payload : null
            }
        case types.SIGNUP_FAILURE:
            return {
                ...state,
                successMessage: null,
                signInError: null,
                signUpError: payload ? payload : []
            }
        case types.SIGNIN_SUCCESS:
            return {
                ...state,
                signInError: null,
                successMessage: payload ? payload : null,
                token: payload ? payload.token : null,
                refreshToken: payload ? payload.refreshToken : null,
            }
        case types.SIGNIN_FAILURE:
            return {
                ...state,
                signUpError: [],
                successMessage: null,
                signInError: payload ? payload : null,
            }
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                refreshToken: null,
                token: null,
                signInError: null,
                signUpError: [],
                successMessage: null,
            }
        case types.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                token: payload ? payload : null,
                refreshToken: payload ? payload : null
            }
        case types.REFRESH_TOKEN_FAILURE:
            return {
                ...state,
                refreshToken: null,
                token: null,
                signInError: null,
                signUpError: [],
                successMessage: null,
            }
        case types.CLEAR_ERROR:
            return {
                ...state,
                signInError: null
            }
        default:
            return state
    }
}

export default authReducer