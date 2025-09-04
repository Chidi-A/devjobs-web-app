import { formatDistanceToNow } from 'date-fns';

export function formatJobPostedTime(postedAt: string): string {
  // If it's already in the relative format (from JSON), return as-is
  if (postedAt.includes('ago') || postedAt.includes('Just now')) {
    return postedAt;
  }

  // Otherwise, use date-fns to format it
  try {
    return formatDistanceToNow(new Date(postedAt), { addSuffix: true });
  } catch (error) {
    // Fallback if date parsing fails
    console.warn('Failed to parse date:', postedAt, error);
    return postedAt;
  }
}
