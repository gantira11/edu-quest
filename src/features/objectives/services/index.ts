import { InferType } from "yup";

import axiosInstance from "@/config/axios";
import { Config } from "@/shared/utils/api-config";
import { IParams } from "@/shared/utils/interfaces";
import { objectiveSchema } from "../utils/validation-schema";

export const getListObjective = ({ queryKey }: { queryKey: (string | IParams)[] }) => {
  return axiosInstance.get(`${Config.BASE_URL}/objectives-list`, { params: queryKey[1] });
}

export const getObjectivesDetail = ({ queryKey }: { queryKey: string[] }) => {
  return axiosInstance.get(`${Config.BASE_URL}/objectives-detail/${queryKey[1]}`)
}

export const createObjectives = (data: InferType<typeof objectiveSchema>) => {
  return axiosInstance.post(`${Config.BASE_URL}/create-objectives`, data);
}

export const updateObjectives = ({ id, data }: { id: string, data: InferType<typeof objectiveSchema> }) => {
  return axiosInstance.put(`${Config.BASE_URL}/objectives-update/${id}`, data);
}
