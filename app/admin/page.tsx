import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnnouncementForm from '@/components/admin/announcement-form';
import BlogForm from '@/components/admin/blog-form';
import EventForm from '@/components/admin/event-form';
import JobForm from '@/components/admin/job-form';
import PartnerForm from '@/components/admin/partner-form';

const AdminPage = () => {
  const cookieStore = cookies();
  const session = cookieStore.get('session');

  if (!session || session.value !== 'true') {
    redirect('/admin/login');
  }

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
      <Tabs defaultValue="announcements">
        <TabsList>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="blogs">Blogs</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
        </TabsList>
        <TabsContent value="announcements">
          <AnnouncementForm />
        </TabsContent>
        <TabsContent value="blogs">
          <BlogForm />
        </TabsContent>
        <TabsContent value="events">
          <EventForm />
        </TabsContent>
        <TabsContent value="jobs">
          <JobForm />
        </TabsContent>
        <TabsContent value="partners">
          <PartnerForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
