export default function UserProfile(props) {
	return <p>user {props.username}</p>;
}

export async function getServerSideProps(context) {
	const { params, req, res } = context;
	console.log(req);
	console.log(res);
	return {
		props: {
			username: 'Davis',
		},
	};
}
