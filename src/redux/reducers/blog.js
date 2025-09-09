import * as types from '../constants/blogContants'
import * as reactionTypes from '../constants/reactionConstants'
import * as commentTypes from '../constants/commentContants'
import * as userTypes from "../constants/userConstants"


const initialState = {
    blog: null,
    blogs: [],
    profile: [],
    blogsFollowing: [],
    savedBlog: [],

    totalBlogs: 0,
    followingUsersBlogs: [],

    blogError: null,
    createError: null,
    updateError: null,
    deleteError: null,

    reactionError: null,
    commentError: null,
    profileError: null,
    savedBlogError: null,
    blogsFollowingError: null,
    reactCommentError: null,
}

const blogReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case types.CREATE_BLOG_SUCCESS:
            return {
                ...state,
                blogs: [payload, ...state.blogs],
                profile: state.profile.length !== 0 ? {
                    ...state.profile,
                    blogsLast30Days: [payload, ...state.profile.blogsLast30Days]
                } : [],
                createError: null
            }
        case types.CREATE_BLOG_FAILURE:
            return {
                ...state,
                createError: payload,

            }
        case types.UPDATE_BLOG_SUCCESS:
            return {
                ...state,
                blogs: state.blogs.map(item => item._id === payload._id ? payload : item),
                profile: state.profile.length !== 0 ? {
                    ...state.profile,
                    blogsLast30Days: state.profile.blogsLast30Days.map(item => item._id === payload._id ? payload : item)
                } : [],
                updateError: null
            }
        case types.UPDATE_BLOG_FAILURE:
            return {
                ...state,
                updateError: payload
            }
        case types.DELETE_BLOG_SUCCESS:
            return {
                ...state,
                blogs: state.blogs.filter(item => item._id !== payload),
                profile: state.profile.length !== 0 ? {
                    ...state.profile,
                    blogsLast30Days: state.profile.blogsLast30Days.filter(item => item._id !== payload)
                } : [],
                deleteError: null
            }
        case types.DELETE_BLOG_FAILURE:
            return {
                ...state,
                deleteError: payload
            }
        case types.GET_BLOGS_SUCCESS:
            return {
                ...state,
                blogs: payload.blogs,
                totalBlogs: payload ? payload.totalBlogs : 0,
                blogError: null,
            }
        case types.GET_BLOGS_FAILURE:
            return {
                ...state,
                blogError: payload,
            }
        case types.GET_BLOG_BY_ID_SUCCESS:           
            return {
                ...state,
                blog: payload,
                blogError: null
            }
        case types.GET_BLOG_BY_ID_FAILURE:
            return {
                ...state,
                blogError: payload
            }
        case reactionTypes.REACTION_BLOG_SUCCESS:
            return {
                ...state,
                blogs: addReaction(state.blogs, payload),
                blogsFollowing: addReaction(state.blogsFollowing, payload),
                reactionError: null
            }
        case reactionTypes.REACTION_BLOG_FAILURE:
            return {
                ...state,
                reactionError: payload
            }
        case reactionTypes.UNREACTION_BLOG_SUCCESS:
            return {
                ...state,
                blogs: removeReaction(state.blogs, payload),
                blogsFollowing: removeReaction(state.blogsFollowing, payload),
                reactionError: null
            }
        case reactionTypes.UNREACTION_BLOG_FAILURE:
            return {
                ...state,
                reactionError: payload
            }
        case commentTypes.ADD_COMMENT_SUCCESS:
            return {
                ...state,
                blogs: addComment(state.blogs, payload),
                blogsFollowing: addComment(state.blogsFollowing, payload),
                commentError: null
            }
        case commentTypes.ADD_COMMENT_FAILURE:
            return {
                ...state,
                commentError: payload
            }
        case commentTypes.DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                blogs: removeComment(state.blogs, payload),
                blogsFollowing: removeComment(state.blogs, payload),
                commentError: null
            }
        case reactionTypes.REACTION_COMMENT_SUCCESS:
            return {
                ...state,
                blogs: reactionComment(state.blogs, payload),
                blogsFollowing: reactionComment(state.blogs, payload),
                reactCommentError: null
            }
        case reactionTypes.REACTION_COMMENT_FAILURE:
            return {
                ...state,
                reactCommentError: payload
            }
        case userTypes.GET_PROFILE_BY_ID_SUCCESS:
            return {
                ...state,
                profile: payload ? payload : [],
                profileError: null
            }
        case userTypes.GET_PROFILE_BY_ID_FAILURE:
            return {
                ...state,
                profileError: payload
            }
        case types.GET_BLOGS_SAVE_SUCCESS:
            return {
                ...state,
                savedBlog: payload,
                savedBlogError: null
            }
        case types.GET_BLOGS_SAVE_FAILURE:
            return {
                ...state,
                savedBlogError: payload
            }
        case types.GET_MORE_BLOGS_SUCCESS:
            return {
                ...state,
                blogs: [...state.blogs, ...payload.blogs],
                totalBlogs: payload?.totalBlogs || 0,
                blogError: null
            }
        case types.GET_BLOGS_FOLLOWING_SUCCESS:
            return {
                ...state,
                blogsFollowing: payload,
                blogsFollowingError: null
            }
        case types.GET_BLOGS_FOLLOWING_FAILURE:
            return {
                ...state,
                blogsFollowingError: payload
            }
        case types.GET_MORE_BLOGS_FOLLOWING_SUCCESS:
            return {
                ...state,
                blogsFollowing: [...state.blogsFollowing, ...payload],
                blogsFollowingError: null
            }
        case types.GET_MORE_BLOGS_FOLLOWING_FAILURE:
            return {
                ...state,
                blogsFollowingError: payload
            }
        case types.UNSAVE_BLOG_SUCCESS:
            return {
                ...state,
                savedBlog: state.savedBlog.filter(item => payload.includes(item.blog._id))
            }
        default:
            return state
    }
}

const addComment = (data, payload) => {
    return data.map(item => item._id === payload.blog ?
        {
            ...item,
            comments: [...item.comments, payload]
        } : item
    )
}

const removeComment = (data, payload) => {
    return data.map(item => item._id === payload._id ? 
        {
            ...item,
            comments: item.comments.filter(x => x._id !== payload.commentId)
        } : item
    )
}

const addReaction = (data, payload) => {
    return data.map(item => item._id === payload.blog ?
        {
            ...item,
            reactions: [...item.reactions, payload]
        } : item
    )
}

const removeReaction = (data, payload) => {
    return data.map(item => item._id === payload._id ?
        {
            ...item,
            reactions: payload.reactions
        } : item
    )
}

const reactionComment = (data, payload) => {
    return data.map(item => item._id === payload.blog ?
        {
            ...item,
            comments: item.comments.map(x => x._id === payload.comment ?
                {
                    ...x,
                    reactions: [...x.reactions, payload]
                } : x
            ) 
        } : item
    )
}

export default blogReducer

