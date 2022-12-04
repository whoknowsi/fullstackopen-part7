import { useSelector } from 'react-redux'
import Alert  from 'react-bootstrap/Alert'

const Notification = () => {
	const notification = useSelector(state => state.notification)
	return (
		notification.notification ? (
			<Alert variant={notification.status === 'error' ? 'danger' : 'success'}>
				{notification.notification}
			</Alert>
		) : null

	)
}

export default Notification
