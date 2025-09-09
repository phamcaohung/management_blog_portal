import { API } from '../../config/apiConfig'
import { setLocalStorageUser } from '../../config/authConfig'
import * as types from '../constants/userConstants'

export const getProfileByUser = (userId) => async (dispatch) => {
    try {
        const { data } = await API.get(`/users/profile/${userId}`)
        dispatch({ type: types.GET_PROFILE_BY_ID_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.GET_PROFILE_BY_ID_FAILURE, payload: e.message })
    }
}

export const getUsers = (name) => async (dispatch) => {
    try {
        const { data } = await API.get(`/users?name=${name}`)
        dispatch({ type: types.GET_USERS_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.GET_USERS_FAILURE, payload: e.message })
    }
}

export const followUser = (id) => async (dispatch) => {
    try {
        const { data } = await API.patch(`/users/${id}/follow`)
        setLocalStorageUser(data, "following")
        dispatch({ type: types.FOLLOW_USER_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.FOLLOW_USER_FAILURE, payload: e.message })
    }
}

export const unFollowUser = (id) => async (dispatch) => {
    try {
        const { data } = await API.patch(`/users/${id}/un-follow`)
        setLocalStorageUser(data, "following")
        dispatch({ type: types.UNFOLLOW_USER_SUCCESS, payload: data })
    } catch (e) {
        dispatch({ type: types.UNFOLLOW_USER_FAILURE, payload: e.message })
    }
}