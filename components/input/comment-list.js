import { useEffect, useState } from 'react';

import classes from './comment-list.module.css';

function CommentList() {
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	useEffect(() => {
		fetch('/api/comments')
			.then((res) => {
				res.json().then((data) => {
					setComments(data.comments);
					setLoading(false);
					setError(false);
				});
			})
			.catch((error) => {
				setLoading(false);
				setError(true);
			});
	}, []);

	return (
		<ul className={classes.comments}>
			{loading && <h3>loading comments...</h3>}
			{error && <h3>error while loadng comments</h3>}
			{comments.length > 0 &&
				comments.map((comment) => {
					return (
						<li key={comment._id}>
							<p>{comment.text}</p>
							<div>
								By <address>{comment.name}</address>
							</div>
						</li>
					);
				})}
		</ul>
	);
}

export default CommentList;
