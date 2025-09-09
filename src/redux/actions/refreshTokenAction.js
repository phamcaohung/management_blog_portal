import axios from "axios";


const API = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
})

API.interceptors.request.use((req) => {
    const token = JSON.parse(localStorage.getItem("token"))?.token
    if(token)
        req.headers.Authorization = `Bearer ${token}`
    return req
})

export const refreshTokenAction = (refreshToken) => async (dispatch) => {
    try {
        const res = await API.post("/users/refresh-token", { refreshToken })
        const payload = res.data
        const profile = JSON.parse(localStorage.getItem("token"))
        localStorage.setItem(
            "token", 
            JSON.stringify({ 
                ...profile, 
                ...payload 
            })
        )
        dispatch({
            type: "REFRESH_TOKEN_SUCCESS",
            payload: payload
        })
    } catch (e) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        dispatch({
            type: "REFRESH_TOKEN_FAILURE",
            payload: e.response.data
        })
    }
}

