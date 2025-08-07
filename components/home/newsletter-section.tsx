"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

export function NewsletterSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    privacyAccepted: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.privacyAccepted) {
    alert('Please accept the Privacy Policy to continue.');
    return;
  }

  try {
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || 'Subscription failed');

    alert('🎉 You’ve been subscribed!');
    setFormData({ name: '', email: '', privacyAccepted: false });
  } catch (err: any) {
    alert(err.message || 'Something went wrong. Try again later.');
  }
};

  return (
    <section className="py-16 bg-[#ffbb00]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground">
              Subscribe to our newsletter for the latest technology insights and company updates
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-12"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-12"
              />
            </div>

            <div className="flex items-center space-x-2 text-left">
              <Checkbox
                id="privacy"
                checked={formData.privacyAccepted}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, privacyAccepted: checked as boolean })
                }
              />
              <label htmlFor="privacy" className="text-sm text-muted-foreground">
                I accept the{' '}
                <Link 
                  href="/privacy-policy" 
                  className="text-[#ffbb00] hover:underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full md:w-auto bg-[#ffbb00] hover:bg-[#ffbb00]/90 text-black font-semibold h-12 px-8"
            >
              Subscribe to Newsletter
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}