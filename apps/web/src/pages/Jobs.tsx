import React, { useEffect, useState } from 'react';
import { apiFetch } from '../lib/api';
import JobCard from '../components/JobCard';

export default function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  useEffect(() => {
    apiFetch('/api/jobs').then(res => setJobs(res.data)).catch(console.error);
  }, []);
  return (
    <div className="p-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map(job => <JobCard key={job._id} job={job} />)}
    </div>
  );
}
