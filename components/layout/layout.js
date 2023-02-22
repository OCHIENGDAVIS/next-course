import { Fragment, useContext } from 'react';

import Notification from '../ui/notification/notification';
import NotificationContext from '@/store/notification-context';

import MainHeader from './main-header/main-header';

export default function Layout(props) {
	const notificationContext = useContext(NotificationContext);
	const activeNotification = notificationContext.notification;
	return (
		<Fragment>
			<MainHeader />
			<main>{props.children}</main>
			{activeNotification && (
				<Notification
					title={activeNotification.title}
					message={activeNotification.message}
					status={activeNotification.status}
				/>
			)}
		</Fragment>
	);
}
