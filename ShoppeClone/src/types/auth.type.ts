import { ResponseApi } from './ultils.type'
import { User } from './user.typ'

// tao kieu du lieu de server tra auth ve
export type AuthResponse = ResponseApi<{
  access_token: string
  expires: string
  user: User
}>
