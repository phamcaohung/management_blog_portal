import { API_ADMIN } from "../../config/apiConfig"
import { isValidToken } from "../../config/authConfig"
import * as types from "../constants/adminContants"


export const initializeAdmin = () => async (dispacth) => {
    const token = JSON.parse(localStorage.getItem("admin"))?.token
    if (token && isValidToken(token))
        dispacth({ type: types.SIGN_IN_SUCCESS, payload: JSON.parse(localStorage.getItem("admin")) })
}

export const singInAdmin = (data, navigate) => async (dispacth) => {
    try {
        const res = await API_ADMIN.post("/signin", data)

        localStorage.setItem("admin", JSON.stringify(res.data))
        dispacth({ type: types.SIGN_IN_SUCCESS, payload: res.data })
        navigate("/admin")
    } catch (e) {
        dispacth({ type: types.SIGN_IN_FAILURE, payload: e.message })
    }
}

export const logOutAdmin = () => async (dispacth) => {
    try {
        localStorage.removeItem("admin")
        dispacth({ type: types.LOGOUT_SUCCESS })
    } catch (e) {
        console.log(e.message);
    }
}

export const getUsersAdmin = (name, email, limit, skip, reset = false) => async (dispatch) => {
    try {
        const { data } = await API_ADMIN.get(`/users?name=${name}&email=${email}&limit=${limit}&skip=${skip}`)
        dispatch({
            type: reset ? types.GET_USERS_SUCCESS : types.GET_USERS_MORE_SUCCESS,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: reset ? types.GET_USERS_FAILURE : types.GET_USERS_MORE_FAILURE,
            payload: e.message
        })
    }
}

export const getBlogsAdmin = (content, user, limit, skip, reset = false) => async (dispatch) => {
    try {
        const { data } = await API_ADMIN.get(`/blogs?content=${content}&user=${user}&limit=${limit}&skip=${skip}`)
        dispatch({
            type: reset ? types.GET_BLOGS_SUCCESS : types.GET_MORE_BLOGS_SUCCESS,
            payload: {
                blogs: data.formattedBlogs,
                totalBlogs: data.totalBlogs
            }
        })
    } catch (e) {
        dispatch({
            type: reset ? types.GET_BLOGS_FAILURE : types.GET_MORE_BLOGS_FAILURE,
            payload: e.message
        })
    }
}

export const deleteBlogAdmin = (id) => async (dispatch) => {
    try {
        const { data } = await API_ADMIN.delete(`/blogs/${id}`)
        dispatch({ type: types.DELETE_BLOG_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.DELETE_BLOG_FAILURE, payload: e.message })
    }
}

export const deleteUserAdmin = (id) => async (dispatch) => {
    try {
        const { data } = await API_ADMIN.delete(`/users/${id}`)
        dispatch({ type: types.DELETE_USER_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.DELETE_USER_FAILURE, payload: e.message })
    }
}
