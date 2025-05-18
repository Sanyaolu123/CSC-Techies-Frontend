import type { Courses } from "./course.interface"

export interface Material {
  id: string
  title: string
  type: MaterialType
  url: string
  available?: boolean
  course: Courses
}

export type MaterialType = 
  | "ASSIGMENT"
  | "RECORDING"
  | "DOCUMENT"
  | "NOTE"
  | "VIDEO"
  | "WEBSITE";