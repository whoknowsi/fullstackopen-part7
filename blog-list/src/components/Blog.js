import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
	const [view, setView] = useState(false)
	const dispatch = useDispatch()
	const username = useSelector(state => state.user.username)

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

	const toggleView = () => {
		setView(!view)
	}

	const details = () => {
		return (
			<>
				<div>{blog.url}</div>
				<div>
					likes {blog.likes} <button onClick={handleLike}>like</button>
				</div>
				<div>{blog.user.username}</div>
				{username === blog.user.username && <button onClick={handleDelete}>remove</button>}
			</>
		)
	}

	return (
		<div className="blogEntry">
			{blog.title} {blog.author} <button onClick={toggleView}>{view ? 'hide' : 'view'}</button>
			{view && details()}
		</div>
	)
}

export default Blog
