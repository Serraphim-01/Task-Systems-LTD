import { getAnnouncements } from './actions';
import { AnnouncementEditor } from './AnnouncementEditor';
import { Suspense } from 'react';

async function Announcements() {
    const announcements = await getAnnouncements();
    return <AnnouncementEditor announcements={announcements} />;
}

export default function AnnouncementManager() {
  return (
    <Suspense fallback={<div>Loading announcements...</div>}>
      <Announcements />
    </Suspense>
  );
}
