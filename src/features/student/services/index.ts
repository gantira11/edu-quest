import axiosInstance from "@/config/axios"
import { Config } from "@/shared/utils/api-config"

export const submitAnswer = (data: any) => {
  return axiosInstance.post(`${Config.BASE_URL}/create-answer`, data)
}