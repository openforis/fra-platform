import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { Routes } from 'meta/routes/routes'
import { TooltipId } from 'meta/tooltip/id'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import { ButtonSize, ButtonType, useButtonClassName } from 'client/components/Buttons/Button'
import Icon from 'client/components/Icon'
import { IconName } from 'client/components/Icon/types'

const iconName = IconName.smallPrint
const inverse = true
const size = ButtonSize.l

const LinkPrint: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const classNamePrint = useButtonClassName({ iconName, inverse, size, type: ButtonType.anonymous })

  const path = Routes.Print.generatePath({ assessmentName, cycleName, countryIso })
  const pathTables = Routes.PrintTables.generatePath({ assessmentName, cycleName, countryIso })

  const dataTooltipId = TooltipId.white

  return (
    <>
      <Link
        className={classNamePrint}
        data-tooltip-content={t('common.tooltip.print')}
        data-tooltip-id={dataTooltipId}
        target="_blank"
        to={path}
      >
        <Icon name={IconName.smallPrint} />
      </Link>
      <div className="toolbar__separator" />
      <Link
        className={classNamePrint}
        data-tooltip-content={t('common.tooltip.printOnlyTables')}
        data-tooltip-id={dataTooltipId}
        target="_blank"
        to={pathTables}
      >
        <Icon name={IconName.smallPrint} />
        <Icon name={IconName.table} />
      </Link>
    </>
  )
}

export default LinkPrint
