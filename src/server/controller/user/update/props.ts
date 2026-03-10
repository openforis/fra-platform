import { AreaCode } from 'meta/area/areaCode'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { UserEditCountryForm } from 'meta/form/userEdit/form'
import { User } from 'meta/user/user'

export type Props = {
  assessment: Assessment
  countryIso?: AreaCode
  cycle: Cycle
  profilePicture?: Express.Multer.File | null
  user: User
  userEditForm: UserEditCountryForm
}
