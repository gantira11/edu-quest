import axiosInstance from "@/config/axios"
import { Config } from "@/shared/utils/api-config"

export const submitAnswer = (data: any) => {
  return axiosInstance.post(`${Config.BASE_URL}/create-answer`, data)
}

export const getDetailObjective = () => {
  return axiosInstance.get(`${Config.BASE_URL}/objectives-detail/2610a9c5-e5b2-45f0-84b0-65d47d7704c5`)
}