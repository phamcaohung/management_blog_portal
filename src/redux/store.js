import { configureStore } from "@reduxjs/toolkit"
import { token } from "../middleware/token"
import rootReducer from "./reducers"
import { initializeAuth } from "./actions/authAction"
import { initializeAdmin } from "./actions/adminAction"

const store = configureStore({
    reducer: rootReducer,
    middleware: (getMiddleware) => getMiddleware().concat(token)
})

store.dispatch(initializeAuth())
store.dispatch(initializeAdmin())

export default store