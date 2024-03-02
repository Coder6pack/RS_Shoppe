export interface SuccessResponse<Data> {
  message: string
  data: Data
}
//khai bao interface response tra ve
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
