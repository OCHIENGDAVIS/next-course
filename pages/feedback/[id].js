import { getFeedBackData } from '../api/feedback';

export default function FeedbackDetail({ feedback }) {
	console.log(feedback);
	const { subject, comment } = feedback;
	return (
		<div>
			<h1>{subject}</h1>
			<p>{comment}</p>
		</div>
	);
}

export async function getStaticProps(context) {
	const { params } = context;
	const { id } = params;
	const data = getFeedBackData();
	const feedback = data.find((item) => item.id === id);
	if (!feedback) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			feedback,
		},
	};
}

export async function getStaticPaths() {
	const data = getFeedBackData();
	const paths = data.map((feedback) => ({ params: { id: feedback.id } }));
	return {
		paths,
		fallback: 'blocking',
	};
}
