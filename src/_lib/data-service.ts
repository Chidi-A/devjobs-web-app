import { supabase } from './supabase';
import { JobWithCompany } from '@/types/job';

export interface PaginatedJobsResponse {
  jobs: JobWithCompany[];
  hasMore: boolean;
  totalCount: number;
}

export async function getJobsPaginated(
  page: number = 0,
  pageSize: number = 12
): Promise<PaginatedJobsResponse> {
  const from = page * pageSize;
  const to = from + pageSize - 1;

  // Get total count first
  const { count } = await supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });

  // Get paginated data
  const { data, error } = await supabase
    .from('jobs')
    .select(
      `
      *,
      company:companies(*)
    `
    )
    .order('posted_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Failed to fetch jobs');
  }

  const totalCount = count || 0;
  const hasMore = from + pageSize < totalCount;

  return {
    jobs: data || [],
    hasMore,
    totalCount,
  };
}

export async function getAllJobs(): Promise<JobWithCompany[]> {
  const { data, error } = await supabase
    .from('jobs')
    .select(
      `
        *,
        company:companies(*)
      `
    )
    .order('posted_at', { ascending: false });

  if (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Failed to fetch jobs');
  }

  return data || [];
}

export async function getJobById(id: string): Promise<JobWithCompany | null> {
  try {
    console.log('Fetching job with ID:', id);

    if (!id) {
      throw new Error('Job ID is required');
    }

    const { data, error } = await supabase
      .from('jobs')
      .select(
        `
        *,
        company:companies(*)
      `
      )
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });

      if (error.code === 'PGRST116') {
        // No rows returned - this is expected for invalid IDs
        return null;
      }

      // Log the full error for debugging
      throw new Error(`Supabase query failed: ${error.message}`);
    }

    console.log('Successfully fetched job data');
    return data;
  } catch (error) {
    console.error('Error in getJobById function:', error);
    throw error;
  }
}

// Function to search jobs with filters and pagination
export async function searchJobsWithFilters(
  filters: {
    searchTerm?: string;
    location?: string;
    fullTime?: boolean;
  },
  page: number = 0,
  pageSize: number = 12
): Promise<PaginatedJobsResponse> {
  const from = page * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from('jobs').select(`
          *,
          company:companies(*)
        `);

  let countQuery = supabase
    .from('jobs')
    .select('*', { count: 'exact', head: true });

  // Apply location filter
  if (filters.location) {
    query = query.ilike('location', `%${filters.location}%`);
    countQuery = countQuery.ilike('location', `%${filters.location}%`);
  }

  // Apply full time filter
  if (filters.fullTime) {
    query = query.eq('contract_type', 'Full Time');
    countQuery = countQuery.eq('contract_type', 'Full Time');
  }

  // For search term, we'll do post-processing to include company names
  // This ensures we don't miss company matches
  if (filters.searchTerm) {
    const searchTerm = filters.searchTerm.toLowerCase();

    // Search in job fields at database level
    const searchFilter = `or(position.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,requirements_content.ilike.%${searchTerm}%,role_content.ilike.%${searchTerm}%)`;

    query = query.or(searchFilter);
    countQuery = countQuery.or(searchFilter);
  }

  // Get count and data
  const { count } = await countQuery;

  query = query.order('posted_at', { ascending: false }).range(from, to);

  const { data, error } = await query;

  if (error) {
    console.error('Error searching jobs:', error);
    throw new Error('Failed to search jobs');
  }

  // Post-process to include company name searches
  let filteredData = data || [];
  if (filters.searchTerm && data) {
    const searchTerm = filters.searchTerm.toLowerCase();
    filteredData = data.filter((job) => {
      // Check position
      const matchesPosition = job.position.toLowerCase().includes(searchTerm);

      // Check company name
      const matchesCompany = job.company?.name
        ?.toLowerCase()
        .includes(searchTerm);

      // Check description
      const matchesDescription = job.description
        .toLowerCase()
        .includes(searchTerm);

      // Check requirements content
      const matchesRequirements = job.requirements_content
        ?.toLowerCase()
        .includes(searchTerm);

      // Check role content
      const matchesRole = job.role_content?.toLowerCase().includes(searchTerm);

      return (
        matchesPosition ||
        matchesCompany ||
        matchesDescription ||
        matchesRequirements ||
        matchesRole
      );
    });
  }

  const totalCount = count || 0;
  const hasMore = from + pageSize < totalCount;

  return {
    jobs: filteredData,
    hasMore,
    totalCount,
  };
}
