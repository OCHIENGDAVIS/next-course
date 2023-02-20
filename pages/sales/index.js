import { useEffect } from 'react';

export default function Sales() {
	useEffect(() => {
		fetch();
	}, []);

	return <ul>Sales</ul>;
}
