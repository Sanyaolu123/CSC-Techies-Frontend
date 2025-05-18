import type { Courses } from './course.interface'

export interface Overview {
  session: string
  startDate: string
  endDate: string
  expectedExamStartDate: string
  expectedExamEndDate: string
  expectedGraduationDate: string
  semesterType: string
  courses?: Courses[]
}
