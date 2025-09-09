import * as types from "../constants/adminContants"

const initialState = {
    admin: null,
    users: null,
    blogs: null,
    totalBlogs: 0,

    signInError: null,
    usersError: null,
    blogsError: null,
    blogsMoreError: null,
    usersMoreError: null,
    deleteBlogError: null,
    deleteUserError: null,
}

const adminReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case types.SIGN_IN_SUCCESS:
            return {
                ...state,
                admin: payload,
                signInError: null
            }
        case types.SIGN_IN_FAILURE:
            return {
                ...state,
                signInError: payload
            }
        case types.GET_USERS_SUCCESS:
            return {
                ...state,
                users: payload,
                usersError: null
            }
        case types.GET_USERS_FAILURE:
            return {
                ...state,
                usersError: payload
            }
        case types.GET_USERS_MORE_SUCCESS:
            return {
                ...state,
                users: [...state.users, ...payload],
                usersMoreError: null,
            }
        case types.GET_USERS_MORE_FAILURE: 
            return {
                ...state,
                usersMoreError: payload
            }
        case types.GET_BLOGS_SUCCESS:
            return {
                ...state,
                blogs: payload.blogs,
                totalBlogs: payload.totalBlogs || 0,
                blogsError: null
            }
        case types.GET_BLOGS_FAILURE:
            return {
                ...state,
                blogsError: payload
            }
        case types.GET_MORE_BLOGS_SUCCESS:
            return {
                ...state,
                blogs: [...state.blogs, ...payload.blogs],
                totalBlogs: payload?.totalBlogs || 0,
                blogsMoreError: null
            }
        case types.GET_MORE_BLOGS_FAILURE:
            return {
                ...state,
                blogsMoreError: payload
            }
        case types.DELETE_BLOG_SUCCESS:
            return {
                ...state,
                blogs: state.blogs.filter(item => item._id !== payload),
                deleteBlogError: null
            }
        case types.DELETE_BLOG_FAILURE:
            return {
                ...state,
                deleteBlogError: payload
            }
        case types.DELETE_USER_SUCCESS: 
            return {
                ...state,
                users: state.users.filter(item => item._id !== payload),
                deleteUserError: null
            }
        case types.DELETE_USER_FAILURE:
            return {
                ...state,
                deleteUserError: payload
            }
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                admin: null,
                users: null,
                blogs: null,
                totalBlogs: 0,
                signInError: null,
                usersError: null,
                blogsError: null,
                blogsMoreError: null
            }
        default:
            return state;
    }
}

export default adminReducer