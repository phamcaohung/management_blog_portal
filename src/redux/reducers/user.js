import * as types from '../constants/userConstants'
import * as blogTypes from "../constants/blogContants"


const initialState = {
    user: null,
    users: [],
    usersError: null,
    followingError: null,
    unFollowingError: null
}

const userReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case types.SET_USER:
            return {
                ...state,
                user: payload
            }
        case types.GET_USERS_SUCCESS:
            return {
                ...state,
                users: payload
            }
        case types.GET_USERS_FAILURE:
            return {
                ...state,
                usersError: payload
            }
        case types.FOLLOW_USER_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    following: payload
                }
            }
        case types.FOLLOW_USER_FAILURE:
            return {
                ...state,
                followingError: payload
            }
        case types.UNFOLLOW_USER_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    following: payload
                }
            }
        case types.UNFOLLOW_USER_FAILURE:
            return {
                ...state,
                unFollowingError: payload
            }
        case blogTypes.SAVE_BLOG_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    saveBlog: payload
                },
            }
        case blogTypes.SAVE_BLOG_FAILURE:
            return {
                ...state,
                saveBlogError: payload
            }
        case blogTypes.UNSAVE_BLOG_SUCCESS:

            return {
                ...state,
                user: {
                    ...state.user,
                    saveBlog: payload
                }
            }
        case blogTypes.UNSAVE_BLOG_FAILURE:
            return {
                ...state,
                saveBlogError: payload
            }
        default:
            return state
    }
}

export default userReducer