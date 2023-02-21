import { useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comment.module.css';

function Comments(props) {
	const { eventId } = props;

	const [showComments, setShowComments] = useState(false);

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus);
	}

	async function addCommentHandler(commentData) {
		commentData.event = eventId; // ! associating a comment with an event
		// send data to API
		console.log(commentData);
		const response = await fetch('/api/comments', {
			method: 'POST',
			body: JSON.stringify(commentData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		console.log(data);
	}

	return (
		<section className={classes.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? 'Hide' : 'Show'} Comments
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && <CommentList />}
		</section>
	);
}

export default Comments;
