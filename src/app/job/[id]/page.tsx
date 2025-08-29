import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { JobDataJSON } from '@/types/job';
import jobsData from '../../../../data.json';

interface JobDetailPageProps {
  params: { id: string };
}

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const jobs: JobDataJSON[] = jobsData as JobDataJSON[];
  const job = jobs.find((j) => j.id === parseInt(params.id));

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Job Header Card */}
      <div className="relative">
        {/* Job Header Content */}
        <div className="max-w-3xl mx-auto px-6 relative -mt-10">
          <div className="bg-white dark:bg-very-dark-blue rounded-md overflow-hidden shadow-lg">
            <div className="md:flex md:items-stretch">
              {/* Company Logo */}
              <div
                className="h-36 md:h-auto md:w-36 flex items-center justify-center relative"
                style={{ backgroundColor: job.logoBackground }}
              >
                <Image
                  src={job.logo.replace('./assets/', '/')}
                  alt={`${job.company} logo`}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>

              {/* Company Info */}
              <div className="flex-1 p-8 md:flex md:items-center md:justify-between">
                <div>
                  <h1 className="text-h2 text-foreground mb-2">
                    {job.company}
                  </h1>
                  <p className="text-body text-dark-grey">
                    {job.company.toLowerCase()}.com
                  </p>
                </div>

                {/* Company Site Button */}
                <div className="mt-6 md:mt-0 flex justify-end">
                  {' '}
                  {/* Add flex container for right alignment */}
                  <Link
                    href={job.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-[140px] py-4 bg-[#303642] text-white font-bold text-body rounded-md hover:bg-opacity-20 transition-colors duration-200"
                  >
                    Company Site
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Details */}
      <main className="max-w-3xl mx-auto px-6 mt-8 pb-20">
        <div className="bg-white dark:bg-very-dark-blue rounded-md p-8 md:py-12 shadow-lg">
          {/* Job Info Header */}
          <div className="md:flex md:items-start md:justify-between mb-8">
            <div className="flex-1">
              {/* Posted time and contract */}
              <div className="flex items-center gap-3 text-dark-grey mb-4">
                <span className="text-body">{job.postedAt}</span>
                <span className="w-1 h-1 bg-dark-grey rounded-full"></span>
                <span className="text-body">{job.contract}</span>
              </div>

              {/* Position */}
              <h1 className="text-h1 text-foreground mb-4">{job.position}</h1>

              {/* Location */}
              <p className="text-h4 font-bold" style={{ color: '#5964E0' }}>
                {job.location}
              </p>
            </div>

            {/* Apply Button */}
            <div className="mt-8 md:mt-0">
              <Link
                href={job.apply}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full md:w-[140px] py-4 bg-[#5964E0] text-white font-bold text-body rounded-md hover:bg-light-violet transition-colors duration-200"
              >
                Apply Now
              </Link>
            </div>
          </div>

          {/* Job Description */}
          <div className="prose prose-lg max-w-none">
            <p className="text-body text-[#9DAEC2] leading-relaxed mb-10">
              {job.description}
            </p>

            {/* Requirements */}
            <section className="mb-10">
              <h2 className="text-h3 text-foreground mb-6">Requirements</h2>
              <p className="text-body text-[#9DAEC2] leading-relaxed mb-6">
                {job.requirements.content}
              </p>
              <ul className="space-y-2">
                {job.requirements.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span
                      className="w-1 h-1 rounded-full mt-3 flex-shrink-0"
                      style={{ backgroundColor: '#5964E0' }}
                    ></span>
                    <span className="text-body text-[#9DAEC2] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* What You Will Do */}
            <section>
              <h2 className="text-h3 text-foreground mb-6">What You Will Do</h2>
              <p className="text-body text-[#9DAEC2] leading-relaxed mb-6">
                {job.role.content}
              </p>
              <ol className="space-y-2">
                {job.role.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className=" rounded-full flex items-center justify-center text-[#5964E0] font-bold text-sm flex-shrink-0 mt-1">
                      {index + 1}
                    </span>
                    <span className="text-body text-[#9DAEC2] leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </main>

      {/* Bottom Apply Section */}
      <footer className="bg-white dark:bg-very-dark-blue">
        <div className="max-w-3xl mx-auto px-6 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="hidden md:block">
              <h3 className="text-h3 text-foreground mb-2">{job.position}</h3>
              <p className="text-body text-[#9DAEC2]">{job.company}</p>
            </div>

            <Link
              href={job.apply}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full md:w-[140px] py-4 bg-[#5964E0] text-white font-bold text-body rounded-md hover:bg-light-violet transition-colors duration-200"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
