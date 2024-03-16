export const customValidationMessage = {
  mixed: {
    default: "${path} tidak valid",
    required: "${path} wajib diisi",
    defined: "${path} wajib diisi",
    notNull: "${path} tidak boleh kosong",
    oneOf: "${path} harus merupakkan salah satu dari: ${values}",
    notOneOf: "${path} tidak boleh salah satu dari: ${values}",
  },
  string: {
    length: "${path} harus tepat ${length} karakter",
    min: "${path} harus memiliki paling tidak ${min} karakter",
    max: "${path} harus memiliki paling banyak ${max} karakter",
    matches: "${path} harus memenuhi format berikut: \"${regex}\"",
    email: "${path} bukan email yang valid",
    url: "${path} bukan URL yang valid",
    uuid: "${path} bukan UUID yang valid",
    trim: "${path} harus merupakan teks",
    lowercase: "${path} harus merupakan teks dengan huruf kecil",
    uppercase: "${path} harus merupakan teks dengan huruf besar",
  },
  number: {
    min: "${path} harus lebih besar atau sama dengan ${min}",
    max: "${path} harus lebih kecil atau sama dengan ${max}",
    lessThan: "${path} harus kurang dari ${less}",
    moreThan: "${path} harus lebih besar dari ${more}",
    positive: "${path} harus merupakan angka positif",
    negative: "${path} harus merupakan angka negative",
    integer: "${path} harus merupakan angka",
  },
  date: {
    min: "${path} harus lebih besar dari ${min}",
    max: "${path} harus lebih kecil dari ${max}",
  },
  boolean: {
    isValue: "${path} harus merupakan ${value}",
  },
  object: {
    noUnknown: "${path} memiliki nilai yang tidak didefinisikan: ${unknown}",
  },
  array: {
    min: "${path} harus memiliki minimum ${min} data",
    max: "${path} harus memiliki maksimal ${max} data",
    length: "${path} harus memiliki ${length} data",
  },
};