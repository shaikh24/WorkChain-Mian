import React from 'react';
export default function JobCard({ job }: any) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold text-lg">{job.title}</h2>
      <p>{job.description}</p>
      <p>Budget: ${job.budget}</p>
      <p>Buyer: {job.buyerName}</p>
    </div>
  );
}
