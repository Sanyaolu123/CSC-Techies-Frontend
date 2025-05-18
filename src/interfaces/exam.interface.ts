import type { Courses } from "./course.interface"

export interface Exam {
  id: string
  title: string
  description: string
  venue: string
  type: ExamType
  course: Courses
  startDate: string
  endDate: string
}

type ExamType = 
  | "EXAM"
  | "TEST"
  | "PROJECT_DEFENSE"