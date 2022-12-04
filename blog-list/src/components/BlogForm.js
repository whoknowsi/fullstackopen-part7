import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogFrom = ({ newBlogEntryRef }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')
	const dispatch = useDispatch()

	const clearForm = () => {
		setTitle('')
		setAuthor('')
		setUrl('')
		newBlogEntryRef.current.toggleVisibility()
	}

	const handleSubmitBlogEntry = (e) => {
		e.preventDefault()
		const blog = { title, author, url }
		dispatch(createBlog(blog, clearForm))
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleSubmitBlogEntry}>
				<div>
					title
					<input
						id="title"
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						id="author"
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					url
					<input
						id="url"
						type="text"
						value={url}
						name="URL"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default BlogFrom
