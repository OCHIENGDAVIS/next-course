import { useEffect, useState } from 'react';

import classes from './comment-list.module.css';

function CommentList() {
	const [comments, setComments] = useState([]);
	useEffect(() => {
		fetch('/api/comments').then((res) => {
			res.json().then((data) => {
				setComments(data.comments);
			});
		});
	}, []);
	console.log(comments);
	return (
		<ul className={classes.comments}>
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
