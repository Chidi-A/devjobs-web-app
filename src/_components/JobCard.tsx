import Link from 'next/link';
import Image from 'next/image';
import { JobWithCompany } from '@/types/job';
import { formatJobPostedTime } from '@/_lib/date-utils';

interface JobCardProps {
  job: JobWithCompany;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      href={`/job/${job.id}`}
      className="block bg-[var(--card-bg)] rounded-md p-8 pt-12 hover:shadow-lg transition-all duration-300 relative group"
    >
      {/* Company Logo */}
      <div
        className="absolute -top-6 left-8 w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: job.company.logo_background || '' }}
      >
        <Image
          src={job.company.logo_url || ''}
          alt={`${job.company} logo`}
          width={28}
          height={28}
          className="object-contain"
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>

      {/* Job Details */}
      <div className="space-y-4">
        {/* Posted time and contract type */}
        <div className="flex items-center gap-3 text-[var(--text-secondary)]">
          <span className="text-body">
            {formatJobPostedTime(job.posted_at)}
          </span>
          <span className="w-1 h-1 bg-[var(--text-secondary)] rounded-full"></span>
          <span className="text-body">{job.contract_type}</span>
        </div>

        {/* Position */}
        <h3 className="text-h3 text-[var(--foreground)] group-hover:text-[var(--text-secondary)] transition-colors duration-200">
          {job.position}
        </h3>

        {/* Company */}
        <p className="text-body text-[var(--text-secondary)]">
          {job.company.name}
        </p>

        {/* Location */}
        <p className="text-h4 mt-8 font-bold text-[#5964E0]">{job.location}</p>
      </div>
    </Link>
  );
}
