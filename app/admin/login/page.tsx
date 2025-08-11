"use client"
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { login } from './actions';

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      Sign In
    </Button>
  );
}

const AdminLoginPage = () => {
  const [state, formAction] = useFormState(login, initialState);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <form action={formAction} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
            />
          </div>
          <div className="flex items-center justify-between mt-6">
            <SubmitButton />
          </div>
          {state?.message && <p className="text-red-500 text-xs italic mt-4">{state.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
