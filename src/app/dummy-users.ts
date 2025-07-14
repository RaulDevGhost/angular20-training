export interface User {
  id: string;
  name: string;
  title: string;
  avatar: string;
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
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Frontend Developer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#059669"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">MC</text>
      </svg>`,
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    title: 'Full Stack Developer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#DC2626"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">ER</text>
      </svg>`,
  },
  {
    id: '4',
    name: 'David Thompson',
    title: 'Backend Developer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#7C3AED"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">DT</text>
      </svg>`,
  },
  {
    id: '5',
    name: 'Lisa Park',
    title: 'Software Engineer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#EA580C"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">LP</text>
      </svg>`,
  },
  {
    id: '6',
    name: 'James Wilson',
    title: 'DevOps Engineer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#0891B2"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">JW</text>
      </svg>`,
  },
  {
    id: '7',
    name: 'Maria Garcia',
    title: 'Mobile Developer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#BE185D"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">MG</text>
      </svg>`,
  },
  {
    id: '8',
    name: 'Alex Kumar',
    title: 'Software Architect',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#059669"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">AK</text>
      </svg>`,
  },
  {
    id: '9',
    name: 'Rachel Adams',
    title: 'QA Engineer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#7C2D12"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">RA</text>
      </svg>`,
  },
  {
    id: '10',
    name: 'Tom Anderson',
    title: 'Lead Developer',
    avatar: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#1F2937"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">TA</text>
      </svg>`,
  },
];
