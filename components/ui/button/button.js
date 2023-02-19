import Link from 'next/link';

import classes from './button.module.css';

export default function Button(props) {
	const { link } = props;
	if (link) {
		return (
			<Link href={link} legacyBehavior>
				<a className={classes.btn}>{props.children}</a>
			</Link>
		);
	} else {
		return (
			<button onClick={props.onClick} className={classes.btn}>
				{props.children}
			</button>
		);
	}
}
