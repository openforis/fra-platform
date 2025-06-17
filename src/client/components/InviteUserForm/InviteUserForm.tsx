import './InviteUserForm.scss'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { CountryIso } from 'meta/area'
import { LanguageCodes } from 'meta/lang'
import { CollaboratorPermissions, RoleName, Users } from 'meta/user'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useUser } from 'client/store/user/hooks/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { DataCell, DataGrid, DataRow } from 'client/components/DataGrid'
import InputText from 'client/components/Inputs/InputText'
import Select from 'client/components/Inputs/Select'
import { useInitialState } from 'client/components/InviteUserForm/hooks/initialState'
import { useOnSubmit } from 'client/components/InviteUserForm/hooks/useOnSubmit'
import InviteCollaboratorPermissions from 'client/components/InviteUserForm/InviteCollaboratorPermissions'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  surname: z.string().min(2, 'Surame must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  role: z.string().min(1, 'Please select a role.'),
  language: z.string().min(1, 'Please select a language.'),
  permissions: z.custom<CollaboratorPermissions>().optional(),
})

type FormValues = z.infer<typeof formSchema>

const InviteUserForm: React.FC = () => {
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const user = useUser()
  const cycle = useCycle()

  const defaultValues = useInitialState()
  const onSubmit = useOnSubmit()

  const handleCancel = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const roleOptions = Users.getRolesAllowedToEdit({ user, countryIso, cycle }).map((role: RoleName) => ({
    label: t(Users.getI18nRoleLabelKey(role)),
    value: role,
  }))

  const languageOptions = LanguageCodes.map((lang) => ({
    label: t(`language.${lang}`),
    value: lang,
  }))

  const gridTemplateColumns = '0.3fr 1fr'

  return (
    <div className="app-view__content">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DataGrid className="form-grid" gridTemplateColumns={gridTemplateColumns}>
          <DataRow>
            <DataCell className="form-cell-label" noBorder>
              <label htmlFor="name">{t('common.name')}*</label>
            </DataCell>
            <DataCell editable lastCol lastRow>
              <InputText id="name" name="name" {...register('name')} />
              {errors.name && <div className="form-cell-error">{errors.name.message}</div>}
            </DataCell>
          </DataRow>

          <DataRow>
            <DataCell className="form-cell-label" noBorder>
              <label htmlFor="surname">{t('editUser.surname')}*</label>
            </DataCell>
            <DataCell editable lastCol lastRow>
              <InputText id="surname" name="surname" {...register('surname')} />
              {errors.surname && <div className="form-cell-error">{errors.surname.message}</div>}
            </DataCell>
          </DataRow>

          <DataRow>
            <DataCell className="form-cell-label" noBorder>
              <label htmlFor="role">{t('common.role')}*</label>
            </DataCell>
            <DataCell editable lastCol lastRow>
              <Select
                isClearable={false}
                onChange={(value) => setValue('role', value as string)}
                options={roleOptions}
                placeholder={t('userManagement.placeholder')}
                value={watch('role')}
              />
              {errors.role && <div className="form-cell-error">{errors.role.message}</div>}
            </DataCell>
          </DataRow>

          <DataRow>
            <DataCell className="form-cell-label" noBorder>
              <label htmlFor="email">{t('editUser.email')}*</label>
            </DataCell>
            <DataCell editable lastCol lastRow>
              <InputText id="email" name="email" {...register('email')} />
              {errors.email && <div className="form-cell-error">{errors.email.message}</div>}
            </DataCell>
          </DataRow>

          <DataRow>
            <DataCell className="form-cell-label" noBorder>
              <label htmlFor="language">{t('common.language')}*</label>
            </DataCell>
            <DataCell editable lastCol lastRow>
              <Select
                isClearable={false}
                onChange={(value) => setValue('language', value as string)}
                options={languageOptions}
                value={watch('language')}
              />
              {errors.language && <div className="form-cell-error">{errors.language.message}</div>}
            </DataCell>
          </DataRow>

          {watch('role') === RoleName.COLLABORATOR && (
            <DataRow>
              <DataCell className="form-cell-label" noBorder>
                <label>{t('userManagement.permissions')}</label>
              </DataCell>
              <DataCell editable lastCol lastRow>
                <InviteCollaboratorPermissions
                  onPermissionsChange={(permissions) => setValue('permissions', permissions)}
                  permissions={watch('permissions')}
                />
                {errors.permissions && <div className="form-cell-error">{errors.permissions.message}</div>}
              </DataCell>
            </DataRow>
          )}
        </DataGrid>

        <div className="edit-user__form-item button-container">
          <button className="btn btn-secondary" onClick={handleCancel} type="button">
            {t('common.cancel')}
          </button>

          <button className="btn btn-primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? t('common.submitting') : t('common.submit')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default InviteUserForm
