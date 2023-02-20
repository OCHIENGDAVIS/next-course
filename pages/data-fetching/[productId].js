import fs from 'fs/promises';
import path from 'path';

import { Fragment } from 'react';

export default function ProductDetail(props) {
	const { product } = props;
	if (!product) {
		return <p>Loading ...</p>;
	}
	return (
		<Fragment>
			<h1>{product.title}</h1>
			<p>{product.description} </p>
		</Fragment>
	);
}

async function getData() {
	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);
	return data;
}

export async function getStaticProps(context) {
	const { params } = context;
	const { productId } = params;
	const data = await getData();
	const product = data.products.find((product) => product.id === productId);
	if (!product) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			product,
		},
	};
}

export async function getStaticPaths() {
	const data = await getData();
	const paths = data.products.map((product) => ({
		params: {
			productId: product.id,
		},
	}));
	return {
		paths,
		fallback: true, // ! helps you if you have a lot of pages to be pregenerated
	};
}
