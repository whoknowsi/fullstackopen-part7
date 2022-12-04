import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'

const reducer = {
	notification: notificationReducer
}

const store = configureStore({
	reducer
})

export default store