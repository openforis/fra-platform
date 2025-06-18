import './InviteUserForm.scss'
import React, { useCallback } from 'react'
import { FieldErrors, SubmitHandler, useForm, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { zodResolver } from '@hookform/resolvers/zod'
import { z, ZodOptional } from 'zod'

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
  'select' = 'select',
  'permissions' = 'permissions',
}

type FieldProps<T extends Record<string, unknown> = Record<string, unknown>> = {
  errors: FieldErrors<T>
  label: string
  name: string
  options?: Array<{ label: string; value: string }>
  placeholder?: string
  register?: UseFormRegister<T>
  required?: boolean
  setValue: UseFormSetValue<T>
  shouldShow?: (watchValues: Record<string, unknown>) => boolean
  watch: UseFormWatch<T>
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

const SelectField = (props: FieldProps) => {
  const { errors, label, name, options = [], placeholder, required, setValue, watch } = props
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
        <Select
          isClearable={false}
          onChange={(value) => setValue(name, value as string)}
          options={options}
          placeholder={placeholder}
          value={watch(name) as string}
        />
        {errors[name] && <div className="form-cell-error">{errors[name].message}</div>}
      </DataCell>
    </DataRow>
  )
}

const PermissionsField = (props: FieldProps) => {
  const { errors, label, name, setValue, shouldShow, watch } = props
  const { t } = useTranslation()
  const watchValues = watch()

  if (shouldShow && !shouldShow(watchValues)) {
    return null
  }

  return (
    <DataRow>
      <DataCell className="form-cell-label" noBorder>
        <label htmlFor={name}>{t(label)}</label>
      </DataCell>
      <DataCell editable lastCol lastRow>
        <InviteCollaboratorPermissions
          onPermissionsChange={(permissions) => setValue(name, permissions)}
          permissions={watch(name) as CollaboratorPermissions}
        />
        {errors[name] && <div className="form-cell-error">{errors[name].message}</div>}
      </DataCell>
    </DataRow>
  )
}

const FormFields: Record<FormType, React.FC<FieldProps>> = {
  [FormType.text]: TextField,
  [FormType.select]: SelectField,
  [FormType.permissions]: PermissionsField,
}

type Props = {
  onSubmit: SubmitHandler<unknown>
  onCancel: () => void
  formDefinition: Array<{
    name: string
    label: string
    validation: z.ZodTypeAny
    type: FormType
    options?: Array<{ label: string; value: string }>
    placeholder?: string
    shouldShow?: (watchValues: Record<string, unknown>) => boolean
  }>
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
              key={formField.name}
              errors={errors}
              label={formField.label}
              name={formField.name}
              options={formField.options}
              placeholder={formField.placeholder}
              register={register}
              required={!isOptional}
              setValue={setValue}
              shouldShow={formField.shouldShow}
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

const InviteUserForm: React.FC = () => {
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const user = useUser()
  const cycle = useCycle()

  const defaultValues = useInitialState()
  const onSubmit = useOnSubmit()

  const onCancel = useCallback(() => {
    navigate(-1)
  }, [navigate])

  const roleOptions = Users.getRolesAllowedToEdit({ user, countryIso, cycle }).map((role: RoleName) => ({
    label: t(Users.getI18nRoleLabelKey(role)),
    value: role,
  }))

  const languageOptions = LanguageCodes.map((lang) => ({
    label: t(`language.${lang}`),
    value: lang,
  }))

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
          {
            name: 'surname',
            type: FormType.text,
            validation: z.string().min(2, 'Surame must be at least 2 characters.'),
            label: 'editUser.surname',
          },
          {
            name: 'email',
            type: FormType.text,
            validation: z.string().email('Please enter a valid email address.'),
            label: 'editUser.email',
          },
          {
            name: 'role',
            type: FormType.select,
            validation: z.string().min(1, 'Please select a role.'),
            label: 'common.role',
            options: roleOptions,
            placeholder: t('userManagement.placeholder'),
          },
          {
            name: 'language',
            type: FormType.select,
            validation: z.string().min(1, 'Please select a language.'),
            label: 'common.language',
            options: languageOptions,
          },
          {
            name: 'permissions',
            type: FormType.permissions,
            validation: z.custom<CollaboratorPermissions>().optional(),
            label: 'userManagement.permissions',
            shouldShow: (watchValues) => watchValues.role === RoleName.COLLABORATOR,
          },
        ]}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default InviteUserForm
