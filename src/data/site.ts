// Single source for personal facts, résumé and the agent-setup arc.
// Facts come from the old personal-site data.ts and the brain-vault Blog notes.

export const person = {
  name: 'Connor Dos Santos Cates',
  fullName: 'Connor Dos Santos Cates',
  role: 'Senior Software Engineer',
  company: 'Vivint',
  location: 'Boston, MA',
  positioning: 'Engineer building with AI',
  bio: "iOS engineer at Vivint. I spent five months cutting my agent setup down to the parts that earn their keep, and I write up what I measure.",
  email: 'cates.connor@gmail.com',
  links: {
    github: 'https://github.com/ccates83',
    linkedin: 'https://linkedin.com/in/connorcates',
    medium: 'https://medium.com/@connorcates',
  },
};

export const principles = [
  'Determinism beats orchestration.',
  'Measure before and after.',
  'Safety through revert, not approval.',
];

export const eras = [
  { n: '1', title: 'Agent swarm', body: 'Persona agents coordinating through custom MCP servers.', dots: 24 },
  { n: '2', title: 'A vault for memory', body: 'An Obsidian vault becomes the shared memory every session reads.', dots: 16 },
  { n: '3', title: 'Watchers', body: 'One terminal per watcher, each waiting for work.', dots: 10 },
  { n: '4', title: 'Headless workers', body: 'Detached `claude -p` jobs that only a status script could see.', dots: 6 },
  { n: '5', title: 'Script-first', body: 'Rules over fetched data move into tested scripts.', dots: 3 },
  { n: '6', title: 'One dashboard', body: "Every remaining model run is a row in Claude Code's agent view.", dots: 1, now: true },
];

export const jobs = [
  {
    when: 'Mar 2024 — Now',
    title: 'Senior Software Engineer',
    org: 'Vivint',
    body: 'Lead mobile development on a major app re-architecture with user-driven information architecture and progressive rollout. Architected the networking and data-layer restructure. Lead company-wide iOS standards for package versioning and data-layer practice; drive UX decisions with design; interview across iOS, Android and backend; mentor junior engineers.',
    stack: ['Swift', 'SwiftUI', 'Combine', 'REST', 'SPM'],
  },
  {
    when: 'Apr 2022 — Mar 2024',
    title: 'Software Engineer II',
    org: 'Vivint',
    body: 'Led the iOS Modernization Team, moving a legacy codebase onto current Swift and iOS frameworks and raising coding standards. Contributed to architecture and application-layer design.',
    stack: ['Swift', 'Objective-C', 'SwiftUI', 'UIKit'],
  },
  {
    when: 'Jul 2021 — Apr 2022',
    title: 'Software Engineer I',
    org: 'Vivint',
    body: 'Built iOS features in Swift and Objective-C across the full development lifecycle.',
    stack: ['Swift', 'Objective-C', 'UIKit'],
  },
];

export const education = {
  degree: 'B.A. Computer Science',
  school: 'Hamilton College',
  body: "Departmental Honors, minor in Mathematics. NCAA student-athlete, three-time Dean's List, NESCAC All-Academic Team.",
};

export const skills = [
  { group: 'Languages', items: ['Swift', 'Objective-C', 'TypeScript', 'Python', 'SQL'] },
  { group: 'Apple', items: ['SwiftUI', 'UIKit', 'SwiftData', 'CloudKit', 'Combine', 'XCTest'] },
  { group: 'AI tooling', items: ['Claude Code', 'Headless agents', 'MCP', 'Evaluation & measurement'] },
  { group: 'Practice', items: ['Architecture', 'Mentoring', 'Technical interviewing', 'Standards'] },
];
