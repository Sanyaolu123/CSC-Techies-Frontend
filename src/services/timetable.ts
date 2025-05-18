import axios from "@/lib/axios"

export const fetchTimeTable = async () => {
  const response = await axios.get("/timetable")
  return response.data
}
