import { InferType } from 'yup'

import axiosInstance from "@/config/axios"
import { Config } from "@/shared/utils/api-config"
import { IParams } from "@/shared/utils/interfaces"

import { subjectSchema } from "../utils/validation-schema"


export const getListSubject = async ({ queryKey }: { queryKey: (string | IParams)[] }) => {
  return await axiosInstance.get(`${Config.BASE_URL}/subject-list`, { params: queryKey[1] })
}

export const getDetailSubject = async ({ queryKey }: { queryKey: (string | undefined)[] }) => {
  return await axiosInstance.get(`${Config.BASE_URL}/subject-detail/${queryKey[1]}`)
}

export const createSubject = async (data: InferType<typeof subjectSchema>) => {
  return await axiosInstance.post(`${Config.BASE_URL}/create-subject`, data)
}

export const updateSubject = async ({ id, data }: { id: string, data: InferType<typeof subjectSchema> }) => {
  return await axiosInstance.put(`${Config.BASE_URL}/subject-update/${id}`, data)
}

export const deleteVideoSubject = async (id: string) => {
  return await axiosInstance.delete(`${Config.BASE_URL}/video-delete/${id}`)
}

export const deleteSubject = async (id: string) => {
  return await axiosInstance.delete(`${Config.BASE_URL}/subject-delete/${id}`)
}
