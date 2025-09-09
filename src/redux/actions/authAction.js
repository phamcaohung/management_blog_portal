import { refreshTokenAction } from "./refreshTokenAction"
import * as types from "../constants/authConstants"
import * as notiTypes from "../constants/notificationContants"
import * as userTypes from "../constants/userConstants"
import { API } from "../../config/apiConfig"
import { isValidToken } from "../../config/authConfig";


export const initializeAuth = () => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"))?.token
    const refreshToken = JSON.parse(localStorage.getItem("token"))?.refreshToken

    if (token && refreshToken)
        if (isValidToken(token)) {
            console.log("token: ", token);
            dispatch({ type: types.SET_ACCESS_TOKEN, payload: token })
            dispatch({ type: types.SET_REFRESH_TOKEN, payload: refreshToken })
            dispatch({
                type: userTypes.SET_USER,
                payload: JSON.parse(localStorage.getItem("user"))
            })
        }
        else
            await dispatch(refreshTokenAction(refreshToken))
}

export const signUp = (data, navigate, verify = false) => async (dispatch) => {
    try {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        const user = {
            ...data,
            verify: verify
        }
        await API.post("/users/signup", user, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        dispatch({ type: types.SIGNIN_SUCCESS, payload: "Create Account successfully" })
        dispatch({ 
            type: notiTypes.SHOW_NOTIFICATION, 
            payload: {
                message: "Create Account successfully",
                severity: "success"
            } 
        })
        if(verify)
            navigate("/auth/verify", { state: data.email })
    } catch (e) {
        dispatch({ type: types.SIGNIN_FAILURE, payload: e.message })
    }
}

export const signIn = (data, navigate) => async (dispatch) => {
    try {
        const res = await API.post("/users/signin", data)
        const { user, token, refreshToken, tokenUpdated } = res.data
        const profile = {
            token,
            refreshToken,
            tokenUpdated
        }
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", JSON.stringify(profile))
        dispatch({ type: types.SIGNIN_SUCCESS, payload: profile })
        dispatch({ type: userTypes.SET_USER, payload: user })
        navigate("/")
    } catch (e) {
        dispatch({ type: types.SIGNIN_FAILURE, payload: e.response?.data?.message || e.message })
    }
}

export const logout = () => async (dispatch) => {
    try {
        const res = await API.post("/users/logout")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        dispatch({ type: types.LOGOUT_SUCCESS, payload: res })
        dispatch({ type: userTypes.SET_USER, payload: null })
    } catch (e) {
        console.log(e.message)
    }
}   

export const clearError = () => async (dispatch) => {
    dispatch({ type: types.CLEAR_ERROR })
}

export const refreshUserData = () => async (dispatch, getState) => {
    try {
        const { auth } = getState()
        if (auth.token && auth.user) {
            const { data } = await API.get("/users/current")
            dispatch({ type: types.SET_USER, payload: data })
        }
    } catch (e) {
        console.log("Error refreshing user data:", e.message)
    }
}




