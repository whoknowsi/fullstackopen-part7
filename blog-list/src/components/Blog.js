import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { deleteBlog, likeBlog, addComment } from '../reducers/blogReducer'

const Comment = ({ comment }) => <li>{comment}</li>

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

	const handleSubmitComment = (e) => {
		e.preventDefault()
		const comment = e.target.comment.value
		dispatch(addComment(blog, comment, e.target))
	}

	return (
		blog && (
			<>
				<h2>{blog.title} {blog.author}</h2>
				<a href={blog.url}>{blog.url}</a>
				<div>
					{blog.likes} likes <button onClick={handleLike}>like</button>
				</div>
				<div>added by {blog.user.username}</div>

				{username === blog.user.username && <button onClick={handleDelete}>remove</button>}

				<h3>Comments</h3>
				<form onSubmit={handleSubmitComment}>
					<input type="text" name="comment" />
					<button type="submit">add comment</button>
				</form>
				<ul>
					{blog.comments.map(({ id, comment }) => <Comment key={id} comment={comment} />)}
				</ul>

			</>)
	)

}

export default Blog
