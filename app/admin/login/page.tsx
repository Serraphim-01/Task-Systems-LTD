"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login } from './actions';

const AdminLoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await login(formData);

      if (result?.error) {
        setError(result.error);
      }
    } catch (e: any) {
      // The `redirect()` call in the server action throws an error that Next.js handles.
      // If the error is NEXT_REDIRECT, we don't need to do anything.
      // For any other error, we might want to show it.
      if (e.message !== 'NEXT_REDIRECT') {
          setError('An unexpected error occurred.');
      }
    } finally {
        setIsPending(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="key">
              Admin Key
            </label>
            <Input
              id="key"
              name="key"
              type="password"
              placeholder="Enter your admin key"
              required
            />
          </div>
          <div className="flex items-center justify-between mt-6">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Signing In...' : 'Sign In'}
            </Button>
          </div>
          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
