import { Fragment } from 'react';

import { useRouter } from 'next/router';

import EventSummary from './event-summary';
import EventLogistics from './event-logistics';
import EventContent from './event-content';
import ErrorAlert from '@/components/ui/alert/error-alert';
import { getEventById } from '@/dummy-data';

export default function EventDetail() {
	const router = useRouter();
	const { eventId } = router.query;
	const event = getEventById(eventId);
	if (!event) {
		return (
			<ErrorAlert>
				<p>No event found! </p>
			</ErrorAlert>
		);
	}
	return (
		<Fragment>
			<EventSummary title={event.title} />
			<EventLogistics
				date={EventTarget.data}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</Fragment>
	);
}