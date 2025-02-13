import * as yup from 'yup'

export const subjectSchema = yup.object({
  name: yup.string().required().label('Nama Materi'),
  content: yup.string().required().label('Content'),
  videos: yup.array(
    yup.object({
      video_id: yup.string().notRequired(),
      name: yup.string().required().label('Nama'),
      file_url: yup.string().required().label('File'),
      loading: yup.bool().notRequired()
    })
  ),
});