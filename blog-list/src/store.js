import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const reducer = {
	notification: notificationReducer,
	blogs: blogReducer,
	user: userReducer
}

const store = configureStore({
	reducer
})

export default store