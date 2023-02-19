import Link from 'next/link';
import EventList from '@/components/event-list/event-list';
import { getAllEvents } from '@/dummy-data';
export default function Home() {
	const events = getAllEvents();
	return (
		<div>
			<EventList items={events} />
		</div>
	);
}
