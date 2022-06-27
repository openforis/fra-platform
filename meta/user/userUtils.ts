import { Objects } from '@core/utils'

export const profilePictureUri = (userId: any) => `/api/users/user/${userId}/profilePicture`

// max 1Mb
export const validProfilePicture = (user: any) => !user.profilePicture || user.profilePicture.size <= 1000000

// validation methods
export const validName = (user: any) => !Objects.isEmpty(user.name)
export const validRole = (user: any) => !Objects.isEmpty(user.roles)

export const validEmail = (user: any) => {
  // const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const re = /.+@.+/
  return re.test(user.email)
}

export const UserUtils = {
  profilePictureUri,
  validProfilePicture,
  validName,
  validRole,
  validEmail,
}
