import * as yup from 'yup'

export const quizSchema = yup.object({
  name: yup.string().required().label('Nama Quiz'),
  subject_id: yup.string().nullable().notRequired().label('Subject ID'),
  duration: yup.number().required().transform(val => isNaN(val) ? null : val).label('Durasi'),
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