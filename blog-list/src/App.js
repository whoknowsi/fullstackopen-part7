import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import blogsService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { createNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState()
	const newBlogEntryRef = useRef()
	const dispatch = useDispatch()

	useEffect(() => {
		const getblogs = async () => {
			const blogsFound = await blogsService.getAll()
			setBlogs(blogsFound.sort(sortByLikes))
		}
		getblogs()
	}, [])

	useEffect(() => {
		const foundUserLocalStorage = window.localStorage.getItem('user')
		if (foundUserLocalStorage) {
			const userParsed = JSON.parse(foundUserLocalStorage)
			blogsService.setToken(userParsed.token)
			setUser(userParsed)
		}
	}, [])

	const sortByLikes = (a, b) => {
		return a.likes - b.likes
	}

	const handleLogout = () => {
		window.localStorage.removeItem('user')
		blogsService.setToken('')
		setUser('')
	}

	const createBlogEntry = async (data) => {
		try {
			const newBlog = await blogsService.createBlogEntry(data)

			const message = `A new blog ${newBlog.title} by ${newBlog.author} added`
			dispatch(createNotification(message, 'success', 5))
			setBlogs([...blogs, newBlog].sort(sortByLikes))
			newBlogEntryRef.current.toggleVisibility()
		} catch (error) {
			const message = error.response.data.error
			dispatch(createNotification(message, 'error', 5))
		}
	}

	const removeBlogEntry = async (data) => {
		await blogsService.deleteBlog(data.id)
		setBlogs(blogs.filter((x) => x.id !== data.id))
	}

	const updateBlogLikes = async (blog) => {
		const updatedLikeBlog = {
			...blog,
			likes: blog.likes + 1,
		}
		await blogsService.likeBlog(updatedLikeBlog.id, updatedLikeBlog)
		const updatedBlogs = await blogsService.getAll()
		setBlogs(updatedBlogs.sort(sortByLikes))
	}

	const blogEntries = () => {
		return (
			<div>
				<h2>blogs</h2>
				<p>
					{user.name} logged in <button onClick={handleLogout}>logout</button>
				</p>
				<Togglable buttonLabel="new blog" ref={newBlogEntryRef}>
					<BlogForm createBlogEntry={createBlogEntry} />
				</Togglable>
				{blogs.map((blog) => (
					<Blog
						key={blog.id}
						username={user.username}
						blog={blog}
						removeBlogEntry={removeBlogEntry}
						updateBlogLikes={updateBlogLikes}
					/>
				))}
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
