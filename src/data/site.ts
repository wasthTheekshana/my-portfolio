// Content source: "Portfolio Website Plan.pdf". Everything visible lives here.
//
// ASSUMPTIONS (replace before launch, mirrored in DESIGN.md):
// - url, email, phone, LinkedIn and GitHub are real (from the owner and the uploaded resume). Upwork URL not given, so not shown.
// - /resume.pdf is the owner's real CV (Theekshana_Harischandra_Resume_SSE.pdf).
// - Items the plan marks [X] (search time, documents indexed, uptime...) are NOT shown: never guess numbers.
// - Virtusa work, IDMS and DOK-HR come from the owner's resume. Certifications are still omitted.
// - The thesis description is a neutral reading of the title (no results claimed).
// - Sinhala name spelling should be confirmed by the owner.
// - SaaS CRM role: the plan asks to confirm full-stack or lead; the card says "Built the CRM".

export type FlowNode = { label: string; note?: string };

export type Project = {
  slug: string;
  n: number; // citation number, strongest first
  title: string;
  short: string; // short name for chips and popovers
  summary: string;
  headline: string; // one headline result shown on the card
  tags: string[];
  role: string;
  problem: string;
  how: { title: string; text: string }[];
  diagram: { nodes: FlowNode[]; branch?: [string, string]; kind: 'flow' | 'method' };
  stack: string[];
  challenges: { title: string; text: string }[];
  apps?: string[];
  results: { value: string; label: string }[];
  outcome?: string;
};

export const site = {
  name: 'Theekshana (Wasath) Harischandra',
  first: 'Theekshana',
  last: 'Harischandra',
  sinhala: 'තීක්ෂණ හරිශ්චන්ද්‍ර',
  role: 'Senior Software Engineer | Software Development, DevOps & Cloud',
  url: 'https://theekshanaharischandra.me',
  description:
    'Senior Software Engineer and Tech Lead in Sri Lanka. Designs, builds and runs software systems end to end, from architecture to production on the cloud.',
  email: 'wasathkaltheekshana@gmail.com',
  statement:
    'I design, build and run software systems end to end, from architecture to production on the cloud.',
  badges: ['4+ years experience', 'First Class Honours BSc', 'MSc in progress'],
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/theekshana-harischandra-572ab520a/' },
    { label: 'GitHub', href: 'https://github.com/wasthTheekshana' },
  ],
  languages: 'English (fluent), Sinhala (native)',
  location: 'Sri Lanka',
  timezone: 'Asia/Colombo',
};

export const about = {
  lead: 'I design, build and run software systems from architecture to production.',
  paragraphs: [
    'I am a Senior Software Engineer and Tech Lead at DOK Solutions Lanka, a BOI-approved document management and BPO company in the ABANS Group.',
    'I lead infrastructure, product development and technical documentation across DocuMind, DOK OCR Pro, DOK CRM, DOK-HR, IDMS and AMF Archive. Before DOK, I spent about 2.5 years at Virtusa.',
    'My research interest is graph neural networks and time-series forecasting. I am based in Sri Lanka and open to remote and freelance work.',
  ],
};

export const experience = [
  {
    role: 'Senior Software Engineer / Tech Lead',
    org: 'DOK Solutions Lanka',
    when: 'Nov 2025 to present',
    bullets: [
      'Lead development, architecture, DevOps and infrastructure for six enterprise products serving banking, insurance and corporate clients.',
      'Designed and administer the shared GCP platform: Docker Compose, one Nginx reverse proxy, SSL, resource limits and encrypted backups.',
      'Built an asynchronous insurance policy PDF pipeline (Python, FastAPI, Redis): 60% faster processing, zero data corruption.',
      'Led design and full-stack build of a multi-tenant SaaS CRM: 30% better forecast accuracy, 35% less manual tracking.',
      'Built IDMS, the platform behind auraDOCS: OCR, hybrid search and RAG answers with page-level sources.',
      'Built DOK-HR, the payroll and workforce system, with 70+ REST endpoints and role-based access.',
      'Write SRS documents with stakeholders, run code reviews and plan Agile work in Jira.',
    ],
  },
  {
    role: 'Software Engineer',
    org: 'Virtusa',
    when: 'Nov 2023 to Jul 2024',
    bullets: [
      'Vertex Gen AI: built Python services on Google Vertex AI for document analysis and data filtering, cutting processing time by 40%.',
      'Improved production pipelines with monitoring and observability workflows: 25% more throughput across 10,000+ monthly documents.',
    ],
  },
  {
    role: 'Associate Software Engineer / Software Engineer',
    org: 'Virtusa',
    when: 'Dec 2021 to Nov 2023',
    bullets: [
      'NetViz (Dec 2021 to Jan 2023): Java and Spring Boot microservices on Docker and Kubernetes, with Jenkins CI/CD that cut release cycles by 30%.',
      'Raised unit test coverage by 40% with JUnit suites, and cut team onboarding time by 25% with written specs, API contracts and deployment procedures.',
      'CSGi (Jan 2023 to Nov 2023): Java applications on Oracle SQL and Perl services. A standard configuration protocol cut configuration errors by 25% and troubleshooting from 48 to 12 hours.',
    ],
  },
];

export const projects: Project[] = [
  {
    slug: 'documind-rag-platform',
    n: 1,
    title: 'DocuMind: AI Document Q&A Platform',
    short: 'DocuMind',
    summary:
      'An AI platform that answers plain-language questions from thousands of company documents, with source citations.',
    headline: 'Every answer cites its source page',
    tags: ['Python', 'FastAPI', 'RAG', 'LLM', 'Vector DB', 'React', 'Docker'],
    role: 'Tech Lead. Designed the architecture; built the backend and AI pipeline.',
    problem:
      'Staff spent hours searching archived contracts, policies and reports. Keyword search missed documents that used different wording.',
    how: [
      { title: 'Upload and OCR', text: 'Documents are uploaded (PDF, scans, Word) and OCR’d where needed.' },
      { title: 'Chunk', text: 'Text is split into chunks.' },
      { title: 'Embed', text: 'Each chunk is converted to a vector embedding.' },
      { title: 'Store', text: 'Embeddings are stored in a vector database.' },
      { title: 'Retrieve and answer', text: 'A question retrieves the most relevant chunks; the LLM writes an answer grounded in them.' },
      { title: 'Cite', text: 'Each answer cites the exact source page.' },
    ],
    diagram: {
      kind: 'flow',
      nodes: [
        { label: 'Upload', note: 'PDF, scan, Word' },
        { label: 'Chunk' },
        { label: 'Embed' },
        { label: 'Vector DB' },
        { label: 'LLM', note: 'grounded' },
        { label: 'Answer', note: 'with citation' },
      ],
    },
    stack: ['Python', 'FastAPI', 'RAG', 'LLM', 'Vector DB', 'React', 'Docker'],
    challenges: [
      { title: 'Poor-quality scans', text: 'OCR pre-processing before text is chunked.' },
      { title: 'Hallucination', text: 'Strict context-only prompting plus citations on every answer.' },
      { title: 'Access control', text: 'Users only get answers from documents they are allowed to see.' },
    ],
    results: [],
    outcome: 'Answers are grounded in the retrieved documents, and each one points to the exact source page.',
  },
  {
    slug: 'async-pdf-pipeline',
    n: 2,
    title: 'High-Speed Asynchronous PDF Processing Pipeline',
    short: 'PDF pipeline',
    summary:
      'An asynchronous pipeline that automates high-volume insurance policy PDF processing: 60% faster with zero data corruption.',
    headline: '60% faster, zero data corruption',
    tags: ['Python', 'FastAPI', 'Redis', 'AsyncIO', 'Workers'],
    role: 'Designed and built the pipeline end to end, for a leading insurance company in Sri Lanka.',
    problem:
      'Policy documents were processed one at a time. Large batches were slow, connections timed out and some files were corrupted.',
    how: [
      { title: 'Accept', text: 'The API accepts the upload and returns a job ID immediately.' },
      { title: 'Queue', text: 'Jobs are pushed to a Redis queue.' },
      { title: 'Process', text: 'Async workers process PDFs in parallel: extract, generate, merge, validate.' },
      { title: 'Track', text: 'Users track job status; failed jobs retry automatically.' },
    ],
    diagram: {
      kind: 'flow',
      nodes: [
        { label: 'Upload', note: 'returns job ID' },
        { label: 'Redis queue' },
        { label: 'Async workers', note: 'extract, generate, merge, validate' },
        { label: 'Output' },
      ],
    },
    stack: ['Python', 'FastAPI', 'Redis', 'AsyncIO', 'Workers'],
    challenges: [
      { title: 'Corruption under concurrency', text: 'File locking, atomic writes and validation.' },
      { title: 'Stable long jobs', text: 'Connections stay stable during long jobs, because the API returns a job ID instead of waiting.' },
    ],
    results: [
      { value: '60%', label: 'faster processing' },
      { value: '0', label: 'data corruption' },
      { value: '100%', label: 'connection stability' },
    ],
  },
  {
    slug: 'approval-workflow-engine',
    n: 3,
    title: 'Multi-Stage Document Approval Workflow Engine',
    short: 'Workflow engine',
    summary:
      'A configurable engine that routes documents through multi-level approvals, with role-based access, notifications and a full audit trail.',
    headline: 'Configurable approvals, full audit trail',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'RBAC', 'React'],
    role: 'Designed the workflow model; built the engine and API.',
    problem: 'Approvals ran over email and paper. Requests got lost and there was no audit record.',
    how: [
      { title: 'Define', text: 'Admins define workflows (stages, approvers, conditions) without code changes.' },
      { title: 'Route', text: 'Sequential and parallel approval steps move a document through its stages.' },
      { title: 'Decide', text: 'Approvers approve, reject or return for changes, with comments.' },
      { title: 'Notify', text: 'Email and in-app notifications and reminders keep requests moving.' },
      { title: 'Record', text: 'A full audit log shows who did what, and when.' },
    ],
    diagram: {
      kind: 'flow',
      nodes: [{ label: 'Submit' }, { label: 'Reviewer' }, { label: 'Manager' }],
      branch: ['Approved', 'Rejected'],
    },
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'RBAC', 'React'],
    challenges: [
      { title: 'Workflows as data', text: 'The model is data, not hard-coded logic.' },
      { title: 'Delegation', text: 'An approver on leave can delegate.' },
      { title: 'Resubmission', text: 'Rejected-then-resubmitted documents are handled in the model.' },
    ],
    results: [{ value: '100%', label: 'audit traceability' }],
  },
  {
    slug: 'ocr-engine-benchmark',
    n: 4,
    title: 'DOK OCR Pro: OCR Engine Benchmarking (Multilingual)',
    short: 'OCR benchmark',
    summary:
      'A benchmark of leading OCR engines on real English and Sinhala business documents, used to pick the production engine.',
    headline: 'Best engine chosen for English and Sinhala',
    tags: ['Python', 'Tesseract', 'OCR', 'Pandas'],
    role: 'Designed the evaluation method, built the test pipeline, analysed results.',
    problem:
      'OCR quality drives searchability of digitised documents, but there was no data on which engine works best for local, multilingual documents.',
    how: [
      { title: 'Test set', text: 'Printed, handwritten, low-quality scans and tables, in English and Sinhala.' },
      { title: 'Pre-process', text: 'Deskew, denoise and binarise before recognition.' },
      { title: 'Run engines', text: 'The same documents go through each engine under test.' },
      { title: 'Measure', text: 'Character Error Rate (CER), Word Error Rate (WER), time per page and cost.' },
    ],
    diagram: {
      kind: 'method',
      nodes: [
        { label: 'Test set', note: 'English + Sinhala' },
        { label: 'Pre-process', note: 'deskew, denoise, binarise' },
        { label: 'OCR engines' },
        { label: 'Metrics', note: 'CER, WER, time, cost' },
      ],
    },
    stack: ['Python', 'Tesseract', 'OCR', 'Pandas'],
    challenges: [
      { title: 'No local data', text: 'Nothing showed which engine works best for local, multilingual documents.' },
      { title: 'Mixed quality', text: 'The test set covers printed, handwritten, low-quality scans and tables.' },
    ],
    results: [{ value: '2', label: 'languages benchmarked: English and Sinhala' }],
    outcome: 'Foundation of the DOK OCR Pro product, and a strong candidate for a research paper.',
  },
  {
    slug: 'gcp-multi-app-deployment',
    n: 5,
    title: 'Multi-App Production Deployment on GCP',
    short: 'GCP deployment',
    summary:
      'A secure shared GCP server hosting several production apps in isolated Docker containers behind one Nginx reverse proxy with SSL.',
    headline: 'Zero public ports',
    tags: ['GCP', 'Docker', 'Nginx', 'Let’s Encrypt', 'Linux'],
    role: 'Infrastructure owner. Designed the standard and migrated the apps.',
    problem:
      'Each app was deployed differently: public ports, no resource limits, data on the boot disk.',
    how: [
      { title: 'One edge', text: 'One shared Nginx and Certbot handle all domains and SSL.' },
      { title: 'Internal network', text: 'Apps run on an internal Docker network with no public ports.' },
      { title: 'Limits', text: 'Every container has CPU, RAM and process limits.' },
      { title: 'Data disk', text: 'Persistent data lives on a dedicated 300 GB data disk.' },
      { title: 'Checklist', text: 'Admin tools are never exposed, and a standard checklist makes onboarding new apps repeatable.' },
    ],
    diagram: {
      kind: 'flow',
      nodes: [
        { label: 'Internet' },
        { label: 'Nginx + SSL', note: 'one edge' },
        { label: 'Docker containers', note: 'CPU, RAM, pids limits' },
        { label: 'Data disk', note: '300 GB' },
      ],
    },
    stack: ['GCP', 'Docker', 'Nginx', 'Let’s Encrypt', 'Linux'],
    apps: ['CRM', 'HR system', 'Archive system', 'IDMS', 'Company website'],
    challenges: [
      { title: 'Public ports', text: 'Closed. Apps sit on an internal Docker network behind one proxy.' },
      { title: 'No resource limits', text: 'Every container now has CPU, RAM and process limits.' },
      { title: 'Data on the boot disk', text: 'Moved to a dedicated 300 GB data disk.' },
    ],
    results: [
      { value: '0', label: 'public-port exposure' },
      { value: '300 GB', label: 'dedicated data disk' },
    ],
  },
  {
    slug: 'saas-crm-analytics',
    n: 6,
    title: 'SaaS CRM: Sales Pipeline & Revenue Analytics',
    short: 'SaaS CRM',
    summary:
      'A multi-tenant CRM with a visual sales pipeline and real-time revenue analytics: 30% better forecast accuracy.',
    headline: '30% better forecasts, 35% less manual tracking',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'Firebase'],
    role: 'Led system design and full-stack development: pipeline, dashboards, custom fields and multi-company support.',
    problem:
      'The sales team tracked leads in spreadsheets, with no pipeline view and unreliable forecasts.',
    how: [
      { title: 'Pipeline board', text: 'A kanban pipeline: Lead, Qualified, Proposal, Won or Lost.' },
      { title: 'Records', text: 'Contact, company and activity management.' },
      { title: 'Revenue dashboard', text: 'Monthly trends, win rate, forecast versus actual.' },
      { title: 'Multi-company', text: 'Multi-company (SaaS) support with role-based access.' },
    ],
    diagram: {
      kind: 'flow',
      nodes: [{ label: 'Lead' }, { label: 'Qualified' }, { label: 'Proposal' }],
      branch: ['Won', 'Lost'],
    },
    stack: ['React', 'TypeScript', 'Vite', 'Node.js', 'Express', 'PostgreSQL (JSONB)', 'Firebase Auth', 'Docker Compose'],
    challenges: [
      { title: 'Spreadsheets', text: 'A visual pipeline gives the team one view of every lead.' },
      { title: 'Unreliable forecasts', text: 'The dashboard compares forecast with actual, month by month.' },
      { title: 'Many companies', text: 'Multi-company support with strict tenant isolation and role-based visibility.' },
      { title: 'Fields every tenant wants differently', text: 'Custom Fields V2 stores tenant-configurable fields in PostgreSQL JSONB. Legacy fixed fields moved over with a reversible, per-tenant migration, no data loss and a backward-compatible API.' },
      { title: 'Calculated fields without eval()', text: 'A formula engine with its own tokenizer, parser and evaluator calculates fields in dependency order and rejects circular references.' },
    ],
    results: [
      { value: '30%', label: 'better forecast accuracy' },
      { value: '35%', label: 'less manual tracking' },
    ],
  },
  {
    slug: 'idms-document-intelligence',
    n: 7,
    title: 'IDMS: Multi-Tenant AI Document Management (auraDOCS)',
    short: 'IDMS',
    summary:
      'The multi-tenant AI platform behind auraDOCS: upload, OCR, search and question documents, with hybrid search and page-level sources.',
    headline: 'Hybrid search, page-level sources',
    tags: ['FastAPI', 'Celery', 'PostgreSQL', 'pgvector', 'Next.js'],
    role: 'Built the document pipeline, search, security and DevOps layer.',
    problem:
      'Organisations needed to upload, OCR, search and question their documents in one place, with each organisation’s data kept strictly separate.',
    how: [
      { title: 'Upload', text: 'Presigned uploads go straight to S3-compatible object storage (Cloudflare R2).' },
      { title: 'OCR', text: 'Celery workers run OCR (Mistral) on each document.' },
      { title: 'Chunk and embed', text: 'Text is split into chunks and vector embeddings are stored in PostgreSQL pgvector.' },
      { title: 'Hybrid search', text: 'Vector similarity and PostgreSQL full-text search are merged with Reciprocal Rank Fusion.' },
      { title: 'Answer', text: 'RAG question answering returns page-level sources, with fallback across several LLM providers.' },
    ],
    diagram: {
      kind: 'flow',
      nodes: [
        { label: 'Upload', note: 'presigned, to R2' },
        { label: 'OCR', note: 'Celery workers' },
        { label: 'Chunk + embed', note: 'pgvector' },
        { label: 'Hybrid search', note: 'vector + full-text, RRF' },
        { label: 'Answer', note: 'page-level sources' },
      ],
    },
    stack: ['FastAPI', 'Celery', 'Redis', 'PostgreSQL + pgvector', 'Next.js', 'TypeScript', 'Docker', 'GitHub Actions'],
    challenges: [
      { title: 'Tenant isolation', text: 'PostgreSQL row-level security per organisation, plus a tenant-isolation test suite that blocks CI when it fails.' },
      { title: 'Account security', text: 'JWT access tokens with rotating refresh tokens, and brute-force detection with account lockout.' },
      { title: 'Safe to run and recover', text: 'GitHub Actions CI (Ruff, mypy, Bandit, unit, integration and security tests), nightly AES-256-encrypted backups with restore scripts, disaster recovery runbooks, Sentry monitoring and Locust load tests.' },
    ],
    results: [],
    outcome: 'Also delivers document comparison and structured data extraction.',
  },
  {
    slug: 'dok-hr-payroll-system',
    n: 8,
    title: 'DOK-HR: HR, Payroll & Workforce Management System',
    short: 'DOK-HR',
    summary:
      'Runs attendance, overtime payroll, client invoicing and KPI scoring for outsourced staff across client work sites.',
    headline: '70+ REST endpoints, 5 access roles',
    tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    role: 'Migrated the database, built the API and payroll engine, and secured the system.',
    problem:
      'Outsourced staff work across many client sites, so attendance, overtime, invoicing and KPI scoring all had to be tracked and costed together.',
    how: [
      { title: 'Record', text: 'Daily task and attendance recording for staff at each client site.' },
      { title: 'Payroll engine', text: 'Time-based and target-based overtime, with public-holiday rules and saved payroll batches.' },
      { title: 'Invoice', text: 'Bulk client invoices built from salaries, overtime, cost factors and task revenue.' },
      { title: 'Report', text: 'Eleven profitability and workforce analytics reports.' },
    ],
    diagram: {
      kind: 'flow',
      nodes: [
        { label: 'Attendance + tasks' },
        { label: 'Payroll engine', note: 'overtime, holidays' },
        { label: 'Client invoices' },
        { label: 'Analytics', note: '11 reports' },
      ],
    },
    stack: ['React 19', 'TypeScript', 'Vite', 'Node.js', 'Express 5', 'PostgreSQL 15', 'Docker'],
    challenges: [
      { title: 'Oracle to PostgreSQL', text: 'Parameterised SQL keeps exact parity with the legacy schema and full control of report-heavy payroll queries.' },
      { title: 'Who can change what', text: 'Role-based access for 5 roles, at route and field level: supervisors cannot edit salaries.' },
      { title: 'Heavy and sensitive endpoints', text: 'Tiered rate limiting on login and report endpoints, JWT and bcrypt, and Playwright end-to-end tests.' },
    ],
    results: [
      { value: '70+', label: 'REST endpoints across 13 modules' },
      { value: '11', label: 'profitability and workforce reports' },
    ],
  },
  {
    slug: 'vertex-ai-document-analysis',
    n: 9,
    title: 'Vertex Gen AI: Document Analysis and Data Filtering',
    short: 'Vertex Gen AI',
    summary:
      'Python services on Google Vertex AI that analyse and filter documents at production scale, with 40% less processing time. Built at Virtusa.',
    headline: '40% less processing time',
    tags: ['Python', 'Google Vertex AI', 'GCP'],
    role: 'Software Engineer at Virtusa. Built the Python services and the pipeline monitoring.',
    problem:
      'Large-scale production workloads needed faster document analysis and filtering, and the pipelines needed to be observable.',
    how: [
      { title: 'Ingest', text: 'Documents enter the production pipeline.' },
      { title: 'Analyse', text: 'Python services call Google Vertex AI on GCP to analyse each document.' },
      { title: 'Filter', text: 'The results are filtered into the data downstream systems need.' },
      { title: 'Monitor', text: 'Monitoring and observability workflows keep throughput visible.' },
    ],
    diagram: {
      kind: 'flow',
      nodes: [
        { label: 'Documents' },
        { label: 'Python services' },
        { label: 'Vertex AI', note: 'on GCP' },
        { label: 'Filtered data', note: 'monitored' },
      ],
    },
    stack: ['Python', 'Google Vertex AI', 'GCP'],
    challenges: [
      { title: 'Processing time', text: 'Services were reworked until document processing took 40% less time across large production workloads.' },
      { title: 'Throughput you can see', text: 'Monitoring and observability workflows raised throughput by 25% across 10,000+ documents a month.' },
    ],
    results: [
      { value: '40%', label: 'less processing time' },
      { value: '25%', label: 'more throughput' },
      { value: '10,000+', label: 'documents a month' },
    ],
  },
  {
    slug: 'netviz-microservices-cicd',
    n: 10,
    title: 'NetViz: Microservices and CI/CD for a Telecom Web System',
    short: 'NetViz',
    summary:
      'Java and Spring Boot microservices on Docker and Kubernetes, shipped through Jenkins pipelines: release cycles 30% shorter. Built at Virtusa.',
    headline: '30% shorter release cycles',
    tags: ['Java', 'Spring Boot', 'Docker', 'Kubernetes', 'Jenkins'],
    role: 'Associate Software Engineer at Virtusa. Designed the services and built the pipelines.',
    problem:
      'A web-based telecommunication system needed services that scale, deploy the same way everywhere and ship faster.',
    how: [
      { title: 'Services', text: 'A microservices architecture in Core Java and Spring Boot, with REST APIs.' },
      { title: 'Containers', text: 'Docker and Kubernetes give consistent environments and zero-downtime rollouts.' },
      { title: 'Pipeline', text: 'Jenkins runs Git, Gradle, automated tests, Docker builds and Kubernetes deployment.' },
      { title: 'Quality', text: 'JUnit suites and written specs, API contracts and deployment procedures.' },
    ],
    diagram: {
      kind: 'flow',
      nodes: [
        { label: 'Git + Gradle' },
        { label: 'Tests', note: 'JUnit' },
        { label: 'Docker build' },
        { label: 'Kubernetes', note: 'zero-downtime rollout' },
      ],
    },
    stack: ['Java', 'Spring Boot', 'Docker', 'Kubernetes', 'Jenkins', 'Gradle', 'JUnit'],
    challenges: [
      { title: 'Post-deployment defects', text: 'Automated JUnit suites raised unit test coverage by 40%.' },
      { title: 'Slow onboarding', text: 'Technical specifications, REST API contracts and deployment procedures cut team onboarding time by 25%.' },
      { title: 'Downtime on release', text: 'Kubernetes rollouts keep the system up while new versions deploy.' },
    ],
    results: [
      { value: '30%', label: 'shorter release cycles' },
      { value: '40%', label: 'higher test coverage' },
      { value: '25%', label: 'faster onboarding' },
    ],
  },
];

export const skills = [
  { group: 'Languages', items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'SQL'] },
  { group: 'Backend', items: ['FastAPI', 'Node.js / Express', 'Redis'] },
  { group: 'Frontend', items: ['React.js'] },
  { group: 'AI / ML', items: ['RAG', 'LLM integration', 'OCR', 'LSTM', 'GNN'] },
  { group: 'Cloud & DevOps', items: ['GCP', 'Docker', 'Docker Compose', 'Nginx', 'Linux', 'CI/CD'] },
  { group: 'Databases', items: ['PostgreSQL / MySQL', 'Firebase', 'Vector databases'] },
  { group: 'Professional', items: ['SRS writing', 'Technical proposals', 'Tender bids', 'Team leadership'] },
];

export const research = {
  title: 'Traffic forecasting using LSTM and Graph Neural Networks',
  where: 'MSc thesis, University of Sri Jayewardenepura',
  when: 'Expected 2027',
  summary:
    'The thesis forecasts traffic across a road network. A graph neural network models how roads connect to each other, and an LSTM models how traffic changes over time. Together they predict what each road will carry next.',
  nodes: ['Road network graph', 'Graph neural network', 'LSTM', 'Traffic forecast'],
};

export const education = [
  { q: 'MSc Computer Science (in progress)', where: 'University of Sri Jayewardenepura', year: '2027 (expected)' },
  { q: 'BSc (Hons) Software Engineering, First Class', where: 'University of Birmingham', year: '2022' },
  { q: 'Professional Higher Diploma in Software Engineering', where: 'Java Institute for Advanced Technology', year: '2021' },
];

export const nav = [
  { label: 'About', href: '/#about' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Contact', href: '/#contact' },
];
