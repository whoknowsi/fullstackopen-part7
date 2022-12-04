import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const reducer = {
	notification: notificationReducer,
	blogs: blogReducer,
}

const store = configureStore({
	reducer
})

export default store