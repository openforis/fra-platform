import React from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { Files, FileSummary } from 'meta/file'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  fileSummary: FileSummary
  acceptedFiles: Array<File>
}

const FileDownload: React.FC<Props> = (props: Props) => {
  const { fileSummary, acceptedFiles } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const file = acceptedFiles.find((file) => file.name === fileSummary.name)
  const queryParams = new URLSearchParams({ assessmentName, cycleName, countryIso })

  if (!file && !fileSummary.repositoryItemUuid) {
    return null
  }

  const size = Files.humanReadableSize(fileSummary.size)

  if (file) {
    const href = URL.createObjectURL(file)
    return (
      <a className="repository-link" download={file.name} href={href}>
        {file.name} ({size})
      </a>
    )
  }

  const href = `${ApiEndPoint.CycleData.Repository.File.one(fileSummary.repositoryItemUuid)}?${queryParams.toString()}`
  return (
    <a className="repository-link" href={href} rel="noreferrer" target="_blank">
      {fileSummary.name} ({size})
    </a>
  )
}

export default FileDownload
