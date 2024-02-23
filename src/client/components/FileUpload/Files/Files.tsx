import './Files.scss'
import React from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import ButtonDelete from 'client/components/Buttons/ButtonDelete'
import { FileUploadProps } from 'client/components/FileUpload/types'

const Files: React.FC<Pick<FileUploadProps, 'canDownload' | 'onChange' | 'value'>> = (props) => {
  const { canDownload, onChange, value } = props

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const queryParams = new URLSearchParams({ assessmentName, cycleName, countryIso })

  return (
    <div className="file-upload__files">
      {value.map((file) => {
        const url = `${ApiEndPoint.CycleData.Repository.file(file.uuid)}?${queryParams.toString()}`

        return (
          <React.Fragment key={file.uuid}>
            {canDownload && (
              <a className="repository-link" href={url} rel="noreferrer" target="_blank">
                {file.name}
              </a>
            )}
            {!canDownload && <div>{file.name}</div>}

            <ButtonDelete onClick={() => onChange(value.filter((f) => f.uuid !== file.uuid))} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Files
