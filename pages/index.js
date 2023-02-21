import Link from 'next/link';

import NewsletterRegistration from '@/components/input/newsleterr-registration';
import EventList from '@/components/event-list/event-list';
import { getAllEvents } from '@/dummy-data';
export default function Home() {
	const events = getAllEvents();
	return (
		<div>
			<NewsletterRegistration />
			<EventList items={events} />
		</div>
	);
}
