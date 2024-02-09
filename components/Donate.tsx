import React from 'react';
import DonateForm from './DonateForm';

export default function Donate() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <h2 className="text-2xl font-bold">Donate</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DonateForm />
      </div>
    </section>
  );
}