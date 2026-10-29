/**
 * ============================================================
 *  PORTFOLIO CONFIGURATION — edit this file to update the site.
 * ============================================================
 *
 * Every piece of personal content lives here. Components only read from it.
 *
 * Placeholder convention:
 *   - An empty string ('') or empty array ([]) means "not provided yet".
 *   - In development (`npm run dev`) missing items show as dashed
 *     "PLACEHOLDER" badges so you can spot what still needs filling in.
 *   - In the production build they are simply hidden, so visitors never
 *     see placeholder text.
 *
 * Content below comes from your resume (Patil_Yogesh_Resume.pdf).
 * Lines marked "TODO" need you to confirm or fill in.
 */

export const profile = {
  name: 'Yogesh Patil',
  fullName: 'Yogesh Pralhad Patil',
  initials: 'YP',
  title: 'Java Full Stack Developer',
  location: 'Pune, India',
  experience: 'Nearly 4 years',
  availability: 'Open to job opportunities & freelance projects',

  heroGreeting: "Hi, I'm Yogesh Patil",
  heroHeading: 'Building Scalable Applications with Java & React',
  heroRoles: [
    'Java Full Stack Developer',
    'Spring Boot Developer',
    'React.js Developer',
    'Backend API Developer',
  ],
  heroIntro:
    'I design, build and ship end-to-end web applications — from secure Spring Boot REST APIs and well-modelled MySQL databases to responsive React interfaces.',

  email: 'yogeshpatil2991998@gmail.com',
  phone: '+91 9309866424',
  // Set to false if you don't want your phone number shown publicly on the site.
  showPhone: true,
};

export const socials = {
  // TODO: add your GitHub profile URL, e.g. 'https://github.com/your-username'.
  // GitHub icons/buttons are hidden until this is filled in.
  github: '',
  linkedin: 'https://www.linkedin.com/in/yogesh-patil-9290b6210',
};

export const resume = {
  // File lives in /public/resume/. Replace it with a newer PDF using the same name,
  // or change this path. If the file is missing, the site shows a graceful fallback.
  path: '/resume/Yogesh_Patil_Resume.pdf',
  downloadName: 'Yogesh_Patil_Java_Full_Stack_Developer_Resume.pdf',
  // TODO: optional — e.g. 'October 2026'. Leave '' to hide.
  lastUpdated: 'Oct 2026',
  message:
    'A one-page overview of my experience, projects and technical skills — handy for sharing with your hiring team.',
};

export const about = {
  paragraphs: [
    'I am a Java Full Stack Developer with nearly four years of experience designing, developing and deploying web applications. On the backend I work with Java and Spring Boot to build clean, well-structured REST APIs, using Hibernate/JPA for data access on top of carefully designed MySQL schemas.',
    'On the frontend I build responsive, component-driven interfaces in React.js, so I can own a feature from database table to the screen the user clicks on. I enjoy working directly with clients to gather requirements, turning them into practical solutions, and supporting junior developers through code reviews and day-to-day problem-solving.',
  ],
  highlights: [
    { icon: 'server', title: 'Backend Development', text: 'Java & Spring Boot services with layered, maintainable architecture.' },
    { icon: 'plug', title: 'REST API Design', text: 'Designing and implementing REST APIs that frontends and integrations rely on.' },
    { icon: 'monitor', title: 'React Frontends', text: 'Responsive, reusable React.js UI components and dynamic screens.' },
    { icon: 'database', title: 'Data & Persistence', text: 'MySQL schema design, query optimisation, Hibernate & JPA.' },
    { icon: 'message', title: 'Client Communication', text: 'Requirement gathering and turning business needs into features.' },
    { icon: 'users', title: 'Team Collaboration', text: 'Problem-solving, code reviews and guiding junior developers.' },
  ],
  // Quick facts shown as stat tiles. Only use figures you can stand behind.
  stats: [
    { value: '~4', label: 'Years of experience' },
    { value: '3', label: 'Featured products' },
    { value: '5+', label: 'ERP modules led' },
  ],
  // TODO: add further achievements, awards or recognitions (strings). Leave [] to hide.
  achievements: [],
};

export const skills = [
  {
    category: 'Backend',
    icon: 'server',
    accent: 'violet',
    items: ['Core Java', 'Spring Boot', 'Hibernate', 'JPA', 'REST APIs', 'JDBC', 'Spring Security', 'WebSocket', 'JSP / Servlet'],
  },
  {
    category: 'Frontend',
    icon: 'monitor',
    accent: 'cyan',
    items: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap', 'jQuery'],
  },
  {
    category: 'Database',
    icon: 'database',
    accent: 'amber',
    items: ['MySQL', 'SQL', 'Schema Design', 'Query Optimisation'],
  },
  {
    category: 'Tools',
    icon: 'wrench',
    accent: 'pink',
    items: ['Git', 'GitHub', 'Maven', 'Jenkins', 'Postman', 'IntelliJ IDEA', 'Eclipse', 'VS Code', 'DBeaver'],
  },
];

export const experience = [
  {
    title: 'Software Engineer',
    role: 'Team Lead & Full Stack Developer (project level)',
    company: 'Dakshabhi IT Solutions Pvt Ltd.',
    location: 'Pune, India',
    start: 'Oct 2022',
    end: 'Present',
    summary:
      'Full stack development of enterprise web applications — leading project teams on the E-Visa, ERP and Taskistics products.',
    responsibilities: [
      'Designed, developed and maintained RESTful APIs using Spring Boot.',
      'Designed database schemas and optimised SQL queries in MySQL.',
      'Built responsive UI components using React, improving the user experience.',
      'Gathered requirements from clients and translated them into technical tasks.',
      'Coordinated tasks for junior developers and supported them through reviews and debugging.',
      'Participated in code reviews, bug fixing and production deployments.',
    ],
    contributions: [
      'Led implementation of 5+ ERP modules, increasing internal workflow efficiency by 40% and reducing manual tracking errors by 70%.',
      'Led design and development of a secure E-Visa application portal.',
      'Built Taskistics, a project management system with role-based access and a dynamic dashboard.',
    ],
    technologies: ['Java', 'Spring Boot', 'Hibernate', 'JPA', 'React', 'MySQL', 'REST APIs', 'Git', 'Jenkins'],
  },
  // To add another job, copy the object above and edit it. Newest first.
];

/**
 * Projects
 *  - image: path to a screenshot in /public/projects/ (e.g. '/projects/evisa.png').
 *           Leave '' to show the built-in illustrated thumbnail.
 *  - visual: which illustrated thumbnail to use when there is no image: 'evisa' | 'erp' | 'tasks'.
 *  - links.github / links.live: leave '' to hide the button.
 */
export const projects = [
  {
    id: 'evisa',
    name: 'E-Visa Application Portal',
    tagline: 'Online visa applications, documents and status tracking',
    visual: 'evisa',
    image: '',
    role: 'Team Lead & Full Stack Developer',
    problem:
      'Visa applicants needed a way to apply, submit supporting documents and follow their application without paper forms or in-person visits.',
    solution:
      'A secure web portal where users submit visa applications, upload documents and track application status online, backed by Spring Boot APIs that drive verification and approval workflows.',
    contributions: [
      'Designed and developed the secure E-Visa application portal end to end.',
      'Built RESTful APIs in Spring Boot for application workflows, document verification and approval processes.',
      'Developed dynamic React screens for form submissions and document uploads.',
      'Led the development team as Team Lead.',
    ],
    features: ['Online visa application forms', 'Document upload', 'Application status tracking', 'Verification & approval workflow'],
    tech: ['Java', 'Spring Boot', 'REST APIs', 'ReactJs'],
    outcome: '',  
    links: { github: '', live: '' },
  },
  {
    id: 'erp',
    name: 'ERP — Enterprise Resource Planning',
    tagline: 'Business-process modules for internal operations',
    visual: 'erp',
    image: '',
    role: 'Team Lead & Full Stack Developer',
    problem:
      'Internal operations relied on manual tracking across teams, which was slow and error-prone.',
    solution:
      'A modular ERP system that brings internal business workflows into one application, replacing manual tracking with structured, role-aware processes.',
    contributions: [
      'Led implementation of 5+ ERP modules.',
      'Increased internal workflow efficiency by 40%.',
      'Reduced manual tracking errors by 70%.',
    ],
    features: ['Inventory Management', 'Purchase Procurement', 'Sales', 'Production', 'Human Resources'], // TODO: list the ERP modules you built (e.g. names of modules)
    tech: ['Java', 'Spring Boot', 'Hibernate', 'ReactJs', 'MySQL'], // TODO: confirm stack
    outcome: '40% faster internal workflows · 70% fewer manual tracking errors',
    links: { github: '', live: '' },
  },
  {
    id: 'taskistics',
    name: 'Taskistics',
    tagline: 'Project management & team productivity system',
    visual: 'tasks',
    image: '',
    role: 'Full Stack Developer', // TODO: confirm your role on this project
    problem:
      'Teams needed one place to assign work, follow project progress and keep related documents together.',
    solution:
      'A project management system with employee task management, project tracking, activity logs, document upload/download, role-based access and a dynamic dashboard.',
    contributions: [
      'Integrated task management for employees, project tracking and activities.',
      'Built document upload and download for users.',
      'Implemented user access according to roles.',
      'Built a dynamic dashboard with rich filters and charts.',
    ],
    features: ['Task management', 'Project tracking', 'Activity log', 'Document upload & download', 'Role-based access', 'Dashboard with filters & charts'],
    tech: ['Java', 'Spring Boot', 'React', 'MySQL'], // TODO: confirm stack
    outcome: '',
    links: { github: '', live: '' },
  },
];

export const services = [
  { icon: 'layers', title: 'Full Stack Web Applications', text: 'Business web applications built end to end with Spring Boot, React and MySQL.' },
  { icon: 'plug', title: 'REST API Development & Integration', text: 'Designing new REST APIs or integrating your app with existing services.' },
  { icon: 'monitor', title: 'React.js Frontend Development', text: 'Responsive, component-based interfaces, dashboards and forms.' },
  { icon: 'server', title: 'Spring Boot Backend Development', text: 'Structured backend services with Hibernate/JPA and role-based security.' },
  { icon: 'database', title: 'MySQL Database Integration', text: 'Schema design, query tuning and connecting your data to the app.' },
  { icon: 'bug', title: 'Bug Fixing & Maintenance', text: 'Debugging, fixing and improving existing Java and React applications.' },
];

export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Institute of Management & Research, Jalgaon, Maharashtra',
    period: '2021 – 2023',
    details: '', 
  },
  {
    degree: 'Bachelor of Science (Information Technology)',
    institution: 'N.Y.N.C. Arts, Science & Commerce College, Chalisgaon, Maharashtra',
    period: '2018 – 2021',
    details: '',
  },
  {
    degree: 'HSC (12th Science)',
    institution: 'Rashtriya Junior College, Chalisgaon, Maharashtra',
    period: '2016 – 2018',
    details: '',
  },
];

// TODO: add certifications, e.g. { name: 'Oracle Certified Java Programmer', issuer: 'Oracle', year: '2025', url: '' }
export const certifications = [];

// TODO: add relevant courses, e.g. 'Spring Boot Microservices — Udemy'
export const courses = [];

/**
 * Formspree form ID (create a free form at https://formspree.io). From the endpoint
 * https://formspree.io/f/abcdwxyz, paste only the ID part, e.g. 'abcdwxyz'.
 * Leave '' to keep the contact form switched off.
 */
const formspreeId = 'mjyyovgz';

export const contact = {
  heading: "Have an opportunity or project in mind? Let's build something great together.",
  subheading:
    'Whether you are hiring for a Java / full stack role or need help with a web application, I would be glad to hear from you.',
  /**
   * Form submission endpoint. Leave '' until you connect a real service.
   * The form POSTs JSON { name, email, subject, message } to this URL and treats
   * any 2xx response as success. Works with:
   *   - Formspree: set formspreeId above (used by default)
   *   - Your own Spring Boot API: 'https://api.your-domain.com/api/contact'
   * While empty, the form validates input and then offers to open the visitor's
   * email app instead — it never pretends a message was sent.
   */
  formEndpoint: formspreeId ? `https://formspree.io/f/${formspreeId}` : '',
  privacyNote:
    'Your details are used only to reply to your message. They are never shared or used for marketing.',
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const site = {
  // TODO: set once you have a domain (also update the Open Graph tags in index.html).
  url: 'https://yogeshpatildev.netlify.app',
};
