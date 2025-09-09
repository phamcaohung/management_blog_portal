import { API } from "../../config/apiConfig"
import { setLocalStorageUser } from "../../config/authConfig"
import * as types from "../constants/blogContants"


export const createBlog = (data) => async (dispatch) => {
    try {
        const res = await API.post("/blogs/create", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        dispatch({ type: types.CREATE_BLOG_SUCCESS, payload: res.data })
    } catch (e) {
        dispatch({ type: types.CREATE_BLOG_FAILURE, payload: e.message })
    }
}

export const getBlogById = (id) => async (dispatch) => {

    try {
        const { data } = await API.get(`/blogs/${id}`)
        console.log("data: ", data);

        dispatch({ type: types.GET_BLOG_BY_ID_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.GET_BLOG_BY_ID_FAILURE, payload: e.message })
    }
}

export const getBlogs = (content, limit, skip, reset = false) => async (dispatch) => {
    try {
        const { data } = await API.get(`/blogs?content=${content}&limit=${limit}&skip=${skip}`)

        dispatch({
            type: reset ? types.GET_BLOGS_SUCCESS : types.GET_MORE_BLOGS_SUCCESS,
            payload: {
                blogs: data.formattedBlogs,
                totalBlogs: data.totalBlogs
            }
        })
    } catch (e) {
        dispatch({ type: types.GET_BLOGS_FAILURE, payload: e.message })
    }
}

export const deleteBlog = (id) => async (dispatch) => {
    try {
        const { data } = await API.delete(`/blogs/delete/${id}`)
        console.log("data: ", data);
        dispatch({ type: types.DELETE_BLOG_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.DELETE_BLOG_FAILURE, payload: e.message })
    }
}

export const updateBlog = (id, data) => async (dispatch) => {
    try {
        const res = await API.put(`/blogs/update/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        dispatch({ type: types.UPDATE_BLOG_SUCCESS, payload: res.data })
    } catch (e) {
        dispatch({ type: types.UPDATE_BLOG_FAILURE, payload: e.message })
    }
}

export const saveBlog = (id) => async (dispatch) => {
    try {
        const { data } = await API.patch(`/blogs/${id}/save`)
        setLocalStorageUser(data, "saveBlog")
        dispatch({ type: types.SAVE_BLOG_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.SAVE_BLOG_FAILURE, payload: e.message })
    }
}

export const unSaveBlog = (id) => async (dispatch) => {
    try {
        const { data } = await API.patch(`/blogs/${id}/un-save`)
        setLocalStorageUser(data, "saveBlog")
        dispatch({ type: types.UNSAVE_BLOG_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.UNSAVE_BLOG_FAILURE, payload: e.message })
    }
}

export const getSaveBlogs = (content, user) => async (dispatch) => {
    try {
        const { data } = await API.get(`/blogs/save?content=${content}&user=${user}`)
        dispatch({ type: types.GET_BLOGS_SAVE_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.GET_BLOGS_SAVE_FAILURE, payload: e.message })
    }
}

export const getBlogsFollowing = (content, limit, skip, reset = false) => async (dispatch) => {
    try {
        const { data } = await API.get(`/blogs/following?content=${content}&limit=${limit}&skip=${skip}`)
        dispatch({
            type: reset ? types.GET_BLOGS_FOLLOWING_SUCCESS : types.GET_MORE_BLOGS_FOLLOWING_SUCCESS,
            payload: data
        })
    } catch (e) {
        dispatch({
            type: reset ? types.GET_BLOGS_FOLLOWING_FAILURE : types.GET_MORE_BLOGS_FOLLOWING_FAILURE,
            payload: e.message
        })
    }
}


