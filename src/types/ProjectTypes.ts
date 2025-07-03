// Type for a single outcome item
export interface ProjectOutcome {
  data: string;
  description: string;
}

// Type for a single process step
export interface ProjectProcessStep {
  title: string;
  keywords: string[];
}

// Type for project challenges
export interface ProjectChallenges {
  technical: string[];
  theoretical: string;
}

// Type for a single user flow step
export interface ProjectUserFlowStep {
  title: string;
  img: string;
}

// Main Project type
export interface Project {
  client?: string; // Optional, as it's missing in "Cosmo Orders"
  title: string;
  country?: string; // Optional
  industry?: string; // Optional
  duration?: string; // Optional
  categories: string[];
  id: number;
  banner?: string; // Optional
  benefit?: string; // Optional
  outcomeDesc?: string;
  videoPath: string;
  caseStudy: boolean;
  challenges?: ProjectChallenges; // Optional
  process?: ProjectProcessStep[]; // Optional
  outcome?: ProjectOutcome[]; // Optional
  userFlow?: ProjectUserFlowStep[]; // Optional
  hideOutcomeInfo?: boolean; // Optional
  stack: string[];
  team: string | string[]; // Can be a string or an array of strings
  description: string;
  active: boolean;
  year: string;
}

// Type for the entire projects list array
export type ProjectsList = Project[];
