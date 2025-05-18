import axios from "@/lib/axios"

export const fetchSemesterOverview = async () => {
  const response = await axios.get("/semester/overview")
  return response.data
}
