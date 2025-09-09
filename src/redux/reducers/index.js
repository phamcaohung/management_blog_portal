import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth";
import blogReducer from "./blog";
import userReducer from "./user";
import notificationReducer from "./notification";
import adminReducer from "./admin";



const rootReducer = combineReducers({
    auth: authReducer,
    blogs: blogReducer,
    users: userReducer,
    notification: notificationReducer,
    admin: adminReducer
})

export default rootReducer