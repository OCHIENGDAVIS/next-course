import { useRef, useState, useContext } from 'react';

import NotificationContext from '@/store/notification-context';

import classes from './newsletter-registratiion.module.css';

function NewsletterRegistration() {
	const ctx = useContext(NotificationContext);

	const emailRef = useRef();
	const [emailInputError, setEmailInputError] = useState(false);
	async function registrationHandler(event) {
		event.preventDefault();
		const email = emailRef.current.value;

		if (!email) {
			setEmailInputError(true);
			return;
		}

		try {
			ctx.showNotification({
				title: 'New letter Sign up',
				message: 'Registerig for a news letter',
				status: 'pending',
			});
			const response = await fetch('/api/users', {
				method: 'POST',
				body: JSON.stringify({ email: email }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			setEmailInputError(false);
			ctx.showNotification({
				title: 'success',
				message: 'sign up successful',
				status: 'success',
			});
		} catch (error) {
			ctx.showNotification({
				title: 'fail',
				message: error.message || 'something went wrong',
				status: 'error',
			});
			console.log(error);
		}
	}

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={registrationHandler}>
				{emailInputError && (
					<span className={classes.error}>Email canot be null</span>
				)}
				<div className={classes.control}>
					<input
						type="email"
						id="email"
						placeholder="Your email"
						aria-label="Your email"
						ref={emailRef}
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
}

export default NewsletterRegistration;
