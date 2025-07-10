import { Cycle } from 'meta/assessment/cycle'
import { UserEditCountryForm } from 'meta/form/userEdit/form'
import { User } from 'meta/user'

export type Props = {
  cycle: Cycle
  profilePicture?: Express.Multer.File | null
  user: User
  userEditForm: UserEditCountryForm
}
