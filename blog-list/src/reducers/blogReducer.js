import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import { createNotification } from './notificationReducer'

const initialState = []
const blogsSlice = createSlice({
	name: 'blogs',
	initialState,
	reducers: {
		setBlogs(state, action) {
			return action.payload
		},
		addBlog(state, action) {
			return [...state, action.payload]
		}
	}
})

const { setBlogs, addBlog } = blogsSlice.actions

export const initializeBlogs = () => {
	return async (dispatch) => {
		try {
			const blogs = await blogsService.getAll()
			dispatch(setBlogs(blogs))
		} catch (error) {
			const message = error.response.status === 500 ? 'Server error - unable to load blogs' : error.response.data.error
			dispatch(createNotification(message, 'error', 5))
		}
	}
}

export const createBlog = (blog) => {
	return async (dispatch) => {
		try {
			const newBlog = await blogsService.createBlogEntry(blog)
			dispatch(addBlog(newBlog))

			const message = `A new blog ${blog.title} by ${blog.author} added`
			dispatch(createNotification(message, 'success', 5))
		} catch (error) {
			const message = error.response.data.error
			dispatch(createNotification(message, 'error', 5))
		}

	}
}

export default blogsSlice.reducer