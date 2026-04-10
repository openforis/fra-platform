import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'
import { RepositoryItem, RepositoryItemTree } from 'meta/cycleData/repository/item'
import { RepositoryItems } from 'meta/cycleData/repository/items'
import { FileMeta } from 'meta/file/meta'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import { FieldDefinition, FormDefinition, FormFieldType } from 'client/components/Form/types'
import { Option } from 'client/components/Inputs/Select/types'
import { useItems } from 'client/pages/CountryHome/Repository/RepositoryList/hooks/useItems'

import { FormType } from '../types'

const flattenFolders = (items: Array<RepositoryItemTree>, depth = 0): Array<Option> =>
  items.reduce<Array<Option>>((acc, item) => {
    if (item.folderName) {
      acc.push({ label: '\u00a0'.repeat(depth * 4) + item.folderName, value: item.uuid })
      acc.push(...flattenFolders(item.children, depth + 1))
    }
    return acc
  }, [])

export const useFormDefinition = (
  repositoryItem: Partial<RepositoryItem> | undefined,
  fileMeta: FileMeta | undefined,
  isLoadingFileMeta: boolean
): FormDefinition => {
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()
  const items = useItems(false)

  return useMemo<FormDefinition>(() => {
    const formType = repositoryItem && RepositoryItems.isFolder(repositoryItem) ? FormType.folder : FormType.item
    const initialFile = fileMeta?.summary ? [fileMeta.summary] : undefined
    const folderOptions: Array<Option> = [{ label: t('landing.home'), value: '' }, ...flattenFolders(items)]
    const disabledWatch: Pick<FieldDefinition, 'watches'> = { watches: { isDisabled: () => isLoadingFileMeta } }

    const commonFields: Array<FieldDefinition> = [
      { defaultValue: countryIso, label: '', name: 'repositoryItem.countryIso', type: FormFieldType.hidden },
    ]

    if (repositoryItem?.uuid) {
      commonFields.push({
        defaultValue: repositoryItem.uuid,
        label: '',
        name: 'repositoryItem.uuid',
        type: FormFieldType.hidden,
      })
    }

    if (formType === FormType.folder) {
      return {
        fields: [
          ...commonFields,
          {
            ...disabledWatch,
            defaultValue: repositoryItem?.folderName ?? '',
            label: 'common.name',
            name: 'repositoryItem.folderName',
            required: true,
            type: FormFieldType.text,
          },
          {
            ...disabledWatch,
            defaultValue: repositoryItem?.parentUuid ?? '',
            label: 'common.folder',
            name: 'repositoryItem.parentUuid',
            options: folderOptions,
            type: FormFieldType.select,
          },
        ],
        labels: { submit: t('editUser.done') },
      }
    }

    return {
      fields: [
        ...commonFields,
        {
          ...disabledWatch,
          defaultValue: repositoryItem?.props?.translation?.en,
          label: 'common.label',
          name: 'repositoryItem.props.translation.en',
          type: FormFieldType.text,
        },
        {
          ...disabledWatch,
          defaultValue: repositoryItem?.link,
          label: 'common.link',
          name: 'repositoryItem.link',
          type: FormFieldType.text,
        },
        {
          ...disabledWatch,
          defaultValue: repositoryItem?.fileUuid,
          initialValue: initialFile,
          label: 'common.file',
          name: 'repositoryItem.fileUuid',
          nameField: 'repositoryItem.props.translation.en',
          type: FormFieldType.file,
        },
        {
          ...disabledWatch,
          defaultValue: repositoryItem?.description,
          label: 'common.description',
          name: 'repositoryItem.description',
          type: FormFieldType.text,
        },
        {
          ...disabledWatch,
          defaultValue: repositoryItem?.props?.public ?? false,
          label: 'common.public',
          name: 'repositoryItem.props.public',
          type: FormFieldType.checkbox,
        },
        {
          ...disabledWatch,
          defaultValue: repositoryItem?.parentUuid ?? '',
          label: 'common.folder',
          name: 'repositoryItem.parentUuid',
          options: folderOptions,
          type: FormFieldType.select,
        },
      ],
      labels: { submit: t('editUser.done') },
    }
  }, [countryIso, fileMeta, isLoadingFileMeta, items, repositoryItem, t])
}
