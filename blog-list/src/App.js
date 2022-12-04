
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeUser } from './reducers/userReducer'
import { Route, Routes } from 'react-router-dom'

import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogEntries from './components/BlogEntries'
import Users from './components/Users'

const App = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUser())
	}, [])

	return (
		<div>
			<Notification />
			{user ? (
				<Routes>
					<Route path="/users" element={<Users />} />
					<Route path="/" element={<BlogEntries />} />
				</Routes>
			) : (
				<Togglable buttonLabel="login">
					<Login/>
				</Togglable>
			)}
		</div>
	)
}

export default App
