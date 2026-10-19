import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { RepositoryItem } from 'meta/cycleData/repository/item'
import { RepositoryItems } from 'meta/cycleData/repository/items'

import { FormValidationSchema } from 'client/components/Form/types'

export const useValidationSchema = (repositoryItem: Partial<RepositoryItem> | undefined): FormValidationSchema => {
  const { t } = useTranslation()

  return useMemo<FormValidationSchema>(() => {
    if (repositoryItem && RepositoryItems.isFolder(repositoryItem)) {
      return z.object({
        repositoryItem: z.object({
          folderName: z.string().min(1, { error: t('validation.repositoryItem.nameIsRequired') }),
        }),
      })
    }

    return z.object({
      repositoryItem: z
        .object({
          fileUuid: z.string().optional(),
          link: z.string().optional(),
          props: z.object({
            translation: z.object({
              en: z.string().min(1, { error: t('validation.repositoryItem.nameIsRequired') }),
            }),
          }),
        })
        .superRefine((item, ctx) => {
          if (item.link && item.fileUuid) {
            const message = t('validation.repositoryItem.eitherFileOrLink')
            ctx.addIssue({ code: 'custom', message, path: ['fileUuid'] })
            ctx.addIssue({ code: 'custom', message, path: ['link'] })
          }
        }),
    })
  }, [repositoryItem, t])
}
