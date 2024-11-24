export type Template = {
  id: number;
  title: string;
  subtitle: string;
  missionCount: number;
};

type SubSection = string;

export type RoadmapStep = {
  stepNumber: number;
  section: string;
  subSection: SubSection[];
};
