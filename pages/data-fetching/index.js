import fs from 'fs/promises';
import path from 'path';

import Link from 'next/link';

export default function DataFetching(props) {
	const { products } = props;
	return (
		<div>
			<ul>
				{products.map((product) => {
					return (
						<li key={product.id}>
							<Link href={`/data-fetching/${product.id}`}>
								{product.title}
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export async function getStaticProps(context) {
	console.log(context);
	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);
	if (!data) {
		return {
			redirect: {
				destination: '/no-data',
			},
		};
	}
	const { products } = data;
	if (products.length === 0) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			products,
		},
		revalidate: 10, // ! in development, pages are regenerated with every request
	};
}
