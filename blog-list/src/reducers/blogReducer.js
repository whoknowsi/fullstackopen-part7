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
		},
		removeBlog(state, action) {
			return state.filter((blog) => blog.id !== action.payload)
		},
		updateBlog(state, action) {
			const updatedBlog = action.payload
			return state.map((blog) =>
				blog.id === updatedBlog.id ? updatedBlog : blog
			)
		}
	}
})

const { setBlogs, addBlog, removeBlog, updateBlog } = blogsSlice.actions

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

export const createBlog = (blog, clearForm) => {
	return async (dispatch) => {
		try {
			const newBlog = await blogsService.createBlogEntry(blog)
			dispatch(addBlog(newBlog))
			clearForm()

			const message = `A new blog ${blog.title} by ${blog.author} added`
			dispatch(createNotification(message, 'success', 5))
		} catch (error) {
			const message = error.response.data.error
			dispatch(createNotification(message, 'error', 5))
		}

	}
}

export const deleteBlog = (id) => {
	return async (dispatch) => {
		try {
			await blogsService.deleteBlog(id)
			dispatch(removeBlog(id))

			const message = 'Blog removed'
			dispatch(createNotification(message, 'success', 5))
		} catch (error) {
			const message = error.response.data.error
			dispatch(createNotification(message, 'error', 5))
		}
	}
}

export const likeBlog = (blog, likeButton) => {
	likeButton.disabled = true
	return async (dispatch) => {
		try {
			const updatedBlog = { ...blog, likes: blog.likes + 1 }
			await blogsService.likeBlog(updatedBlog)
			dispatch(updateBlog(updatedBlog))

			const message = `Blog ${updatedBlog.title} by ${updatedBlog.author} liked`
			dispatch(createNotification(message, 'success', 5))
		} catch (error) {
			const message = error.response.data.error
			dispatch(createNotification(message, 'error', 5))
		} finally {
			likeButton.disabled = false
		}
	}
}

export const addComment = (blog, userComment, commentForm) => {
	return async (dispatch) => {
		try {
			const { comment, id } = await blogsService.commentBlog(blog.id, { comment: userComment })
			const newComment = { comment, id }
			const updatedBlog = { ...blog, comments: blog.comments.concat(newComment) }

			dispatch(updateBlog(updatedBlog))

			const message = `Comment added to blog ${updatedBlog.title} by ${updatedBlog.author}`
			dispatch(createNotification(message, 'success', 5))
			commentForm.reset()
		} catch (error) {
			const message = error.response.data.error
			dispatch(createNotification(message, 'error', 5))
		}
	}
}

export default blogsSlice.reducer