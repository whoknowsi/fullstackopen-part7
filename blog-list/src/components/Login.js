import loginService from '../services/login'
import blogsService from '../services/blogs'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'

const Login = ({ setUser }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const handleLogin = async (e) => {
		e.preventDefault()
		try {
			const user = await loginService.login(username, password)
			window.localStorage.setItem('user', JSON.stringify(user))
			blogsService.setToken(user.token)
			setUser(user)

			const message = `Welcome ${user.name}`
			dispatch(createNotification(message, 'success', 5))

			setUsername('')
			setPassword('')
		} catch (error) {
			const message = error.response.data.error
			dispatch(createNotification(`${message}`, 'error', 5))
		}
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


Login.propTypes = {
	setUser: PropTypes.func.isRequired,
}

export default Login
