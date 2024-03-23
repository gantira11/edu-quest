import * as yup from 'yup'

export const quizSchema = yup.object({
  name: yup.string().required().label('Nama Quiz'),
  subject_id: yup.string().nullable().notRequired().label('Subject ID'),
  quetions: yup.array(
    yup.object({
      id: yup.string().notRequired(),
      name: yup.string().required().label('Pertanyaan'),
      discuss: yup.string().required().label('Pembahasan'),
      options: yup.array(
        yup.object({
          id: yup.string().notRequired(),
          name: yup.string().required().label('Pertanyaan'),
          is_correct: yup.bool(),
        })
      ),
    })
  ),
});