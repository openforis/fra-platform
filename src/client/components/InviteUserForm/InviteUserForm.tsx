import './InviteUserForm.scss'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { CountryIso } from 'meta/area'
import { Lang, LanguageCodes } from 'meta/lang'
import { RoleName, Users } from 'meta/user'

import { useAppDispatch } from 'client/store/hooks'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useToaster } from 'client/hooks/useToaster'
import { useInitialState } from 'client/components/InviteUserForm/hooks/initialState'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  surname: z.string().min(2, 'Surame must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  role: z.string().min(1, 'Please select a role.'),
  language: z.string().min(1, 'Please select a language.'),
})

type FormValues = z.infer<typeof formSchema>

const InviteUserForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { toaster } = useToaster()

  const user = useUser()
  const cycle = useCycle()

  const defaultValues = useInitialState()
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(
      UserManagementActions.inviteUser({
        assessmentName,
        cycleName,
        countryIso,
        email: data.email,
        lang: data.language as Lang,
        name: data.name,
        permissions: undefined, // TODO,
        role: data.role as RoleName,
        surname: data.surname,
      })
    )
      .unwrap()
      .then(() => {
        toaster.info(t('userManagement.userAdded', { email: data.email }))
        navigate(-1)
      })
      .catch(() => {
        // Error handled by server
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} placeholder="John" />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="surname">Surname</label>
        <input id="surname" {...register('surname')} placeholder="Doe" />
        {errors.surname && <p>{errors.surname.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} placeholder="John@Doe.com" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="role">Language</label>
        <select id="role" {...register('role')}>
          {Users.getRolesAllowedToEdit({ user, countryIso, cycle }).map((role: RoleName) => (
            <option key={role} value={role}>
              {t(Users.getI18nRoleLabelKey(role))}
            </option>
          ))}
        </select>
        {errors.role && <p>{errors.role.message}</p>}
      </div>

      <div>
        <label htmlFor="language">Language</label>
        <select id="language" {...register('language')}>
          {LanguageCodes.map((lang) => (
            <option key={lang} value={lang}>
              {t(`language.${lang}`)}
            </option>
          ))}
        </select>
        {errors.language && <p>{errors.language.message}</p>}
      </div>

      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
  //
  // const initialState = useInitialState()
  // const [userToInvite, setUserToInvite] = useState<UserToInvite>(initialState)
  // const [errors, setErrors] = useState<Record<string, boolean>>({})
  //
  // const navigate = useNavigate()
  // const { t } = useTranslation()
  //
  // const countryIso = useCountryIso()
  // const cycle = useCycle()
  // const user = useUser()
  //
  // const onUserInvite = useOnUserInvite({ userToInvite, setUserToInvite, countryIso, cycle, user, setErrors })
  //
  // const goBack = useCallback(() => {
  //   navigate(-1)
  // }, [navigate])
  //
  // const handlePermissionsChange = (permissions: CollaboratorPermissions) => {
  //   setUserToInvite({ ...userToInvite, permissions })
  // }
  //
  // return (
  //   <div className="edit-user__form-container invite-user-container">
  //     {Object.values(errors).find((value) => !!value) && (
  //       <div className="invite-user-error-container">{t('userManagement.formErrors')}</div>
  //     )}
  //
  //     <div className="edit-user__form-item">
  //       <div className="edit-user__form-label">{t('common.name')}*</div>
  //       <input
  //         className="edit-user__form-field edit-user__form-input-text-field text-input__input-field"
  //         name="name"
  //         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  //           setUserToInvite({ ...userToInvite, name: e.target.value })
  //         }
  //         onFocus={() => setErrors({ ...errors, name: null })}
  //         type="text"
  //         value={userToInvite.name}
  //       />
  //     </div>
  //
  //     <div className="edit-user__form-item">
  //       <div className="edit-user__form-label">{t('editUser.surname')}*</div>
  //       <input
  //         className="edit-user__form-field edit-user__form-input-text-field text-input__input-field"
  //         name="surname"
  //         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  //           setUserToInvite({ ...userToInvite, surname: e.target.value })
  //         }
  //         onFocus={() => setErrors({ ...errors, surname: null })}
  //         type="text"
  //         value={userToInvite.surname}
  //       />
  //     </div>
  //
  //     <div className="edit-user__form-item">
  //       <div className="edit-user__form-label">{t('common.role')}*</div>
  //       <div className="edit-user__form-field edit-user__form-select-field">
  //         <select
  //           className="fra-table__select"
  //           onChange={(e) => {
  //             const role = e.target.value as RoleName
  //             if (role !== RoleName.COLLABORATOR) {
  //               setUserToInvite({ ...userToInvite, role, permissions: undefined })
  //             } else {
  //               setUserToInvite({ ...userToInvite, role })
  //             }
  //           }}
  //           value={userToInvite.role}
  //         >
  //           <option value="">{t('userManagement.placeholder')}</option>
  //           {Users.getRolesAllowedToEdit({ user, countryIso, cycle }).map((role: RoleName) => (
  //             <option key={role} value={role}>
  //               {t(Users.getI18nRoleLabelKey(role))}
  //             </option>
  //           ))}
  //         </select>
  //       </div>
  //     </div>
  //
  //     <div className="edit-user__form-item">
  //       <div className="edit-user__form-label">{t('common.email')}*</div>
  //
  //       <input
  //         className="edit-user__form-field edit-user__form-input-text-field text-input__input-field"
  //         name="email"
  //         onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
  //           setUserToInvite({ ...userToInvite, email: e.target.value })
  //         }
  //         onFocus={() => setErrors({ ...errors, email: null })}
  //         type="text"
  //         value={userToInvite.email}
  //       />
  //     </div>
  //
  //     <div className="edit-user__form-item">
  //       <div className="edit-user__form-label">{t('common.language')}</div>
  //       <div className="edit-user__form-field edit-user__form-select-field">
  //         <select
  //           className="fra-table__select"
  //           onChange={(e) => setUserToInvite({ ...userToInvite, lang: e.target.value as Lang })}
  //           value={userToInvite.lang}
  //         >
  //           {LanguageCodes.map((lang) => (
  //             <option key={lang} value={lang}>
  //               {t(`language.${lang}`)}
  //             </option>
  //           ))}
  //         </select>
  //       </div>
  //     </div>
  //
  //     {userToInvite.role === RoleName.COLLABORATOR && (
  //       <InviteCollaboratorPermissions
  //         onPermissionsChange={handlePermissionsChange}
  //         permissions={userToInvite.permissions}
  //       />
  //     )}
  //
  //     <div className="edit-user__form-item button-container">
  //       <button className="btn btn-secondary" onClick={goBack} type="submit">
  //         {t('common.cancel')}
  //       </button>
  //
  //       <button className="btn btn-primary" onClick={onUserInvite} type="submit">
  //         {t('common.submit')}
  //       </button>
  //     </div>
  //   </div>
  // )
}

export default InviteUserForm
