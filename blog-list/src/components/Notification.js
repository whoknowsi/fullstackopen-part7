import { useSelector } from 'react-redux'

const Notification = () => {
	const notification = useSelector(state => state.notification)
	return notification.notification ? <div className={'notification ' + notification.status}>{notification.notification}</div> : null
}

export default Notification
