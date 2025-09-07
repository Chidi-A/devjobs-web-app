import { JobWithCompany } from '@/types/job';
import JobCard from './JobCard';

interface JobGridProps {
  jobs: JobWithCompany[];
}

export default function JobGrid({ jobs }: JobGridProps) {
  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-x-3 md:gap-y-16 lg:gap-x-8 lg:gap-y-16">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
