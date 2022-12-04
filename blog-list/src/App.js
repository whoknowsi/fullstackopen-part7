import { useState, useEffect, useRef } from 'react'

import Login from './components/Login'
import BlogForm from './components/BlogForm'
import blogsService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogs from './components/Blogs'

const App = () => {
	const [user, setUser] = useState()
	const newBlogEntryRef = useRef()

	useEffect(() => {
		const foundUserLocalStorage = window.localStorage.getItem('user')
		if (foundUserLocalStorage) {
			const userParsed = JSON.parse(foundUserLocalStorage)
			blogsService.setToken(userParsed.token)
			setUser(userParsed)
		}
	}, [])

	const handleLogout = () => {
		window.localStorage.removeItem('user')
		blogsService.setToken('')
		setUser('')
	}

	const blogEntries = () => {
		return (
			<div>
				<h2>blogs</h2>
				<p>
					{user.name} logged in <button onClick={handleLogout}>logout</button>
				</p>
				<Togglable buttonLabel="new blog" ref={newBlogEntryRef}>
					<BlogForm newBlogEntryRef={newBlogEntryRef}/>
				</Togglable>
				<Blogs user={user}/>
			</div>
		)
	}

	return (
		<div>
			<Notification />
			{user ? (
				blogEntries()
			) : (
				<Togglable buttonLabel="login">
					<Login
						setUser={setUser}
					/>
				</Togglable>
			)}
		</div>
	)
}

export default App
