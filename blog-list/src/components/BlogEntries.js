import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blogs from './Blogs'


const blogEntries = () => {
	const newBlogEntryRef = useRef()
	const dispatch = useDispatch()
	const username = useSelector(state => state.user.name)

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	return (
		<div>
			<h2>blogs</h2>
			<p>
				{username} logged in <button onClick={handleLogout}>logout</button>
			</p>
			<Togglable buttonLabel="new blog" ref={newBlogEntryRef}>
				<BlogForm newBlogEntryRef={newBlogEntryRef}/>
			</Togglable>
			<Blogs/>
		</div>
	)
}

export default blogEntries