import { useRef, useState } from 'react';

import classes from './newsletter-registratiion.module.css';

function NewsletterRegistration() {
	const emailRef = useRef();
	const [emailInputError, setEmailInputError] = useState(false);
	async function registrationHandler(event) {
		event.preventDefault();
		const email = emailRef.current.value;

		if (!email) {
			setEmailInputError(true);
			return;
		}
		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ email: email }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		setEmailInputError(false);
		console.log(data);
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
