import { getEvents } from './actions';
import { EventEditor } from './EventEditor';
import { Suspense } from 'react';

async function Events() {
    const events = await getEvents();
    return <EventEditor events={events} />;
}

export default function EventManager() {
  return (
    <Suspense fallback={<div>Loading events...</div>}>
      <Events />
    </Suspense>
  );
}
