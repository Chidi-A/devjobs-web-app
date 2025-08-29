import Link from 'next/link';
import Image from 'next/image';
import { JobDataJSON } from '@/types/job';

interface JobCardProps {
  job: JobDataJSON;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/job/${job.id}`}
      className="block bg-white dark:bg-very-dark-blue rounded-md p-8 pt-12 hover:shadow-lg transition-shadow duration-200 relative group"
    >
      {/* Company Logo */}
      <div
        className="absolute -top-6 left-8 w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: job.logoBackground }}
      >
        <Image
          src={job.logo.replace('./assets/', '/')}
          alt={`${job.company} logo`}
          width={28}
          height={28}
          className="object-contain"
        />
      </div>

      {/* Job Details */}
      <div className="space-y-4">
        {/* Posted time and contract type */}
        <div className="flex items-center gap-3 text-dark-grey">
          <span className="text-body">{job.postedAt}</span>
          <span className="w-1 h-1 bg-dark-grey rounded-full"></span>
          <span className="text-body">{job.contract}</span>
        </div>

        {/* Position */}
        <h3 className="text-h3 text-foreground group-hover:text-dark-grey transition-colors duration-200">
          {job.position}
        </h3>

        {/* Company */}
        <p className="text-body text-dark-grey">{job.company}</p>

        {/* Location */}
        <p className="text-h4 mt-8 font-bold" style={{ color: '#5964E0' }}>
          {job.location}
        </p>
      </div>
    </Link>
  );
}
