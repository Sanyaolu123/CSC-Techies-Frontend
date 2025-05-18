import axios from "@/lib/axios"

export const fetchCourses = async () => {
  const response = await axios.get("/courses")
  return response.data
}
