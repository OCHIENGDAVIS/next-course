import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ProductsPage() {
	const router = useRouter();
	const { name } = router.query;
	return (
		<div>
			<h2>this is the products page for {name}</h2>;
			<ul>
				<li>
					<Link href={`/clients/${name}/1`}>Crawler Project</Link>
				</li>
				<li>
					<Link href={`/clients/${name}/2`}>Blog Project</Link>
				</li>
				<li>
					<Link href={`/clients/${name}/3`}>CLI Project</Link>
				</li>
				<li>
					<Link href={`/clients/${name}/4`}>WEB Project</Link>
				</li>
			</ul>
		</div>
	);
}
