import axiosInstance from "@/config/axios";
import { Config } from "@/shared/utils/api-config";
import { IParams } from "@/shared/utils/interfaces";
import { InferType } from "yup";
import { quizSchema } from "../utils/validation-schema";

export const getListQuiz = ({ queryKey }: { queryKey: (string | IParams)[] }) => {
  return axiosInstance.get(`${Config.BASE_URL}/quiz-list/${(queryKey[1] as IParams).id}`, { params: queryKey[1] })
}

export const getDetailQuiz = ({ queryKey }: { queryKey: (string | undefined)[] }) => {
  return axiosInstance.get(`${Config.BASE_URL}/quiz-detail/${queryKey[1]}`)
}

export const createQuiz = (data: InferType<typeof quizSchema>) => {
  return axiosInstance.post(`${Config.BASE_URL}/create-quizzes`, data)
}

export const updateQuiz = ({ id, data }: { id: string, data: InferType<typeof quizSchema> }) => {
  return axiosInstance.put(`${Config.BASE_URL}/quiz-update/${id}`, data)
}

export const deleteQuiz = (id: string | undefined) => {
  return axiosInstance.delete(`${Config.BASE_URL}/quiz-delete/${id}`)
}

export const deleteQuestion = (id: string | undefined) => {
  return axiosInstance.delete(`${Config.BASE_URL}/quetion-delete/${id}`)
}

export const deleteOption = (id: string | undefined) => {
  return axiosInstance.delete(`${Config.BASE_URL}/option-delete/${id}`)
}