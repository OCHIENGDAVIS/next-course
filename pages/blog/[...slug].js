import { useRouter } from 'next/router';

export default function BlogPost() {
	const router = useRouter();
	console.log(router.query);
	return <h3>the Blog Post </h3>;
}
