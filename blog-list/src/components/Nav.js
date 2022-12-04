import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Navigator = () => {
	const dispatch = useDispatch()
	const username = useSelector(state => state.user.name)

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
			<Container>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to='/'>Blogs</Nav.Link>
						<Nav.Link as={Link} to='/users'>Users</Nav.Link>
					</Nav>
					<Nav className='text-light d-flex align-items-center gap-3'>
						{username} logged in <Button variant="secondary" onClick={handleLogout}>logout</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>

	)
}


export default Navigator