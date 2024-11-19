export type Template = {
  id: number;
  title: string;
  subtitle: string;
  missionCount: number;
};

type SubSection = string;

export type RoadmapStep = {
  step_number: number;
  section: string;
  sub_section: SubSection[];
};
