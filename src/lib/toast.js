import { toast } from 'sonner';

export { toast };

export function apiError(error, fallback = 'Something went wrong. Please try again.') {
  if (error?.response?.status === 401) return 'Your session has expired. Please sign in again.';
  return error?.response?.data?.message || fallback;
}
