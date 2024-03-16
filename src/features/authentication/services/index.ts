import axiosInstance from "@/config/axios"
import { Config } from "@/shared/utils/api-config"

type LoginType = {
  username: string
  password: string
}

export const login = async (data: LoginType) => {
  return await axiosInstance.post(`${Config.BASE_URL}/user/login`, data)
}