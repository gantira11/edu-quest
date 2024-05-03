import * as yup from 'yup';

export const objectiveSchema = yup.object({
  title: yup.string().required().label('Title'),
  body: yup.string().required().label('body')
})