import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = () => {
	const dispatch = useDispatch()
	const username = useSelector(state => state.user.username)

	const match = useMatch('/blogs/:id')
	const blog = useSelector(state => state.blogs.find(blog => blog.id === match.params.id))

	const handleLike = async (e) => {
		const likeButton = e.target
		dispatch(likeBlog(blog, likeButton))
	}

	const handleDelete = (e) => {
		if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
			e.target.disabled = true
			dispatch(deleteBlog(blog.id))
		}
	}
	return (
		<>
			<h2>{blog.title} {blog.author}</h2>
			<a href={blog.url}>{blog.url}</a>
			<div>
				{blog.likes} likes <button onClick={handleLike}>like</button>
			</div>
			<div>added by {blog.user.username}</div>

			{username === blog.user.username && <button onClick={handleDelete}>remove</button>}
		</>
	)

}

export default Blog
