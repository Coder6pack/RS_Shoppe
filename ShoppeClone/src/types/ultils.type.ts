export interface SuccessResponse<Data> {
  message: string
  data: Data
}
//khai bao interface response tra ve
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>
}
