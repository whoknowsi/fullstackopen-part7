import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

import Togglable from './Togglable'
import BlogForm from './BlogForm'

const BlogLink = ({ blog }) => {
	const style = {
		padding: 5,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	return (
		<ListGroup style={style}>
			<ListGroup.Item><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></ListGroup.Item>
		</ListGroup>
	)
}

const blogEntries = () => {
	const newBlogEntryRef = useRef()
	const blogs = useSelector(state => state.blogs)

	return (
		<div>
			<Togglable buttonLabel="new blog" ref={newBlogEntryRef}>
				<BlogForm newBlogEntryRef={newBlogEntryRef}/>
			</Togglable>
			<div>
				{blogs.map(blog => <BlogLink key={blog.id} blog={blog} />)}
			</div>
		</div>
	)
}

export default blogEntries