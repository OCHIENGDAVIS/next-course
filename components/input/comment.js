import { useState, useContext } from 'react';

import NotificationContext from '@/store/notification-context';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comment.module.css';

function Comments(props) {
	const ctx = useContext(NotificationContext);
	console.log(ctx);
	const { eventId } = props;

	const [showComments, setShowComments] = useState(false);

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus);
	}

	async function addCommentHandler(commentData) {
		commentData.event = eventId; // ! associating a comment with an event
		// send data to API
		try {
			ctx.showNotification({
				title: 'pending',
				message: 'sending comment',
				status: 'pending',
			});
			const response = await fetch('/api/comments', {
				method: 'POST',
				body: JSON.stringify(commentData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			await response.json();
			ctx.showNotification({
				title: 'success',
				message: 'comment sucessful',
				status: 'success',
			});
		} catch (error) {
			ctx.showNotification({
				title: 'fail',
				message: error.message || 'something went wrong',
				status: 'error',
			});
		}
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
