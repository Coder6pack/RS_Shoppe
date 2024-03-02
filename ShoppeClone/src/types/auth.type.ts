import { SuccessResponse } from './ultils.type'
import { User } from './user.typ'

// tao kieu du lieu de server tra auth ve
export type AuthResponse = SuccessResponse<{
  access_token: string
  expires: string
  user: User
}>
