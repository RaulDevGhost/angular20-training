interface Project {
  title: string;
  description: string;
  client: 'Siemens' | 'Bayern' | '3M' | 'Bosch';
}

export interface User {
  id: string;
  name: string;
  title: string;
  avatar: string;
  description: string;
  technologies: string[];
  projects: Project[];
  current_project: Project;
  specialist:
    | 'frontend'
    | 'backend'
    | 'devops'
    | 'fullstack'
    | 'mobile'
    | 'qa'
    | 'architect';
  level: 'junior' | 'mid' | 'senior' | 'lead' | 'principal';
  years_in_company: number;
  client_satisfaction: number; // 0-100
  job_happiness: number; // 0-100
  languages: ('english' | 'german')[];
}

export const DUMMY_USERS: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Senior Software Developer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#4F46E5"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">SJ</text>
      </svg>`,
    description:
      'Exceptional full-stack developer with a strong focus on scalable architecture and performance optimization. Known for her expertise in React ecosystem and building robust payment systems.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    projects: [
      {
        title: 'E-commerce Platform',
        description:
          'Built a comprehensive online marketplace with advanced product catalog, inventory management, and multi-vendor support',
        client: 'Siemens',
      },
      {
        title: 'Customer Portal',
        description:
          'Developed a self-service portal allowing customers to manage accounts, track orders, and access support resources',
        client: 'Bayern',
      },
      {
        title: 'Payment Gateway Integration',
        description:
          'Implemented secure payment processing system supporting multiple currencies and payment methods',
        client: '3M',
      },
    ],
    current_project: {
      title: 'Mobile App Redesign',
      description:
        'Leading the complete UX/UI overhaul of the mobile application to improve user engagement and conversion rates',
      client: 'Bosch',
    },
    specialist: 'fullstack',
    level: 'senior',
    years_in_company: 4,
    client_satisfaction: 92,
    job_happiness: 87,
    languages: ['english'],
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Frontend Developer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#059669"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">MC</text>
      </svg>`,
    description:
      'Creative frontend developer with exceptional UX design skills and expertise in modern JavaScript frameworks. Specializes in creating intuitive user interfaces and smooth user experiences.',
    technologies: ['Vue.js', 'JavaScript', 'CSS3', 'Sass', 'Webpack'],
    projects: [
      {
        title: 'Dashboard Redesign',
        description:
          'Completely reimagined the analytics dashboard with improved data visualization and user-friendly navigation',
        client: 'Bosch',
      },
      {
        title: 'Component Library',
        description:
          'Created a comprehensive design system and reusable component library to standardize UI across applications',
        client: 'Siemens',
      },
      {
        title: 'Marketing Website',
        description:
          'Developed a high-conversion marketing website with interactive elements and optimized performance',
        client: 'Bayern',
      },
    ],
    current_project: {
      title: 'Admin Dashboard v2.0',
      description:
        'Building next-generation admin interface with advanced filtering, real-time updates, and improved accessibility',
      client: '3M',
    },
    specialist: 'frontend',
    level: 'mid',
    years_in_company: 2,
    client_satisfaction: 88,
    job_happiness: 91,
    languages: ['english', 'german'],
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    title: 'Full Stack Developer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#DC2626"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">ER</text>
      </svg>`,
    description:
      'Highly skilled full-stack developer with deep expertise in Python backend development and modern containerization. Excels at designing scalable microservices architecture and API development.',
    technologies: ['Python', 'Django', 'React', 'Docker', 'Redis'],
    projects: [
      {
        title: 'Inventory Management System',
        description:
          'Developed real-time inventory tracking system with automated reordering and supply chain optimization',
        client: '3M',
      },
      {
        title: 'API Gateway',
        description:
          'Built centralized API gateway for microservices communication with rate limiting and authentication',
        client: 'Siemens',
      },
      {
        title: 'Data Analytics Dashboard',
        description:
          'Created comprehensive analytics platform with real-time reporting and predictive insights',
        client: 'Bosch',
      },
    ],
    current_project: {
      title: 'Microservices Migration',
      description:
        'Leading the migration from monolithic architecture to scalable microservices using containerization',
      client: 'Bayern',
    },
    specialist: 'fullstack',
    level: 'senior',
    years_in_company: 3,
    client_satisfaction: 95,
    job_happiness: 83,
    languages: ['english'],
  },
  {
    id: '4',
    name: 'David Thompson',
    title: 'Backend Developer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#7C3AED"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">DT</text>
      </svg>`,
    description:
      'Expert backend developer specializing in enterprise Java applications and high-performance systems. Particularly strong in backend security, data processing, and search engine optimization.',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'Kafka', 'Elasticsearch'],
    projects: [
      {
        title: 'Order Processing System',
        description:
          'Built high-volume order processing system handling millions of transactions with real-time validation',
        client: 'Bayern',
      },
      {
        title: 'Search Engine Optimization',
        description:
          'Implemented advanced search functionality with fuzzy matching, filters, and performance optimization',
        client: 'Bosch',
      },
      {
        title: 'Real-time Analytics',
        description:
          'Developed streaming analytics platform processing real-time data with Apache Kafka integration',
        client: '3M',
      },
    ],
    current_project: {
      title: 'Performance Optimization',
      description:
        'Optimizing database queries and system performance to handle 10x increased traffic load',
      client: 'Siemens',
    },
    specialist: 'backend',
    level: 'senior',
    years_in_company: 5,
    client_satisfaction: 89,
    job_happiness: 79,
    languages: ['english', 'german'],
  },
  {
    id: '5',
    name: 'Lisa Park',
    title: 'Software Engineer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#EA580C"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">LP</text>
      </svg>`,
    description:
      'Promising junior developer with strong .NET skills and growing expertise in cloud technologies. Shows great potential in backend development and is eager to learn new technologies.',
    technologies: ['C#', '.NET Core', 'Azure', 'SQL Server', 'SignalR'],
    projects: [
      {
        title: 'Chat Application',
        description:
          'Built real-time messaging application with file sharing, group chats, and notification system',
        client: 'Siemens',
      },
      {
        title: 'File Management System',
        description:
          'Developed secure document management platform with version control and access permissions',
        client: 'Bosch',
      },
      {
        title: 'Reporting Module',
        description:
          'Created automated reporting system with customizable templates and scheduled delivery',
        client: 'Bayern',
      },
    ],
    current_project: {
      title: 'Cloud Migration',
      description:
        'Assisting in migrating legacy applications to Azure cloud infrastructure with improved scalability',
      client: '3M',
    },
    specialist: 'backend',
    level: 'junior',
    years_in_company: 1,
    client_satisfaction: 86,
    job_happiness: 94,
    languages: ['english'],
  },
  {
    id: '6',
    name: 'James Wilson',
    title: 'DevOps Engineer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#0891B2"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">JW</text>
      </svg>`,
    description:
      'Experienced DevOps engineer with exceptional skills in container orchestration and infrastructure automation. Expert in building robust CI/CD pipelines and monitoring systems.',
    technologies: [
      'Kubernetes',
      'Docker',
      'Terraform',
      'Jenkins',
      'Prometheus',
    ],
    projects: [
      {
        title: 'CI/CD Pipeline Setup',
        description:
          'Implemented automated deployment pipeline reducing deployment time by 80% and improving reliability',
        client: '3M',
      },
      {
        title: 'Infrastructure Automation',
        description:
          'Automated infrastructure provisioning using Infrastructure as Code principles with Terraform',
        client: 'Bayern',
      },
      {
        title: 'Monitoring Implementation',
        description:
          'Set up comprehensive monitoring and alerting system with Prometheus and Grafana dashboards',
        client: 'Siemens',
      },
    ],
    current_project: {
      title: 'Multi-Cloud Architecture',
      description:
        'Designing and implementing multi-cloud deployment strategy for improved redundancy and cost optimization',
      client: 'Bosch',
    },
    specialist: 'devops',
    level: 'senior',
    years_in_company: 6,
    client_satisfaction: 93,
    job_happiness: 88,
    languages: ['english'],
  },
  {
    id: '7',
    name: 'Maria Garcia',
    title: 'Mobile Developer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#BE185D"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">MG</text>
      </svg>`,
    description:
      'Talented mobile developer with expertise in cross-platform development and native iOS/Android apps. Specializes in creating smooth user experiences and integrating complex mobile features.',
    technologies: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'Redux'],
    projects: [
      {
        title: 'Fitness Tracking App',
        description:
          'Developed comprehensive fitness app with workout tracking, social features, and health data integration',
        client: 'Bosch',
      },
      {
        title: 'Shopping App',
        description:
          'Built feature-rich e-commerce mobile app with AR product preview and seamless checkout experience',
        client: '3M',
      },
      {
        title: 'Social Media Integration',
        description:
          'Implemented social login, sharing features, and real-time social interactions across multiple platforms',
        client: 'Bayern',
      },
    ],
    current_project: {
      title: 'Cross-platform Banking App',
      description:
        'Developing secure banking application with biometric authentication and advanced financial features',
      client: 'Siemens',
    },
    specialist: 'mobile',
    level: 'mid',
    years_in_company: 2,
    client_satisfaction: 91,
    job_happiness: 85,
    languages: ['english', 'german'],
  },
  {
    id: '8',
    name: 'Alex Kumar',
    title: 'Software Architect',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#059669"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">AK</text>
      </svg>`,
    description:
      'Visionary software architect with deep expertise in system design and enterprise architecture. Exceptional at designing scalable systems and leading technical strategy across complex projects.',
    technologies: [
      'System Design',
      'Microservices',
      'GraphQL',
      'Event Sourcing',
      'CQRS',
    ],
    projects: [
      {
        title: 'Enterprise Architecture Redesign',
        description:
          'Led complete architectural overhaul of legacy system supporting 10M+ users with improved performance',
        client: 'Siemens',
      },
      {
        title: 'API Strategy',
        description:
          'Designed comprehensive API strategy and governance framework for enterprise-wide API management',
        client: '3M',
      },
      {
        title: 'Scalability Planning',
        description:
          'Created long-term scalability roadmap and technical architecture for handling exponential growth',
        client: 'Bosch',
      },
    ],
    current_project: {
      title: 'Platform Modernization',
      description:
        'Leading enterprise-wide platform modernization initiative using event-driven architecture and CQRS patterns',
      client: 'Bayern',
    },
    specialist: 'architect',
    level: 'principal',
    years_in_company: 8,
    client_satisfaction: 97,
    job_happiness: 92,
    languages: ['english'],
  },
  {
    id: '9',
    name: 'Rachel Adams',
    title: 'QA Engineer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#7C2D12"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">RA</text>
      </svg>`,
    description:
      'Meticulous QA engineer with strong expertise in test automation and quality assurance processes. Excellent at designing comprehensive testing strategies and implementing automated testing frameworks.',
    technologies: ['Selenium', 'Jest', 'Cypress', 'Postman', 'TestRail'],
    projects: [
      {
        title: 'Test Automation Framework',
        description:
          'Built comprehensive test automation framework reducing manual testing time by 70% and improving coverage',
        client: 'Bayern',
      },
      {
        title: 'Performance Testing Suite',
        description:
          'Developed performance testing infrastructure for load testing and bottleneck identification',
        client: 'Siemens',
      },
      {
        title: 'Quality Gate Implementation',
        description:
          'Implemented automated quality gates in CI/CD pipeline ensuring code quality and test coverage standards',
        client: 'Bosch',
      },
    ],
    current_project: {
      title: 'Automated Testing Pipeline',
      description:
        'Creating end-to-end automated testing pipeline with cross-browser testing and detailed reporting',
      client: '3M',
    },
    specialist: 'qa',
    level: 'mid',
    years_in_company: 3,
    client_satisfaction: 90,
    job_happiness: 81,
    languages: ['english', 'german'],
  },
  {
    id: '10',
    name: 'Tom Anderson',
    title: 'Lead Developer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#1F2937"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">TA</text>
      </svg>`,
    description:
      'Experienced technical leader with strong mentoring skills and expertise in full-stack development. Exceptional at team management, code architecture, and establishing development best practices.',
    technologies: ['Leadership', 'Angular', 'Node.js', 'MongoDB', 'AWS'],
    projects: [
      {
        title: 'Team Mentoring Program',
        description:
          'Established comprehensive mentoring program improving team productivity and junior developer growth by 40%',
        client: 'Bosch',
      },
      {
        title: 'Code Review Standards',
        description:
          'Implemented company-wide code review standards and best practices improving code quality significantly',
        client: 'Siemens',
      },
      {
        title: 'Technical Roadmap',
        description:
          'Created strategic technical roadmap aligning technology choices with business objectives and scalability needs',
        client: '3M',
      },
    ],
    current_project: {
      title: 'Developer Experience Improvement',
      description:
        'Leading initiative to improve developer productivity through better tooling, processes, and development environment',
      client: 'Bayern',
    },
    specialist: 'fullstack',
    level: 'lead',
    years_in_company: 7,
    client_satisfaction: 94,
    job_happiness: 89,
    languages: ['english'],
  },
];
