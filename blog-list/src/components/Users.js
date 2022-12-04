import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/usersReducer'

import Table from 'react-bootstrap/Table'

const User = ({ user }) => {
	return (
		<tr>
			<td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
			<td>{user.blogs.length}</td>
		</tr>
	)
}

const Users = () => {
	const users = useSelector(state => state.users)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeUsers())
	}, [])


	return (
		<div>
			<h2>Users</h2>

			<Table>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => <User key={user.id} user={user} />)}
				</tbody>
			</Table>

		</div>
	)
}

export default Users