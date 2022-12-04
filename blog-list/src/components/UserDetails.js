import { useMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserDetails = () => {
	const userId = useMatch('/users/:id').params.id
	const user = useSelector(state => state.users.find(user => user.id === userId))

	return (
		user && (
			<div>
				<h2>{user.name}</h2>
				<h3>added blogs</h3>
				<ul>
					{user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
				</ul>
			</div>
		)
	)
}

export default UserDetails