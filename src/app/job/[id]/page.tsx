import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getJobById } from '@/_lib/data-service';
import { formatJobPostedTime } from '@/_lib/date-utils';

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  try {
    // Await the params in Next.js 15
    const { id } = await params;

    // Add validation for the ID
    if (!id || typeof id !== 'string') {
      console.error('Invalid job ID:', id);
      notFound();
    }

    console.log('Fetching job with ID:', id);

    // Fetch job from Supabase
    const job = await getJobById(id);

    if (!job) {
      console.log('Job not found for ID:', id);
      notFound();
    }

    console.log('Successfully loaded job:', job.position);

    return (
      <div className="min-h-screen bg-[var(--background)] transition-colors duration-300">
        {/* Job Header Card */}
        <div className="relative">
          {/* Job Header Content */}
          <div className="max-w-3xl mx-auto px-6 relative -mt-10 pt-6 md:pt-0">
            <div className="bg-[var(--card-bg)] rounded-md overflow-visible shadow-lg transition-colors duration-300 relative">
              {/* Mobile: Centered Logo (Absolute positioned) */}
              <div className="md:hidden absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
                  style={{
                    backgroundColor: job.company.logo_background || '#5964E0',
                  }}
                >
                  <Image
                    src={job.company.logo_url || '/default-logo.svg'}
                    alt={`${job.company.name} logo`}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="md:flex md:items-stretch">
                {/* Desktop: Company Logo (Hidden on mobile) */}
                <div
                  className="hidden md:flex md:h-auto md:w-36 items-center justify-center relative"
                  style={{
                    backgroundColor: job.company.logo_background || '#5964E0',
                  }}
                >
                  <Image
                    src={job.company.logo_url || '/default-logo.svg'}
                    alt={`${job.company.name} logo`}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>

                {/* Company Info */}
                <div className="flex-1 p-8 pt-12 md:pt-8 md:flex md:items-center md:justify-between text-center md:text-left">
                  <div>
                    <h1 className="text-h2 text-[var(--foreground)] mb-2 transition-colors duration-300">
                      {job.company.name}
                    </h1>
                    <p className="text-body text-[var(--text-secondary)] transition-colors duration-300">
                      {job.company.website ||
                        `${job.company.name.toLowerCase()}.com`}
                    </p>
                  </div>

                  {/* Company Site Button */}
                  <div className="mt-6 md:mt-0 flex justify-center md:justify-end">
                    {job.company.website && (
                      <Link
                        href={job.company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-[140px] py-4 bg-[var(--company-btn-bg)] text-[var(--company-btn-text)] font-bold text-body rounded-md hover:opacity-80 transition-all duration-200"
                      >
                        Company Site
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Details */}
        <main className="max-w-3xl mx-auto px-6 mt-8 pb-20">
          <div className="bg-[var(--card-bg)] rounded-md p-8 md:py-12 shadow-lg transition-colors duration-300">
            {/* Job Info Header */}
            <div className="md:flex md:items-start md:justify-between mb-8">
              <div className="flex-1">
                {/* Posted time and contract */}
                <div className="flex items-center gap-3 text-[var(--text-secondary)] mb-4 transition-colors duration-300">
                  <span className="text-body">
                    {formatJobPostedTime(job.posted_at)}
                  </span>
                  <span className="w-1 h-1 bg-[var(--text-secondary)] rounded-full"></span>
                  <span className="text-body">{job.contract_type}</span>
                </div>

                {/* Position */}
                <h1 className="text-h1 text-[var(--foreground)] mb-4 transition-colors duration-300">
                  {job.position}
                </h1>

                {/* Location */}
                <p className="text-h4 font-bold text-[#5964E0]">
                  {job.location}
                </p>
              </div>

              {/* Apply Button */}
              <div className="mt-8 md:mt-0">
                {job.apply_url && (
                  <Link
                    href={job.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full md:w-[140px] py-4 bg-[#5964E0] text-white font-bold text-body rounded-md hover:bg-[var(--light-violet)] transition-colors duration-200"
                  >
                    Apply Now
                  </Link>
                )}
              </div>
            </div>

            {/* Job Description */}
            <div className="prose prose-lg max-w-none">
              <p className="text-body text-[var(--text-secondary)] leading-relaxed mb-10 transition-colors duration-300">
                {job.description}
              </p>

              {/* Requirements */}
              {job.requirements_content && (
                <section className="mb-10">
                  <h2 className="text-h3 text-[var(--foreground)] mb-6 transition-colors duration-300">
                    Requirements
                  </h2>
                  <p className="text-body text-[var(--text-secondary)] leading-relaxed mb-6 transition-colors duration-300">
                    {job.requirements_content}
                  </p>
                  {job.requirements_items &&
                    job.requirements_items.length > 0 && (
                      <ul className="space-y-2">
                        {job.requirements_items.map((item, index) => (
                          <li key={index} className="flex items-start gap-4">
                            <span className="w-1 h-1 rounded-full mt-3 flex-shrink-0 bg-[#5964E0]"></span>
                            <span className="text-body text-[var(--text-secondary)] leading-relaxed transition-colors duration-300">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                </section>
              )}

              {/* What You Will Do */}
              {job.role_content && (
                <section>
                  <h2 className="text-h3 text-[var(--foreground)] mb-6 transition-colors duration-300">
                    What You Will Do
                  </h2>
                  <p className="text-body text-[var(--text-secondary)] leading-relaxed mb-6 transition-colors duration-300">
                    {job.role_content}
                  </p>
                  {job.role_items && job.role_items.length > 0 && (
                    <ol className="space-y-2">
                      {job.role_items.map((item, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <span className="rounded-full flex items-center justify-center text-[#5964E0] font-bold text-sm flex-shrink-0 mt-1">
                            {index + 1}
                          </span>
                          <span className="text-body text-[var(--text-secondary)] leading-relaxed transition-colors duration-300">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                </section>
              )}
            </div>
          </div>
        </main>

        {/* Bottom Apply Section */}
        <footer className="bg-[var(--card-bg)] transition-colors duration-300">
          <div className="max-w-3xl mx-auto px-6 py-6">
            <div className="md:flex md:items-center md:justify-between">
              <div className="hidden md:block">
                <h3 className="text-h3 text-[var(--foreground)] mb-2 transition-colors duration-300">
                  {job.position}
                </h3>
                <p className="text-body text-[var(--text-secondary)] transition-colors duration-300">
                  {job.company.name}
                </p>
              </div>

              {job.apply_url && (
                <Link
                  href={job.apply_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full md:w-[140px] py-4 bg-[#5964E0] text-white font-bold text-body rounded-md hover:bg-[var(--light-violet)] transition-colors duration-200"
                >
                  Apply Now
                </Link>
              )}
            </div>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error('Error in JobDetailPage:', error);

    // Return a proper error page instead of throwing
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-6 transition-colors duration-300">
        <div className="text-center">
          <h1 className="text-h1 text-[var(--foreground)] mb-4 transition-colors duration-300">
            Something went wrong
          </h1>
          <p className="text-body text-[var(--text-secondary)] mb-8 transition-colors duration-300">
            There was an error loading this job. Please try again.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-[#5964E0] text-white font-bold text-body rounded-md hover:bg-[var(--light-violet)] transition-colors duration-200"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }
}
