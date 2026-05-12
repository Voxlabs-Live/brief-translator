export interface BriefResult {
  brief: {
    project: string;
    deliverable: string;
    audience: string;
    key_message: string;
    references: string;
    brand: string;
    deadline: string;
    constraints: string;
  };
  openQuestions: string[];
  parallelAsks: Array<{
    description: string;
    why_separate: string;
  }>;
}
