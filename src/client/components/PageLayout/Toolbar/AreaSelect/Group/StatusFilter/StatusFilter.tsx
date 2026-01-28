import './StatusFilter.scss'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { CountryStatus } from 'meta/area/countryStatus'
import { RoleName } from 'meta/user/role/name'
import { Objects } from 'utils/objects'

import { useAreaSelectorFilters } from 'client/store/ui/areaSelector/hooks/areaSelector'
import ButtonCheckbox from 'client/components/Buttons/ButtonCheckbox'
import Icon from 'client/components/Icon'
import { useHandleOutsideClick } from 'client/components/PageLayout/Toolbar/AreaSelect/Group/StatusFilter/hooks/useHandleOutsideClick'
import { useHandleToggle } from 'client/components/PageLayout/Toolbar/AreaSelect/Group/StatusFilter/hooks/useHandleToggle'

type Props = {
  roleName: RoleName
}

const StatusFilter: React.FC<Props> = (props) => {
  const { roleName } = props

  const { t } = useTranslation()
  const filters = useAreaSelectorFilters()
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const activeStatuses = filters[roleName]?.statusFilter
  const active = !Objects.isEmpty(activeStatuses)

  useHandleOutsideClick({ wrapperRef, setOpen })
  const handleToggle = useHandleToggle({ roleName })

  return (
    <div ref={wrapperRef} className="status-filter">
      <button
        className={classNames('area-select__group-heading-sortable', { active })}
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <Icon name="filter" />
        {t('common.status')}
      </button>

      {open && (
        <div className="status-filter__menu">
          {Object.values(CountryStatus).map((status) => (
            <ButtonCheckbox
              key={status}
              checked={activeStatuses?.includes(status) ?? false}
              label={t(`assessment.status.${status}.label`)}
              onClick={() => handleToggle(status)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default StatusFilter
