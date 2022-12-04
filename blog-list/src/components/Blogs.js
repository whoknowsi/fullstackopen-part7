import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { useEffect } from 'react'
import Blog from './Blog'

const Blogs = () => {
	const dispatch = useDispatch()
	const blogs = useSelector(state => [...state.blogs].sort((a, b) => b.likes - a.likes))

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [])

	return (
		<>
			{
				blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
					/>
				))
			}
		</>

	)
}

export default Blogs