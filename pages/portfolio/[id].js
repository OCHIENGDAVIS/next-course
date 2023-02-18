import { useRouter } from 'next/router';

export default function Details() {
	const router = useRouter();
	const { id } = router.query;
	// ! send a request to the backend with the id

	return <h1>details page for Id {id} </h1>;
}
