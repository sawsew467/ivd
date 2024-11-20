export interface TrainingGroup {
  id: string;
  name: string;
  description: string;
  members: string[];
  createdAt: Date;
  avatar: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: "Mentor" | "Mentee";
  avatar: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  members: Member[];
}
