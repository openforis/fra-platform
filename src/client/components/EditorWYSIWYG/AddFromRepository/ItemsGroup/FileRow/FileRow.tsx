import './FileRow.scss'
import React from 'react'

import { RepositoryItem } from 'meta/cycleData/repository/item'
import { RepositoryItems } from 'meta/cycleData/repository/items'
import { Translations } from 'meta/translation/translations'

import { useLanguage } from 'client/hooks/language'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import ButtonCheckBox, { ButtonCheckboxVariant } from 'client/components/Buttons/ButtonCheckbox'
import Icon from 'client/components/Icon'

type Props = {
  isChecked: (uuid: string) => boolean
  onClick: (uuid: string) => void
  repositoryItem: RepositoryItem
}

const FileRow: React.FC<Props> = (props) => {
  const { isChecked, onClick, repositoryItem } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const language = useLanguage()

  const url = RepositoryItems.getURL({ assessmentName, cycleName, countryIso, repositoryItem })
  const label = Translations.getLabel({ translation: repositoryItem.props.translation, language })

  return (
    <div className="file-row">
      <ButtonCheckBox
        checked={isChecked(repositoryItem.uuid)}
        label={label}
        onClick={(): void => onClick(repositoryItem.uuid)}
        variant={ButtonCheckboxVariant.checkbox}
      />
      <a className="file-row__download" href={url}>
        <Icon name="hit-down" />
      </a>
    </div>
  )
}

export default FileRow
