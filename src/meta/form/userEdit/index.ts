import { UserTitle } from 'meta/user'

export type UserEditForm = {
  userId: number
  profilePicture?: File
  email: string
  name: string
  surname: string
  title: UserTitle
}
