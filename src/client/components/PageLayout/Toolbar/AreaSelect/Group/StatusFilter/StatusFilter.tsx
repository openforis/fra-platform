import './StatusFilter.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

import { CountryStatus } from 'meta/area/countryStatus'
import { RoleName } from 'meta/user/role/name'
import { Objects } from 'utils/objects'

import { useAreaSelectorFilters } from 'client/store/ui/areaSelector/hooks/areaSelector'
import { useOnClose } from 'client/hooks/useOnClose'
import ButtonClear from 'client/components/Buttons/ButtonClear'
import Icon from 'client/components/Icon'

import { useHandleReset } from './hooks/useHandleReset'
import { useHandleToggle } from './hooks/useHandleToggle'

type Props = {
  roleName: RoleName
}

const emptyFn = (): void => {}

const StatusFilter: React.FC<Props> = (props) => {
  const { roleName } = props

  const { t } = useTranslation()
  const filters = useAreaSelectorFilters()
  const [open, setOpen] = useState(false)

  const activeStatuses = filters[roleName]?.statusFilter
  const active = !Objects.isEmpty(activeStatuses)

  const wrapperRef = useOnClose<HTMLDivElement>({ open, onClose: () => setOpen(false) })
  const handleToggle = useHandleToggle({ roleName })
  const handleReset = useHandleReset({ roleName })

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

      {active && <ButtonClear className="status-filter__clear" onClick={handleReset} />}

      {open && (
        <div className="status-filter__menu">
          {Object.values(CountryStatus).map((status) => {
            const selected = activeStatuses?.includes(status) ?? false
            return (
              <div
                key={status}
                aria-selected={selected}
                className={classNames('status-filter__option', { selected })}
                onClick={() => handleToggle(status)}
                onKeyDown={() => handleToggle(status)}
                role="option"
                tabIndex={0}
              >
                <input
                  checked={selected}
                  className="select__toggleAllOption-checkbox"
                  onChange={emptyFn}
                  type="checkbox"
                />
                <span className="select__toggleAllOption-label">{t(`assessment.status.${status}.label`)}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default StatusFilter
