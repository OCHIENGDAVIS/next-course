import { Fragment } from 'react';
import { useRouter } from 'next/router';

import EventList from '@/components/event-list/event-list';

import { getFeaturedEvents, getAllEvents } from '@/dummy-data';
import Search from './events-search';

export default function EventsPage() {
	const router = useRouter();
	const featureEvents = getFeaturedEvents();
	const allEvents = getAllEvents();
	function searchEvents(year, month) {
		const path = `/events/${year}/${month}`;
		router.push(path);
	}
	return (
		<Fragment>
			<Search onSearch={searchEvents} />
			<EventList items={featureEvents} />
			<EventList items={allEvents} />
		</Fragment>
	);
}
