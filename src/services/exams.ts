import axios from "@/lib/axios"

export const fetchExamOrTests = async () => {
  const response = await axios.get("/exams")
  return response.data
}
