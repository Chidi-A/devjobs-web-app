import FilterBar from '../_components/FilterBar';
import JobGrid from '../_components/JobGrid';
import { JobDataJSON } from '@/types/job';
import jobsData from '../../data.json';

export default function Home() {
  const jobs: JobDataJSON[] = jobsData as JobDataJSON[];

  return (
    <div className="min-h-screen bg-background">
      <div className="-mt-10  pb-12 relative z-10">
        <FilterBar />
      </div>
      {/* Jobs Grid */}
      <main className="relative z-10 mt-20 mb-40">
        <JobGrid jobs={jobs} />
      </main>
    </div>
  );
}
