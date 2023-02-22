import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export function NotificationContextProvider(props) {
	const [activeNotification, setActiveNotification] = useState(null);

	useEffect(() => {
		if (
			activeNotification &&
			(activeNotification.status === 'success' ||
				activeNotification.status === 'error')
		) {
			const timer = setTimeout(() => {
				setActiveNotification(null);
			}, 3000);
			return () => {
				clearTimeout(timer);
			};
		}
	}, [activeNotification]);

	function showNotificationHandler(notificationData) {
		setActiveNotification(notificationData);
	}

	function hideNotificationHandler() {
		setActiveNotification(null);
	}

	const value = {
		notification: activeNotification,
		showNotification: showNotificationHandler,
		hideNotification: hideNotificationHandler,
	};

	return (
		<NotificationContext.Provider value={value}>
			{props.children}
		</NotificationContext.Provider>
	);
}

export default NotificationContext;
