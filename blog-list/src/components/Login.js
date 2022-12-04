import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

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
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						id='username'
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					></input>
				</div>
				<div>
					password
					<input
						id='password'
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					></input>
				</div>
				<button id='submit-button' type="submit">login</button>
			</form>
		</div>
	)
}

export default Login
