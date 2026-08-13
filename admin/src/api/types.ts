export interface Testimonial {
  id: string;
  authorName: string;
  authorRole?: string | null;
  authorCompany?: string | null;
  quote: string;
  rating?: number | null;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export type SubmissionStatus = "NEW" | "READ" | "ARCHIVED";

export interface ContactSubmission {
  id: string;
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  status: SubmissionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedSubmissions {
  items: ContactSubmission[];
  total: number;
  page: number;
  pageSize: number;
}
