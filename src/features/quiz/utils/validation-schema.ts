import * as yup from 'yup'

export const quizSchema = yup.object({
  name: yup.string().required().label('Nama Quiz'),
  subject_id: yup.string().nullable().notRequired().label('Subject ID'),
  duration: yup.number().required().transform(val => isNaN(val) ? null : val).label('Durasi'),
  category: yup.string().nullable().required().label('Tipe Quiz'),
  quetions: yup.array(
    yup.object({
      id: yup.string().notRequired(),
      name: yup.string().required().label('Pertanyaan'),
      discuss: yup.string().required().label('Pembahasan'),
      weight: yup.number().required().nullable().transform(val => val === Number(val) ? val : null),
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