import { useRouter } from 'next/router';

export default function ProductId() {
	const router = useRouter();
	const { projectId } = router.query; // * Values entered in the URL
	// ! use these values to fetch the values from the backend

	return <h2>specific project ID: {projectId}</h2>;
}
