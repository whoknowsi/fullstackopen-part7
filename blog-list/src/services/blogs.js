import axios from 'axios'
const baseUrl = '/api/blogs'

const setToken = (newToken) => {
	axios.defaults.headers.common['Authorization'] = `bearer ${newToken}`
}

const getAll = async () => {
	const res = await axios.get(baseUrl)
	return res.data
}

const createBlogEntry = async (data) => {
	const res = await axios.post(baseUrl, data)
	return res.data
}

const likeBlog = async (data) => {
	const res = await axios.put(baseUrl + '/' + data.id, data)
	return res.data
}

const deleteBlog = async (id) => {
	const res = await axios.delete(baseUrl + '/' + id)
	return res
}

const commentBlog = async (id, comment) => {
	const res = await axios.post(baseUrl + '/' + id + '/comments', comment)
	return res.data
}
export default {
	setToken,
	getAll,
	createBlogEntry,
	likeBlog,
	deleteBlog,
	commentBlog
}




