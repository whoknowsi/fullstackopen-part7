import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const clearForm = () => {
		setUsername('')
		setPassword('')
	}

	const handleLogin = async (e) => {
		e.preventDefault()
		dispatch(loginUser({ username, password }, clearForm))
	}

	return (
		<div>
			<h2>Log in to application</h2>
			<Form onSubmit={handleLogin}>
				<Form.Group className="mb-3">
					<Form.Label>Username</Form.Label>
					<Form.Control
						id='username'
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					></Form.Control>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						id='password'
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					></Form.Control>
				</Form.Group>
				<Button variant="primary" id='submit-button' type="submit">login</Button>
			</Form>
		</div>
	)
}

export default Login
