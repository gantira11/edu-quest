import axiosInstance from "@/config/axios"
import { Config } from "@/shared/utils/api-config"

export const getDashboard = () => {
  return axiosInstance.get(`${Config.BASE_URL}/dashboard`)
}