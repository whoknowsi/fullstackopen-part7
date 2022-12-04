import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { useEffect } from 'react'
import Blog from './Blog'

const Blogs = ({ user }) => {
	const dispatch = useDispatch()
	const blogs = useSelector(state => [... state.blogs].sort((a, b) => b.likes - a.likes))

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	return (
		<>
			{
				blogs.map((blog) => (
					<Blog
						key={blog.id}
						username={user.username}
						blog={blog}
					/>
				))
			}
		</>

	)
}

export default Blogs