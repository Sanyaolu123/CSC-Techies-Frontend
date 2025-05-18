import type { Courses } from "./course.interface"

export interface Timetable {
  id: string
  title?: string
  description?: string
  venue: string
  startDate: string
  endDate: string
  course: Courses
  sessions: ClassSession[]
}

type ClassSession = {
  dayOfWeek: number; // 0 (Sunday) - 6 (Saturday)
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
};