import axiosInstance from "@/config/axios"
import { Config } from "@/shared/utils/api-config"
import { IParams } from "@/shared/utils/interfaces"

export const getAnswerList = ({ queryKey }: { queryKey: (string | IParams)[] }) => {
  return axiosInstance.get(`${Config.BASE_URL}/answer-list`, { params: queryKey[1] })
}