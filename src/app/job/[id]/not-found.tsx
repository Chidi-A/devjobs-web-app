import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-h1 text-foreground mb-4">Job Not Found</h1>
        <p className="text-body text-dark-grey mb-8">
          The job you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-violet text-white font-bold text-body rounded-md hover:bg-light-violet transition-colors duration-200"
        >
          Back to Jobs
        </Link>
      </div>
    </div>
  );
}
