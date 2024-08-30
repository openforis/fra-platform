import { Readable } from 'stream'

export interface UserProfilePicture {
  name: string
  uuid: string
  data?: Readable
}
