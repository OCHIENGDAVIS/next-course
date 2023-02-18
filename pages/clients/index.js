import Link from 'next/link';

export default function ClientHomePage() {
	return (
		<div>
			<h1>client page</h1>
			<ul>
				<li>
					<Link href="/clients/davis">Davis </Link>
				</li>
				<li>
					<Link href="/clients/james">James </Link>
				</li>
				<li>
					<Link href="/clients/john ">John </Link>
				</li>
			</ul>
		</div>
	);
}
