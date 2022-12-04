import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogEntries from './components/BlogEntries'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeUser } from './reducers/userReducer'

const App = () => {
	const user = useSelector(state => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUser())
	}, [])

	return (
		<div>
			<Notification />
			{user ? (
				<BlogEntries />
			) : (
				<Togglable buttonLabel="login">
					<Login/>
				</Togglable>
			)}
		</div>
	)
}

export default App
