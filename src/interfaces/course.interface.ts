import type { Material } from "./material.interface"

export interface Courses {
  id: string
  semesterId: string
  courseCode: string
  courseTitle: string
  courseType: string
  units: number
  materials: Material[]
  createdAt: string
}