import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import blogsService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, initializeBlogs } from './reducers/blogReducer'


const App = () => {
	const [user, setUser] = useState()
	const newBlogEntryRef = useRef()
	const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	useEffect(() => {
		const foundUserLocalStorage = window.localStorage.getItem('user')
		if (foundUserLocalStorage) {
			const userParsed = JSON.parse(foundUserLocalStorage)
			blogsService.setToken(userParsed.token)
			setUser(userParsed)
		}
	}, [])

	// const sortByLikes = (a, b) => {
	// 	return a.likes - b.likes
	// }

	const handleLogout = () => {
		window.localStorage.removeItem('user')
		blogsService.setToken('')
		setUser('')
	}

	const createBlogEntry = async (blog) => {
		dispatch(createBlog(blog))
		newBlogEntryRef.current.toggleVisibility()
	}

	const removeBlogEntry = async (data) => {
		await blogsService.deleteBlog(data.id)
		//setBlogs(blogs.filter((x) => x.id !== data.id))
	}

	const updateBlogLikes = async (blog) => {
		const updatedLikeBlog = {
			...blog,
			likes: blog.likes + 1,
		}
		await blogsService.likeBlog(updatedLikeBlog.id, updatedLikeBlog)
		await blogsService.getAll()
		//setBlogs(updatedBlogs.sort(sortByLikes))
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
