import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useI18n } from '@webapp/components/hooks'
import * as BasePaths from '@webapp/main/basePaths'
import { getLabel } from './getLabel'

const ListItem = (props) => {
  const { item } = props
  const i18n = useI18n()

  return (
    <Link to={BasePaths.getStatisticalFactsheetsWithLevelIso(item)} className="country-selection-list__row">
      <span className="country-selection-list__primary-col">{getLabel(item, i18n)}</span>
    </Link>
  )
}

ListItem.propTypes = {
  item: PropTypes.string.isRequired,
}

export default ListItem
