import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const Header = () => {
	const dispatch = useDispatch()
	const username = useSelector(state => state.user.name)

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	return (
		<div>
			<h2>blogs</h2>
			<p>
				{username} logged in <button onClick={handleLogout}>logout</button>
			</p>
		</div>
	)
}


export default Header