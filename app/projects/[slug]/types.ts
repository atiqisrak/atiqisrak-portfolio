export type Project = {
  title: string;
  banner: string;
  overview: string;
  challenge: string;
  solution: string;
  impact: string[];
  technicalDetails: {
    architecture: string[];
    technologies: string[];
  };
  processAndMethodology: string[];
}; 