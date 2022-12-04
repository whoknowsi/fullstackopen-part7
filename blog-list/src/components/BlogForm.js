import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
			<Form onSubmit={handleSubmitBlogEntry}>
				<Form.Group>
					<Form.Label>title:</Form.Label>
					<Form.Control
						id="title"
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>author:</Form.Label>
					<Form.Control
						id="author"
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>url:</Form.Label>
					<Form.Control
						id="url"
						type="text"
						value={url}
						name="URL"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</Form.Group>
				<Button type="submit">create</Button>
			</Form>
		</div>
	)
}

export default BlogFrom
