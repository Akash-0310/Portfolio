export const siteConfig = {
  name: 'Akash Singh',
  title: 'Full Stack Developer',
  email: 'akashdevtech10@gmail.com',
  phone: '+91-9340041985',
  location: 'Indore, Madhya Pradesh, India',
  github: 'https://github.com/Akash-0310',
  linkedin: 'https://www.linkedin.com/in/akash-singh-34447b213',
  instagram: 'https://www.instagram.com/akash.03',
  bio: "I architect digital experiences that scale — from clean React UIs to distributed Node.js backends, wired together with cloud infrastructure and AI-powered intelligence.",
  tagline: "Building the future, one API at a time.",
  available: true,
  availabilityNote: "Open to full-time roles & freelance projects",
}

export const roles = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'AI Integration Specialist',
  'Cloud Solutions Builder',
  'React & Node.js Expert',
]

export const experience = [
  {
    id: 'bestpeers',
    role: 'Software Engineer',
    company: 'BestPeers Infosystem',
    location: 'Indore, Madhya Pradesh',
    period: 'Oct 2025 – Present',
    type: 'Full-time',
    color: '#8b5cf6',
    logo: 'BP',
    description: 'Leading full-stack development of production-grade MERN applications for diverse client portfolio.',
    highlights: [
      'Architect and deploy full-stack web applications using the MERN stack — MongoDB, Express, React, Node.js — with emphasis on performance, responsiveness, and cross-browser compatibility.',
      'Drive client collaboration across requirements gathering, project scoping, and agile delivery, consistently shipping on time and exceeding expectations.',
      'Design and maintain RESTful APIs handling complex data pipelines, third-party integrations, and secured backend systems with enterprise-grade data management.',
      'Champion code quality through structured reviews, comprehensive testing protocols, and debugging workflows that maintain application stability at scale.',
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Docker', 'AWS'],
    impact: 'Delivering production applications for 5+ clients',
  },
  {
    id: 'tcs',
    role: 'Assistant System Engineer',
    company: 'Tata Consultancy Services',
    location: 'Mumbai, Maharashtra',
    period: 'Aug 2024 – Sept 2025',
    type: 'Full-time',
    color: '#06b6d4',
    logo: 'TCS',
    description: "Contributed to enterprise-scale React.js applications at one of India's largest IT organizations.",
    highlights: [
      'Built and maintained responsive React.js applications for enterprise clients, measurably improving UI performance and reducing production defects.',
      'Mastered state management patterns with React Hooks (useState, useEffect, useCallback, useMemo) to engineer dynamic, high-performance user interactions.',
      'Authored automation scripts that accelerated deployment pipelines by 15%, saving hours of engineering time weekly.',
      'Recognized with Certificate of Appreciation and 2 Team Management Awards for exemplary cross-functional collaboration and technical leadership.',
    ],
    tech: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'Jira', 'Azure'],
    impact: '15% improvement in deployment speed · 2 Team Management Awards',
  },
]

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  color: string
  gradient: string
  category: string
  status: string
  tech: string[]
  features: string[]
  metrics: { label: string; value: string }[]
  github: string
  live: string
  image: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'simhealth',
    title: 'Simhealth',
    subtitle: 'Healthcare B2B AI Platform',
    description: 'An enterprise-grade B2B healthcare platform integrating Tavus AI for intelligent medical interactions, built on a resilient microservices architecture deployed at cloud scale.',
    longDescription: 'Simhealth redefines how healthcare professionals interact with medical data. Integrated Tavus AI through REST APIs and webhooks to deliver personalized medical AI experiences. The backend is architected as microservices with circuit breakers (preventing cascade failures) and message brokers (enabling async communication at scale). The entire stack is containerized with Docker and orchestrated on AWS for enterprise reliability.',
    color: '#06b6d4',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    category: 'Healthcare · AI · Enterprise',
    status: 'Production',
    tech: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Azure', 'AWS', 'Docker', 'Tavus AI', 'REST APIs'],
    features: [
      'Tavus AI integration for intelligent medical interactions',
      'Microservices with circuit breakers for fault tolerance',
      'Message broker for async event-driven communication',
      'Deployed on AWS with Docker containerization',
      'Azure services integration for cloud-native capabilities',
      'Responsive UI optimized for healthcare professionals',
    ],
    metrics: [
      { label: 'Architecture', value: 'Microservices' },
      { label: 'Cloud', value: 'AWS + Azure' },
      { label: 'AI', value: 'Tavus API' },
      { label: 'Status', value: 'Live' },
    ],
    github: '',
    live: '',
    image: '/simhealth.png',
    featured: true,
  },
  {
    id: 'moonlight',
    title: 'MoonLight',
    subtitle: 'Full-Stack E-Commerce Platform',
    description: 'A production-ready e-commerce platform with role-based access control, JWT authentication, advanced product discovery, and a comprehensive admin suite — built entirely from scratch.',
    longDescription: 'MoonLight is a complete e-commerce ecosystem engineered from first principles. Features a dynamic product catalog with multi-parameter filtering and real-time search, secure JWT-based authentication with protected routes, and a full-featured admin panel for complete store management. Containerized with Docker for consistent deployment environments.',
    color: '#8b5cf6',
    gradient: 'from-violet-500/20 to-purple-500/20',
    category: 'E-Commerce · Full Stack',
    status: 'Production',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT', 'Docker', 'REST APIs'],
    features: [
      'Role-based admin panel (products, categories, users, orders)',
      'JWT authentication with protected routes',
      'Advanced search, filtering, and sorting',
      'Responsive UI with seamless UX',
      'Docker containerization for deployment',
      'Complete order management system',
    ],
    metrics: [
      { label: 'Auth', value: 'JWT + RBAC' },
      { label: 'Database', value: 'MongoDB' },
      { label: 'Deploy', value: 'Docker' },
      { label: 'Status', value: 'Live' },
    ],
    github: 'https://github.com/Akash-0310',
    live: '',
    image: '/moonlight.png',
    featured: true,
  },
]

export const skills = {
  frontend: {
    label: 'Frontend',
    color: '#8b5cf6',
    icon: '◈',
    items: [
      { name: 'React.js', level: 95, category: 'Core' },
      { name: 'Next.js', level: 85, category: 'Framework' },
      { name: 'JavaScript ES6+', level: 92, category: 'Core' },
      { name: 'TypeScript', level: 75, category: 'Language' },
      { name: 'Tailwind CSS', level: 90, category: 'Styling' },
      { name: 'HTML5 / CSS3', level: 95, category: 'Core' },
      { name: 'Bootstrap', level: 85, category: 'Styling' },
    ],
  },
  backend: {
    label: 'Backend',
    color: '#06b6d4',
    icon: '◎',
    items: [
      { name: 'Node.js', level: 90, category: 'Runtime' },
      { name: 'Express.js', level: 88, category: 'Framework' },
      { name: 'REST APIs', level: 92, category: 'Architecture' },
      { name: 'Microservices', level: 78, category: 'Architecture' },
      { name: 'JWT Auth', level: 85, category: 'Security' },
    ],
  },
  database: {
    label: 'Database',
    color: '#f59e0b',
    icon: '◉',
    items: [
      { name: 'MongoDB', level: 88, category: 'NoSQL' },
      { name: 'MySQL', level: 78, category: 'SQL' },
    ],
  },
  cloud: {
    label: 'Cloud & DevOps',
    color: '#10b981',
    icon: '◌',
    items: [
      { name: 'AWS', level: 75, category: 'Cloud' },
      { name: 'Docker', level: 80, category: 'Containers' },
      { name: 'Azure', level: 70, category: 'Cloud' },
      { name: 'Git / GitHub', level: 90, category: 'VCS' },
      { name: 'Linux', level: 82, category: 'OS' },
      { name: 'CI/CD', level: 72, category: 'DevOps' },
    ],
  },
}

export const stats = [
  { label: 'Years Experience', value: '2+', suffix: '' },
  { label: 'Projects Shipped', value: '15', suffix: '+' },
  { label: 'Deploy Speed Improved', value: '15', suffix: '%' },
  { label: 'Awards Won', value: '3', suffix: '' },
]

export const blogPosts = [
  {
    id: 'microservices-patterns',
    title: 'Microservices in Production: Circuit Breakers & Message Brokers',
    excerpt: 'How I architected fault-tolerant microservices for Simhealth — the patterns, the pitfalls, and the lessons that changed how I think about distributed systems.',
    date: '2025-12-01',
    readTime: '8 min',
    category: 'Architecture',
    tags: ['Microservices', 'Node.js', 'AWS'],
    gradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 'ai-integration-react',
    title: 'Integrating AI APIs into React Apps Without the Headaches',
    excerpt: 'Practical lessons from wiring Tavus AI into a healthcare B2B platform — webhooks, error handling, rate limits, and keeping the UX butter smooth.',
    date: '2025-10-15',
    readTime: '6 min',
    category: 'AI Engineering',
    tags: ['AI', 'React', 'APIs'],
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
  {
    id: 'mern-performance',
    title: 'MERN Stack Performance: From 3s Load to Under 800ms',
    excerpt: 'A deep dive into the optimization techniques I use on every production MERN project — caching, query optimization, bundle splitting, and more.',
    date: '2025-09-01',
    readTime: '10 min',
    category: 'Performance',
    tags: ['MERN', 'Performance', 'MongoDB'],
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
]

export const testimonials = [
  {
    id: 1,
    name: 'Client — Healthcare Platform',
    role: 'Product Director',
    company: 'Simhealth',
    content: 'Akash delivered an AI-integrated healthcare platform that exceeded every technical requirement. The microservices architecture he designed has been rock-solid in production.',
    avatar: 'PD',
    rating: 5,
  },
  {
    id: 2,
    name: 'Team Lead',
    role: 'Senior Engineer',
    company: 'BestPeers Infosystem',
    content: "One of the most dependable full-stack engineers I've worked with. Akash takes ownership, communicates clearly, and ships production-quality code consistently.",
    avatar: 'SE',
    rating: 5,
  },
  {
    id: 3,
    name: 'TCS Recognition',
    role: 'Project Manager',
    company: 'Tata Consultancy Services',
    content: "Recognized with Certificate of Appreciation for Akash's outstanding contributions. His automation work improved deployment speed by 15% — a measurable impact from day one.",
    avatar: 'PM',
    rating: 5,
  },
]
