import React, { useMemo, useState } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { useTranslation } from 'react-i18next'

import type { IControlType } from 'jodit/esm/types'
import type { IJodit } from 'jodit/esm/types/jodit'

import { RepositoryItem } from 'meta/cycleData'

import { injectSlice } from 'client/store/store'
import { TablePaginatedSlice } from 'client/store/tablePaginated/slice'
import { useOnMount } from 'client/hooks/useOnMount'
import EditorWYSIWYG, { EditorWYSIWYGProps } from 'client/components/EditorWYSIWYG/EditorWYSIWYG'
import { RepositoryLinkContext, RepositoryLinkContextType } from 'client/components/EditorWYSIWYG/repositoryLinkContext'
import Icon from 'client/components/Icon'

const EditorWYSIWYGWithRepositoryContext: React.FC<EditorWYSIWYGProps> = (props) => {
  const { t } = useTranslation()

  const [jodit, setJodit] = useState<IJodit>()
  const [repositoryOpened, setRepositoryOpened] = useState<boolean>(false)
  const [selectedFiles, setSelectedFiles] = useState<Array<RepositoryItem>>([])

  useOnMount(() => {
    injectSlice(TablePaginatedSlice)
  })

  const repositoryButton = useMemo<IControlType>(() => {
    const exec = (_jodit: IJodit) => {
      // setJodit(_jodit)
      setRepositoryOpened(true)
    }
    const tooltip = t('landing.links.repository')
    const icon = renderToStaticMarkup(<Icon className="icon-reference-files" name="icon-files" />)

    return { icon, exec, tooltip }
  }, [setRepositoryOpened, t])

  const value = useMemo<RepositoryLinkContextType>(() => {
    return { jodit, setJodit, repositoryButton, repositoryOpened, setRepositoryOpened, selectedFiles, setSelectedFiles }
  }, [jodit, repositoryButton, repositoryOpened, selectedFiles])

  return (
    <RepositoryLinkContext.Provider value={value}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <EditorWYSIWYG {...props} />
    </RepositoryLinkContext.Provider>
  )
}

export default EditorWYSIWYGWithRepositoryContext
