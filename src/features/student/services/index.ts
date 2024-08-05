import axiosInstance from "@/config/axios"
import { Config } from "@/shared/utils/api-config"

export const submitAnswer = (data: any) => {
  return axiosInstance.post(`${Config.BASE_URL}/create-answer`, data)
}

export const getDetailObjective = () => {
  return axiosInstance.get(`${Config.BASE_URL}/objectives-detail/8fa017e3-268d-4241-a16f-7ec2ced53c31`)
}