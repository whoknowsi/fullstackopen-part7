import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { deleteBlog, likeBlog, addComment } from '../reducers/blogReducer'

import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

const Comment = ({ comment }) => <ListGroup.Item>{comment}</ListGroup.Item>

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
				<Card style={{ width: '18rem' }}>
					<Card.Body>
						<Card.Title>{blog.title}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">author: {blog.author}</Card.Subtitle>
					</Card.Body>
					<ListGroup className="list-group-flush">
						<ListGroup.Item>url: <a href={blog.url}>{blog.url}</a></ListGroup.Item>
						<ListGroup.Item>{blog.likes} likes <Button variant="success" onClick={handleLike}>like</Button></ListGroup.Item>
						<ListGroup.Item>added by {blog.user.username} {username === blog.user.username && <Button variant="danger" onClick={handleDelete}>remove</Button>}</ListGroup.Item>
					</ListGroup>
				</Card>
				<h3>Comments</h3>
				<Form onSubmit={handleSubmitComment}>
					<InputGroup >
						<Form.Control type="text" name="comment" />
						<Button type="submit">add comment</Button>
					</InputGroup>

				</Form>
				<ListGroup>
					{blog.comments.map(({ id, comment }) => <Comment key={id} comment={comment} />)}
				</ListGroup>

			</>)
	)

}

export default Blog
