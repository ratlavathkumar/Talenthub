export interface Job {
  id: number;
  title: string;
  company: string;
  companyId: number | null;
  companyLogo: string | null;
  location: string;
  remote: boolean;
  jobType: string;
  category: string;
  description: string;
  requirements: string | null;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  featured: boolean;
  viewCount: number;
  applicationCount: number;
  createdAt: string;
}

export interface Application {
  id: number;
  jobId: number;
  jobTitle: string;
  company: string;
  companyLogo: string | null;
  location: string;
  jobType: string;
  applicantName: string;
  applicantEmail: string;
  phone: string | null;
  coverLetter: string | null;
  resumeUrl: string | null;
  profileImageUrl: string | null;
  status: string;
  createdAt: string;
}

export interface StatsSummary {
  totalJobs: number;
  newJobsThisWeek: number;
  totalApplications: number;
  featuredJobs: number;
}

export interface ApplicationOverTime {
  date: string;
  count: number;
}

export interface CategoryStat {
  category: string;
  count: number;
}

const KEYS = {
  JOBS: "talentHub_jobs",
  APPLICATIONS: "talentHub_applications",
  NEXT_JOB_ID: "talentHub_nextJobId",
  NEXT_APP_ID: "talentHub_nextAppId",
};

const SEED_JOBS: Job[] = [
  {
    id: 1, title: "Senior Frontend Engineer", company: "Stripe",
    companyId: null, companyLogo: null,
    location: "San Francisco, CA", remote: true,
    jobType: "full-time", category: "Engineering",
    description: "We're looking for a senior frontend engineer to help build the future of payments infrastructure. You'll work closely with design and backend teams to create polished, accessible interfaces.\n\nYou'll own entire product features from conception to launch, mentor junior engineers, and help shape our technical direction.",
    requirements: "- 5+ years of frontend experience\n- Deep knowledge of React and TypeScript\n- Experience with performance optimization\n- Strong design sensibility",
    salaryMin: 160000, salaryMax: 220000, currency: "USD",
    featured: true, viewCount: 312, applicationCount: 47,
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 2, title: "Product Designer", company: "Figma",
    companyId: null, companyLogo: null,
    location: "New York, NY", remote: false,
    jobType: "full-time", category: "Design",
    description: "Join Figma's product design team to shape tools used by millions of designers worldwide. You'll be responsible for end-to-end design work, from early-stage research to pixel-perfect specs.\n\nWork with a small, collaborative team to tackle complex design challenges.",
    requirements: "- 4+ years of product design experience\n- Proficiency in Figma\n- Portfolio demonstrating systems thinking\n- Experience conducting user research",
    salaryMin: 140000, salaryMax: 190000, currency: "USD",
    featured: true, viewCount: 198, applicationCount: 33,
    createdAt: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 3, title: "Growth Marketing Manager", company: "Linear",
    companyId: null, companyLogo: null,
    location: "Remote", remote: true,
    jobType: "full-time", category: "Marketing",
    description: "Linear is looking for a data-driven growth marketer to own our acquisition and retention programs. You'll run experiments, analyze results, and scale what works.\n\nThis role has a huge surface area — you'll touch paid channels, content, email, partnerships, and more.",
    requirements: "- 3+ years of B2B SaaS marketing\n- Strong analytical skills and SQL proficiency\n- Experience with paid acquisition\n- Track record of hitting growth targets",
    salaryMin: 110000, salaryMax: 150000, currency: "USD",
    featured: false, viewCount: 145, applicationCount: 22,
    createdAt: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 4, title: "Staff Backend Engineer", company: "Vercel",
    companyId: null, companyLogo: null,
    location: "Remote", remote: true,
    jobType: "full-time", category: "Engineering",
    description: "Vercel is hiring a Staff Backend Engineer to work on our edge infrastructure and deployment systems. You'll design and build systems that handle billions of requests per month.\n\nExpect high impact, high autonomy, and a team that moves fast.",
    requirements: "- 8+ years of backend experience\n- Experience with distributed systems\n- Proficiency in Go or Rust\n- Experience at scale (10M+ requests/day)",
    salaryMin: 200000, salaryMax: 280000, currency: "USD",
    featured: true, viewCount: 421, applicationCount: 61,
    createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 5, title: "Product Manager, Platform", company: "Notion",
    companyId: null, companyLogo: null,
    location: "San Francisco, CA", remote: false,
    jobType: "full-time", category: "Product",
    description: "Lead strategy and execution for Notion's platform and integrations ecosystem. You'll work with engineers, designers, and external partners to grow our API and integration landscape.\n\nDefine the roadmap, align stakeholders, and ship products millions of people love.",
    requirements: "- 4+ years of product management\n- Experience with developer platforms or APIs\n- Strong communication and analytical skills\n- Technical background preferred",
    salaryMin: 150000, salaryMax: 200000, currency: "USD",
    featured: false, viewCount: 234, applicationCount: 29,
    createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 6, title: "Enterprise Account Executive", company: "Retool",
    companyId: null, companyLogo: null,
    location: "New York, NY", remote: false,
    jobType: "full-time", category: "Sales",
    description: "Retool is looking for a hungry, consultative enterprise AE to close Fortune 500 deals. You'll own the full sales cycle from prospecting to close, working with technical buyers and executives.\n\nExpect strong comp, great tooling, and a product that sells itself.",
    requirements: "- 4+ years of enterprise SaaS sales\n- Track record of $500K+ ARR quotas\n- Experience selling to developers or IT leaders\n- Excellent negotiation skills",
    salaryMin: 120000, salaryMax: 180000, currency: "USD",
    featured: false, viewCount: 167, applicationCount: 18,
    createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 7, title: "Machine Learning Engineer", company: "Anthropic",
    companyId: null, companyLogo: null,
    location: "San Francisco, CA", remote: false,
    jobType: "full-time", category: "Engineering",
    description: "Join Anthropic's research engineering team to develop and scale our AI training infrastructure. You'll work at the frontier of AI safety research, building systems for training large language models.\n\nThis is a rare opportunity to do meaningful work at the frontier.",
    requirements: "- Strong background in ML and Python\n- Experience with large-scale training pipelines\n- Familiarity with JAX, PyTorch, or similar\n- PhD or equivalent experience preferred",
    salaryMin: 250000, salaryMax: 350000, currency: "USD",
    featured: true, viewCount: 589, applicationCount: 84,
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
  },
  {
    id: 8, title: "Finance & Strategy Analyst", company: "Loom",
    companyId: null, companyLogo: null,
    location: "San Francisco, CA", remote: true,
    jobType: "full-time", category: "Finance",
    description: "Support Loom's finance and strategy team with modeling, reporting, and business analysis. You'll work on annual planning, forecasting, and special projects for the CFO and leadership team.\n\nIdeal for someone who wants to grow into a senior finance or biz-ops role.",
    requirements: "- 2+ years in investment banking, consulting, or FP&A\n- Advanced Excel and financial modeling\n- Strong communication skills\n- SaaS experience a plus",
    salaryMin: 90000, salaryMax: 130000, currency: "USD",
    featured: false, viewCount: 112, applicationCount: 15,
    createdAt: new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 9, title: "iOS Engineer", company: "Spotify",
    companyId: null, companyLogo: null,
    location: "Stockholm, Sweden", remote: false,
    jobType: "full-time", category: "Engineering",
    description: "Build the iOS app used by hundreds of millions of music lovers worldwide. You'll work in a cross-functional squad focused on the playback experience, collaborating with product, design, and audio engineers.\n\nYou'll own features end-to-end and ship code that reaches users globally.",
    requirements: "- 4+ years of iOS development\n- Deep Swift expertise\n- Experience with media playback or audio\n- Knowledge of performance profiling tools",
    salaryMin: 130000, salaryMax: 175000, currency: "USD",
    featured: false, viewCount: 203, applicationCount: 38,
    createdAt: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 10, title: "Head of Operations", company: "Glean",
    companyId: null, companyLogo: null,
    location: "Palo Alto, CA", remote: false,
    jobType: "full-time", category: "Operations",
    description: "Glean is looking for its first Head of Operations to build the systems and processes that will scale us from 200 to 1000+ people. You'll work directly with the CEO on everything from hiring processes to vendor management.\n\nHigh impact, high ownership, no bureaucracy.",
    requirements: "- 6+ years in ops, biz-ops, or chief of staff roles\n- Experience scaling a startup through hyper-growth\n- Data-driven mindset with strong execution skills\n- Excellent cross-functional communicator",
    salaryMin: 160000, salaryMax: 210000, currency: "USD",
    featured: false, viewCount: 178, applicationCount: 24,
    createdAt: new Date(Date.now() - 9 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 11, title: "Brand Designer", company: "Clerk",
    companyId: null, companyLogo: null,
    location: "Remote", remote: true,
    jobType: "full-time", category: "Design",
    description: "Craft Clerk's visual identity across marketing, product, and events. You'll own the design of our website, social media, and brand campaigns, working closely with the marketing and product teams.\n\nA rare chance to define the look of a fast-growing developer tool.",
    requirements: "- 3+ years of brand or visual design\n- Strong portfolio across digital and print\n- Figma proficiency\n- Motion design experience a plus",
    salaryMin: 100000, salaryMax: 140000, currency: "USD",
    featured: false, viewCount: 134, applicationCount: 19,
    createdAt: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 12, title: "Legal Counsel", company: "Scale AI",
    companyId: null, companyLogo: null,
    location: "San Francisco, CA", remote: false,
    jobType: "full-time", category: "Legal",
    description: "Join Scale AI's legal team as a commercial attorney focused on enterprise contracts, data privacy, and AI regulatory matters. You'll work with sales, product, and engineering on deals and compliance.\n\nFast-paced, high-stakes, and genuinely novel legal work.",
    requirements: "- JD from a top law school\n- 4+ years in a top-tier firm or in-house role\n- Experience with technology contracts and data privacy\n- AI regulatory experience a plus",
    salaryMin: 180000, salaryMax: 240000, currency: "USD",
    featured: false, viewCount: 98, applicationCount: 12,
    createdAt: new Date(Date.now() - 11 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 13, title: "Intern – Software Engineering", company: "Rippling",
    companyId: null, companyLogo: null,
    location: "San Francisco, CA", remote: false,
    jobType: "internship", category: "Engineering",
    description: "Rippling is seeking talented software engineering interns for our summer cohort. You'll be embedded in a product team and ship real features used by thousands of businesses.\n\nFull-time offers extended to top performers.",
    requirements: "- Currently enrolled in a CS or related degree\n- Proficiency in Python, Java, or TypeScript\n- Side projects or internship experience\n- Eligible to work in the US",
    salaryMin: 45000, salaryMax: 55000, currency: "USD",
    featured: false, viewCount: 445, applicationCount: 112,
    createdAt: new Date(Date.now() - 14 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 14, title: "Part-time Content Writer", company: "Buffer",
    companyId: null, companyLogo: null,
    location: "Remote", remote: true,
    jobType: "part-time", category: "Marketing",
    description: "Buffer is looking for a skilled content writer to help produce blog posts, case studies, and social media content about social media marketing, small business, and remote work.\n\n20 hours/week, fully remote, async-first team.",
    requirements: "- 2+ years of content writing experience\n- Strong SEO knowledge\n- Experience writing for SaaS or marketing audiences\n- Portfolio of published work",
    salaryMin: 40000, salaryMax: 60000, currency: "USD",
    featured: false, viewCount: 167, applicationCount: 31,
    createdAt: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 15, title: "DevOps Engineer (Contract)", company: "Hashicorp",
    companyId: null, companyLogo: null,
    location: "Remote", remote: true,
    jobType: "contract", category: "Engineering",
    description: "6-month contract to help migrate our infrastructure to a new Kubernetes-based deployment system. You'll work with our platform team and document everything for the eventual handoff.\n\nHigh hourly rate, flexible schedule.",
    requirements: "- 5+ years of DevOps/SRE experience\n- Deep Kubernetes expertise\n- Experience with Terraform and Vault\n- Excellent documentation skills",
    salaryMin: 120000, salaryMax: 160000, currency: "USD",
    featured: false, viewCount: 189, applicationCount: 27,
    createdAt: new Date(Date.now() - 16 * 24 * 3600 * 1000).toISOString(),
  },
];

function initJobs(): void {
  if (!localStorage.getItem(KEYS.JOBS)) {
    localStorage.setItem(KEYS.JOBS, JSON.stringify(SEED_JOBS));
    localStorage.setItem(KEYS.NEXT_JOB_ID, String(SEED_JOBS.length + 1));
  }
}

function readJobs(): Job[] {
  initJobs();
  try {
    return JSON.parse(localStorage.getItem(KEYS.JOBS) || "[]");
  } catch {
    return [];
  }
}

function writeJobs(jobs: Job[]): void {
  localStorage.setItem(KEYS.JOBS, JSON.stringify(jobs));
}

function readApplications(): Application[] {
  try {
    return JSON.parse(localStorage.getItem(KEYS.APPLICATIONS) || "[]");
  } catch {
    return [];
  }
}

function writeApplications(apps: Application[]): void {
  localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(apps));
}

function nextJobId(): number {
  const id = parseInt(localStorage.getItem(KEYS.NEXT_JOB_ID) || "100", 10);
  localStorage.setItem(KEYS.NEXT_JOB_ID, String(id + 1));
  return id;
}

function nextAppId(): number {
  const id = parseInt(localStorage.getItem(KEYS.NEXT_APP_ID) || "1", 10);
  localStorage.setItem(KEYS.NEXT_APP_ID, String(id + 1));
  return id;
}

export interface ListJobsParams {
  search?: string;
  category?: string;
  jobType?: string;
  sortBy?: string;
  featured?: boolean;
  companyId?: number;
}

export function getJobs(params: ListJobsParams = {}): Job[] {
  let jobs = readJobs();

  if (params.search) {
    const q = params.search.toLowerCase();
    jobs = jobs.filter(
      j =>
        j.title.toLowerCase().includes(q) ||
        j.company.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q)
    );
  }

  if (params.category) {
    jobs = jobs.filter(j => j.category === params.category);
  }

  if (params.jobType) {
    jobs = jobs.filter(j => j.jobType === params.jobType);
  }

  if (params.featured !== undefined) {
    jobs = jobs.filter(j => j.featured === params.featured);
  }

  if (params.companyId !== undefined) {
    jobs = jobs.filter(j => j.companyId === params.companyId);
  }

  const sortBy = params.sortBy || "newest";
  jobs = [...jobs].sort((a, b) => {
    if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === "salary-high") return b.salaryMax - a.salaryMax;
    if (sortBy === "salary-low") return a.salaryMin - b.salaryMin;
    if (sortBy === "most-applied") return b.applicationCount - a.applicationCount;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return jobs;
}

export function getJob(id: number): Job | null {
  return readJobs().find(j => j.id === id) ?? null;
}

export function createJob(data: Omit<Job, "id" | "viewCount" | "applicationCount" | "createdAt">): Job {
  const jobs = readJobs();
  const job: Job = {
    ...data,
    id: nextJobId(),
    viewCount: 0,
    applicationCount: 0,
    createdAt: new Date().toISOString(),
  };
  writeJobs([...jobs, job]);
  return job;
}

export function deleteJob(id: number): void {
  writeJobs(readJobs().filter(j => j.id !== id));
}

export function incrementJobView(id: number): void {
  const jobs = readJobs().map(j => j.id === id ? { ...j, viewCount: j.viewCount + 1 } : j);
  writeJobs(jobs);
}

export interface CreateApplicationData {
  applicantName: string;
  applicantEmail: string;
  phone?: string;
  coverLetter?: string;
  resumeUrl?: string;
  profileImageUrl?: string;
}

export function applyToJob(jobId: number, data: CreateApplicationData): Application {
  const job = getJob(jobId);
  if (!job) throw new Error("Job not found");

  const apps = readApplications();
  const app: Application = {
    id: nextAppId(),
    jobId,
    jobTitle: job.title,
    company: job.company,
    companyLogo: job.companyLogo,
    location: job.location,
    jobType: job.jobType,
    applicantName: data.applicantName,
    applicantEmail: data.applicantEmail,
    phone: data.phone ?? null,
    coverLetter: data.coverLetter ?? null,
    resumeUrl: data.resumeUrl ?? null,
    profileImageUrl: data.profileImageUrl ?? null,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  writeApplications([...apps, app]);

  const jobs = readJobs().map(j =>
    j.id === jobId ? { ...j, applicationCount: j.applicationCount + 1 } : j
  );
  writeJobs(jobs);

  return app;
}

export interface ListApplicationsParams {
  email?: string;
  jobId?: number;
}

export function getApplications(params: ListApplicationsParams = {}): Application[] {
  let apps = readApplications();
  if (params.email) {
    apps = apps.filter(a => a.applicantEmail.toLowerCase() === params.email!.toLowerCase());
  }
  if (params.jobId !== undefined) {
    apps = apps.filter(a => a.jobId === params.jobId);
  }
  return apps.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function updateApplicationStatus(id: number, status: string): Application {
  const apps = readApplications();
  const idx = apps.findIndex(a => a.id === id);
  if (idx === -1) throw new Error("Application not found");
  apps[idx] = { ...apps[idx], status };
  writeApplications(apps);
  return apps[idx];
}

export function getStatsSummary(): StatsSummary {
  const jobs = readJobs();
  const apps = readApplications();
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
  return {
    totalJobs: jobs.length,
    newJobsThisWeek: jobs.filter(j => j.createdAt >= oneWeekAgo).length,
    totalApplications: apps.length,
    featuredJobs: jobs.filter(j => j.featured).length,
  };
}

export function getApplicationsOverTime(): ApplicationOverTime[] {
  const apps = readApplications();
  const counts: Record<string, number> = {};

  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 3600 * 1000);
    const key = d.toISOString().split("T")[0];
    counts[key] = 0;
  }

  apps.forEach(app => {
    const key = new Date(app.createdAt).toISOString().split("T")[0];
    if (key in counts) counts[key]++;
  });

  return Object.entries(counts).map(([date, count]) => ({ date, count }));
}

export function getStatsByCategory(): CategoryStat[] {
  const jobs = readJobs();
  const counts: Record<string, number> = {};
  jobs.forEach(j => {
    counts[j.category] = (counts[j.category] ?? 0) + 1;
  });
  return Object.entries(counts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}
