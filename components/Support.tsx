import React from 'react';
import SupportForm from './SupportForm';
import SupportList from './SupportList';

export default function Support() {
  return (
    <section className="flex flex-col gap-6 w-full m-4 mt-8 sm:mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SupportForm />
        <SupportList />
      </div>
    </section>
  );
}
