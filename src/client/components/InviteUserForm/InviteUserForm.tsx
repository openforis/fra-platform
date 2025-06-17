import './InviteUserForm.scss'
import React, { useCallback } from 'react'
import { FieldErrors, SubmitHandler, useForm, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { z, ZodOptional, ZodString } from 'zod'

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

enum FormType {
  'text' = 'text',
}

type FieldProps<T extends Record<string, unknown> = Record<string, unknown>> = {
  errors: FieldErrors<T>
  register: UseFormRegister<T>
  setValue: UseFormSetValue<T>
  watch: UseFormWatch<T>

  name: string
  label: string
  required: boolean
}

const TextField = (props: FieldProps) => {
  const { errors, label, name, register, required } = props
  const { t } = useTranslation()

  return (
    <DataRow>
      <DataCell className="form-cell-label" noBorder>
        <label htmlFor={name}>
          {t(label)}
          {required ? '*' : ''}
        </label>
      </DataCell>
      <DataCell editable lastCol lastRow>
        <InputText id={name} name={name} {...register(name)} />
        {errors[name] && <div className="form-cell-error">{errors[name].message}</div>}
      </DataCell>
    </DataRow>
  )
}

const FormFields: Record<FormType, React.FC<FieldProps>> = {
  [FormType.text]: TextField,
}

type Props = {
  onSubmit: SubmitHandler<unknown>
  onCancel: () => void
  formDefinition: Array<{ name: string; label: string; validation: ZodString; type: FormType }>
  defaultValues: object
}

const Form: React.FC<Props> = ({ defaultValues, formDefinition, onCancel, onSubmit }) => {
  const { t } = useTranslation()

  const formSchemaObject = formDefinition.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.name]: curr.validation,
    }
  }, {})

  const formSchema = z.object(formSchemaObject)

  type FormValues = z.infer<typeof formSchema>

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

  const gridTemplateColumns = '0.3fr 1fr'

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DataGrid className="form-grid" gridTemplateColumns={gridTemplateColumns}>
        {formDefinition.map((formField) => {
          const Component = FormFields[formField.type]

          const schema = formSchema.shape[formField.name as keyof typeof formSchema.shape] as z.ZodTypeAny
          const isOptional = schema instanceof ZodOptional

          return (
            <Component
              errors={errors}
              label={formField.label}
              name={formField.name}
              register={register}
              required={!isOptional}
              setValue={setValue}
              watch={watch}
            />
          )
        })}

        <div className="edit-user__form-item button-container">
          <button className="btn btn-secondary" onClick={onCancel} type="button">
            {t('common.cancel')}
          </button>

          <button className="btn btn-primary" disabled={isSubmitting} type="submit">
            {isSubmitting ? t('common.submitting') : t('common.submit')}
          </button>
        </div>
      </DataGrid>
    </form>
  )
}

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

  const onCancel = handleCancel

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

  const permissionsSchema = formSchema.shape.permissions
  const isOptional = permissionsSchema instanceof ZodOptional

  console.log(isOptional)

  return (
    <div className="app-view__content">
      <Form
        defaultValues={defaultValues}
        formDefinition={[
          {
            name: 'name',
            type: FormType.text,
            validation: z.string().min(2, 'Name must be at least 2 characters.'),
            label: 'common.name',
          },
        ]}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />

      <hr />

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
