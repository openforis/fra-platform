import { CountryRequest } from 'meta/api/request/country'
import { UserEditCountryForm } from 'meta/form/userEdit/form'

export type UserEditRequest = CountryRequest<unknown, UserEditCountryForm>
