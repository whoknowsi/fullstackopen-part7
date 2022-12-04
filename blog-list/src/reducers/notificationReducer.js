import { createSlice } from '@reduxjs/toolkit'

const initialState = { notification: '', status: '', timeout: null }

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		setNotification(state, action) {
			state.timeout && clearTimeout(state.timeout)
			return action.payload
		},
	}
})

const { setNotification } = notificationSlice.actions

export const createNotification = (notification, status, time) => {
	return async dispatch => {
		const timeout = setTimeout(() => { dispatch(setNotification(initialState)) }, time * 1000)
		dispatch(setNotification({ notification, status, timeout }))
	}
}

export default notificationSlice.reducer