import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { AdminTabs } from '@/components/admin/admin-tabs';
import AnnouncementForm from '@/components/admin/announcement-form';
import BlogForm from '@/components/admin/blog-form';
import EventForm from '@/components/admin/event-form';
import JobForm from '@/components/admin/job-form';
import PartnerForm from '@/components/admin/partner-form';
import { AnnouncementList } from '@/components/admin/AnnouncementList';
import { BlogList } from '@/components/admin/BlogList';
import { EventList } from '@/components/admin/EventList';
import { JobList } from '@/components/admin/JobList';
import { PartnerList } from '@/components/admin/PartnerList';
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
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Add New Announcement</h2>
            <AnnouncementForm />
          </div>
          <Suspense fallback={<ListSkeleton />}>
            <AnnouncementList />
          </Suspense>
        </div>
      ),
    },
    {
      value: "blogs",
      label: "Blogs",
      content: (
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Add New Blog Post</h2>
            <BlogForm />
          </div>
          <Suspense fallback={<ListSkeleton />}>
            <BlogList />
          </Suspense>
        </div>
      ),
    },
    {
      value: "events",
      label: "Events",
      content: (
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Add New Event</h2>
            <EventForm />
          </div>
          <Suspense fallback={<ListSkeleton />}>
            <EventList />
          </Suspense>
        </div>
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
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Add New Partner</h2>
            <PartnerForm />
          </div>
          <Suspense fallback={<ListSkeleton />}>
            <PartnerList />
          </Suspense>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-10">
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
