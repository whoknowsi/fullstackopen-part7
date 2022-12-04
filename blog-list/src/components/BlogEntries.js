import { useRef } from 'react'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blogs from './Blogs'


const blogEntries = () => {
	const newBlogEntryRef = useRef()

	return (
		<div>
			<Togglable buttonLabel="new blog" ref={newBlogEntryRef}>
				<BlogForm newBlogEntryRef={newBlogEntryRef}/>
			</Togglable>
			<Blogs/>
		</div>
	)
}

export default blogEntries