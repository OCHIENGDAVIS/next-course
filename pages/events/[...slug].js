import { Fragment } from 'react';

import { useRouter } from 'next/router';

import EventList from '@/components/event-list/event-list';
import ResultsTitle from './results-title';
import ErrorAlert from '@/components/ui/alert/error-alert';
import Button from '@/components/ui/button/button';
import { getFilteredEvents } from '@/dummy-data';

export default function EventSearch() {
	const router = useRouter();
	const { slug } = router.query;
	if (!slug) {
		return <p> loading...</p>;
	}
	let [year, month] = slug;
	year = Number(year);
	month = Number(month);
	if (
		isNaN(year) ||
		isNaN(month) ||
		year > 2030 ||
		year < 2021 ||
		month < 1 ||
		month > 12
	) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>Invalid filter, please adjust your values </p>;
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show all events</Button>
				</div>
			</Fragment>
		);
	}
	const events = getFilteredEvents({ year, month });
	if (!events || events.length === 0) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>No events found!</p>;
				</ErrorAlert>
				<div className="center">
					<Button link="/events">Show all events</Button>
				</div>
			</Fragment>
		);
	}
	const date = new Date(year, month - 1);
	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventList items={events} />
		</Fragment>
	);
}
