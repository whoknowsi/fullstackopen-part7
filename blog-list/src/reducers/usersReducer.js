import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = []
const usersSlice = createSlice({
	name: 'users',
	initialState: initialState,
	reducers: {
		setUsers(state, action) {
			return action.payload
		}
	}
})

const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
	return async dispatch => {
		const response = await userService.getAll()
		dispatch(setUsers(response))
	}
}


export default usersSlice.reducer