
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { Route, Routes } from 'react-router-dom'

import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogEntries from './components/BlogEntries'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import Nav from './components/Nav'
import Blog from './components/Blog'

const App = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUser())
		dispatch(initializeUsers())
		dispatch(initializeBlogs())
	}, [])

	return (
		<div>
			{user ? (
				<>
					<Nav />
					<Notification />
					<h2>blogs</h2>
					<Routes>
						<Route path="/users" element={<Users />} />
						<Route path="/users/:id" element={<UserDetails />} />
						<Route path="/blogs/:id" element={<Blog />} />
						<Route path="/" element={<BlogEntries />} />
					</Routes>
				</>
			) : (
				<>
					<Notification />
					<Togglable buttonLabel="login">
						<Login/>
					</Togglable>
				</>


			)}
		</div>
	)
}

export default App
