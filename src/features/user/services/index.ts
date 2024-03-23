import { InferType } from "yup";

import axiosInstance from "@/config/axios";
import { Config } from "@/shared/utils/api-config";
import { IParams } from "@/shared/utils/interfaces";
import { userSchema } from "../utils/validation-schema";

export const getListUser = ({ queryKey }: { queryKey: (string | IParams)[] }) => {
  return axiosInstance.get(`${Config.BASE_URL}/user/list`, { params: queryKey[1] })
}

export const getDetailUser = ({ queryKey }: { queryKey: (string | undefined)[] }) => {
  return axiosInstance.get(`${Config.BASE_URL}/user/detail/${queryKey[1]}`)
}

export const createUser = (data: InferType<typeof userSchema>) => {
  return axiosInstance.post(`${Config.BASE_URL}/user/create`, data);
}

export const updateUser = ({ id, data }: { id: string, data: InferType<typeof userSchema> }) => {
  return axiosInstance.put(`${Config.BASE_URL}/user/update/${id}`, data)
}

export const deleteUser = (id: string | undefined) => {
  return axiosInstance.delete(`${Config.BASE_URL}/user/delete/${id}`)
}