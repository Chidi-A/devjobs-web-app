export interface Company {
  id: string;
  name: string;
  logo_url: string | null;
  logo_background: string | null;
  website: string | null;
}

export interface Job {
  id: string;
  company_id: string;
  position: string;
  contract_type: 'Full Time' | 'Part Time' | 'Freelance';
  location: string;
  posted_at: string;
  description: string;
  apply_url: string | null;
  requirements_content: string | null;
  requirements_items: string[] | null;
  role_content: string | null;
  role_items: string[] | null;
}

export interface JobWithCompany extends Job {
  company: Company;
}

export interface JobDataJSON {
  id: number;
  company: string;
  logo: string;
  logoBackground: string;
  position: string;
  postedAt: string;
  contract: 'Full Time' | 'Part Time' | 'Freelance';
  location: string;
  website: string;
  apply: string;
  description: string;
  requirements: {
    content: string;
    items: string[];
  };
  role: {
    content: string;
    items: string[];
  };
}
