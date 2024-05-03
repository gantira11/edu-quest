import axiosInstance from "@/config/axios"
import { Config } from "@/shared/utils/api-config"

export const submitAnswer = (data: any) => {
  return axiosInstance.post(`${Config.BASE_URL}/create-answer`, data)
}

export const getDetailObjective = () => {
  return axiosInstance.get(`${Config.BASE_URL}/objectives-detail/63c240dc-2858-4488-9e90-f2f8418a4258`)
}