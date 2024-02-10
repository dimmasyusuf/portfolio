import React from 'react';
import SupportForm from './SupportForm';

export default function Support() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <h2 className="text-2xl font-bold">Support</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SupportForm />
      </div>
    </section>
  );
}
