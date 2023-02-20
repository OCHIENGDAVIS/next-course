import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<div id="overlay"></div>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
