import { createSlice } from '@reduxjs/toolkit'
import { createNotification } from './notificationReducer'
import blogsService from '../services/blogs'
import loginService from '../services/login'

const initialState = null
const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setUser(state, action) {
			window.localStorage.setItem('user', JSON.stringify(action.payload))
			blogsService.setToken(action.payload.token)
			return action.payload
		},
		logoutUser() {
			window.localStorage.removeItem('user')
			return null
		}
	}
})

const { setUser } = userSlice.actions
export const { logoutUser } = userSlice.actions

export const initializeUser = () => {
	return async (dispatch) => {
		const user = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null
		if (!user) return
		dispatch(setUser(user))
	}
}

export const loginUser = ({ username, password }, clearForm) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login(username, password)
			dispatch(setUser(user))
			clearForm()

			const message = `Welcome ${user.name}`
			dispatch(createNotification(message, 'success', 5))
		} catch (error) {
			const message = error.response.data.error
			dispatch(createNotification(message, 'error', 5))
		}
	}
}

export default userSlice.reducer