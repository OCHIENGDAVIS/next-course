import { useRef, useState } from 'react';
import { getFeedBackData } from '../api/feedback';

import Link from 'next/link';

export default function FeedBack(props) {
	const [feedbacks, setFeedBacks] = useState(props.feedbacks);
	const emailRef = useRef();
	const subjectRef = useRef();
	const commentRef = useRef();
	async function handleSubmit(e) {
		e.preventDefault();
		const email = emailRef.current.value;
		const subject = subjectRef.current.value;
		const comment = commentRef.current.value;
		const response = await fetch('/api/feedback', {
			method: 'POST',
			body: JSON.stringify({
				email,
				subject,
				comment,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		console.log(data);
	}

	async function loadFeedBack() {
		const response = await fetch('/api/feedback');
		const data = await response.json();
		console.log(data);
		setFeedBacks(data.feedbacks);
	}

	return (
		<div>
			<form action="" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email</label>
					<input type="email" id="email" ref={emailRef} />
				</div>
				<div>
					<label htmlFor="email">Subject</label>
					<input type="text" id="subject" ref={subjectRef} />
				</div>
				<div>
					<label htmlFor="comment">Comment </label>
					<textarea id="comment" ref={commentRef}></textarea>
				</div>
				<div>
					<button>Submit</button>
				</div>
			</form>
			<hr />
			<button onClick={loadFeedBack}>Load Feedback</button>
			{feedbacks &&
				feedbacks.map((feedback) => {
					return (
						<li key={feedback.id}>
							<Link href={`/feedback/${feedback.id}`}>
								{feedback.subject}
							</Link>
						</li>
					);
				})}
		</div>
	);
}

export async function getStaticProps(context) {
	const data = getFeedBackData();
	return {
		props: {
			feedbacks: data,
		},
		revalidate: 30,
	};
}
