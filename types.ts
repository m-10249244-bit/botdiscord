
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

export interface StudyRoom {
  id: string;
  name: string;
  memberCount: number;
  isActive: boolean;
  type: 'focus' | 'casual' | 'intense';
}

export interface UserStats {
  studyHours: number;
  tasksCompleted: number;
  currentStreak: number;
  rank: string;
}

export enum ViewType {
  DASHBOARD = 'dashboard',
  TASKS = 'tasks',
  STUDY_ROOMS = 'study_rooms',
  DISCIPLINE = 'discipline',
  AI_COACH = 'ai_coach',
  SETTINGS = 'settings'
}
