import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

const UserDetails = () => {
	const userId = useMatch('/users/:id').params.id
	const user = useSelector(state => state.users.find(user => user.id === userId))

	return (
		user && (
			<Card>
				<Card.Body>
					<Card.Title>{user.name}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">added blogs: </Card.Subtitle>
					<Card.Text>
						<ListGroup>
							{user.blogs.map(blog => <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>)}
						</ListGroup>
					</Card.Text>
				</Card.Body>
			</Card>
		)
	)
}

export default UserDetails