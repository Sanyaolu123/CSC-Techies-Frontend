import axios from "@/lib/axios"

export const fetchAllMaterials = async () => {
  const response = await axios.get("/materials")
  return response.data
}
