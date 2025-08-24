import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { AdminTabs } from '@/components/admin/admin-tabs';
import JobForm from '@/components/admin/job-form';
import { JobList } from '@/components/admin/JobList';
import PeopleManager from '@/components/admin/PeopleManager';
import AnnouncementManager from '@/components/admin/AnnouncementManager';
import BlogManager from '@/components/admin/BlogManager';
import AchievementManager from '@/components/admin/AchievementManager';
import AwardManager from '@/components/admin/AwardManager';
import CertificateManager from '@/components/admin/CertificateManager';
import EventManager from '@/components/admin/EventManager';
import PartnerManager from '@/components/admin/PartnerManager';
import { Skeleton } from '@/components/ui/skeleton';

const ListSkeleton = () => (
    <div className="space-y-4">
        <h3 className="text-xl font-semibold"><Skeleton className="h-7 w-48" /></h3>
        <div className="border rounded-md">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-8 w-8" />
                </div>
            ))}
        </div>
    </div>
);

const AdminPage = () => {
  const cookieStore = cookies();
  const session = cookieStore.get('session');

  if (!session || session.value !== 'true') {
    redirect('/admin/login');
  }

  const adminTabs = [
    {
      value: "announcements",
      label: "Announcements",
      content: (
        <Suspense fallback={<ListSkeleton />}>
          <AnnouncementManager />
        </Suspense>
      ),
    },
    {
      value: "blogs",
      label: "Blogs",
      content: (
        <Suspense fallback={<ListSkeleton />}>
          <BlogManager />
        </Suspense>
      ),
    },
    {
      value: "events",
      label: "Events",
      content: (
        <Suspense fallback={<ListSkeleton />}>
          <EventManager />
        </Suspense>
      ),
    },
    {
      value: "jobs",
      label: "Jobs",
      content: (
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Add New Job</h2>
            <JobForm />
          </div>
          <Suspense fallback={<ListSkeleton />}>
            <JobList />
          </Suspense>
        </div>
      ),
    },
    {
      value: "partners",
      label: "Partners",
      content: (
        <Suspense fallback={<ListSkeleton />}>
            <PartnerManager />
        </Suspense>
      ),
    },
    {
        value: "people",
        label: "People",
        content: (
            <div>
            <h2 className="text-2xl font-semibold mb-6">Manage People</h2>
            <PeopleManager />
            </div>
        ),
    },
    {
        value: "achievements",
        label: "Achievements",
        content: (
            <Suspense fallback={<ListSkeleton />}>
                <AchievementManager />
            </Suspense>
        ),
    },
    {
        value: "awards",
        label: "Awards",
        content: (
            <Suspense fallback={<ListSkeleton />}>
                <AwardManager />
            </Suspense>
        ),
    },
    {
        value: "certificates",
        label: "Certificates",
        content: (
            <Suspense fallback={<ListSkeleton />}>
                <CertificateManager />
            </Suspense>
        ),
    },
  ];

  return (
    <div className="container mx-auto py-10 p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <form action={async () => {
          'use server';
          const cookieStore = cookies();
          cookieStore.delete('session');
          redirect('/admin/login');
        }}>
          <Button type="submit">Logout</Button>
        </form>
      </div>
      <AdminTabs tabs={adminTabs} defaultValue="announcements" />
    </div>
  );
};

export default AdminPage;
