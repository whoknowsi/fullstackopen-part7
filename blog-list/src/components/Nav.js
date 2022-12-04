import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Nav = () => {
	const dispatch = useDispatch()
	const username = useSelector(state => state.user.name)

	const handleLogout = () => {
		dispatch(logoutUser())
	}

	const style = {
		backgroundColor: 'lightgrey',
		padding: '5px',
	}

	return (
		<div style={style}>
			<Link to="/">blogs</Link> <Link to="/users">users</Link> {username} logged in <button onClick={handleLogout}>logout</button>
		</div>
	)
}


export default Nav