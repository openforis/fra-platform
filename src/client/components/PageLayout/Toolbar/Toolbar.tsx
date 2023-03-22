import './Toolbar.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { ClientRoutes } from '@meta/app'
import { Areas } from '@meta/area'
import { Users } from '@meta/user'

import { useAssessment, useCountry, useCycle } from '@client/store/assessment'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import { useIsPrint } from '@client/hooks/useIsPath'
import Icon from '@client/components/Icon'
import LinkHome from '@client/components/LinkHome'
import { Breakpoints } from '@client/utils'

import CountryList from './CountryList'
import Lock from './Lock'
import Status from './Status'
import ToggleNavigationControl from './ToggleNavigationControl'

const findElementRoot = (el: Element): Element => {
  if (el.parentElement === null) return el
  return findElementRoot(el.parentElement)
}

const Toolbar: React.FC = () => {
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const country = useCountry(countryIso)
  const { print } = useIsPrint()
  const user = useUser()
  const { i18n, t } = useTranslation()
  const countrySelectionRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const isCountry = Areas.isISOCountry(countryIso)
  const assessment = useAssessment()
  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  const outsideClick = (evt: any) => {
    const elRoot = findElementRoot(evt.target)
    // We need to check these two, since React can unmount the other element before we get here.
    if (
      elRoot.className.includes('toolbar__country') ||
      elRoot.className.includes('toolbar__select-laptop') ||
      elRoot.className.includes('toolbar__select-mobile')
    )
      return
    if (countrySelectionRef.current && countrySelectionRef.current.contains(evt.target)) return

    setOpen(false)
  }

  useEffect(() => {
    window.addEventListener('click', outsideClick)
    return () => {
      window.removeEventListener('click', outsideClick)
    }
  }, [])

  useEffect(() => {
    setQuery('')
  }, [open])

  if (print) return null

  return (
    <div className="toolbar">
      <div className="toolbar__nav-options">
        <ToggleNavigationControl />

        <button
          type="button"
          className="btn-country-select no-print"
          ref={countrySelectionRef}
          onClick={() => setOpen((prevState) => !prevState)}
        >
          <div>
            {open && (
              <input
                type="text"
                className="text-input"
                // eslint-disable-next-line
                autoFocus
                onClick={(event) => event.stopPropagation()}
                placeholder={i18n.t('emoji.picker.search')}
                onChange={(event) => setQuery(event.target.value)}
              />
            )}

            {countryIso && !open && (
              <div className={classNames('toolbar__country', { with_flag: isCountry })}>
                {isCountry && (
                  <div
                    className="flag"
                    style={{
                      backgroundImage: `url('/img/flags/1x1/${countryIso}.svg')`,
                    }}
                  />
                )}
                <div className="name-container">
                  <div className="name">{i18n.t<string>(`area.${countryIso}.listName`)}</div>
                  {user && isCountry && (
                    <div className="user-role">
                      {i18n.t<string>(Users.getI18nRoleLabelKey(Users.getRole(user, countryIso, cycle)?.role))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {!countryIso && !open && (
              <>
                <div className="toolbar__select-laptop">{`- ${t('common.selectArea')} -`}</div>
                <div className="toolbar__select-mobile">{`- ${t('common.selectArea')} -`}</div>
              </>
            )}
          </div>
          <Icon name="small-down" />

          {open && <CountryList query={query} />}
        </button>
      </div>

      {isCountry && (
        <MediaQuery minWidth={Breakpoints.laptop}>
          {user && <Status />}

          {user && country && Users.hasEditorRole({ user, countryIso, cycle }) && <Lock />}

          <div className="links-download">
            <Link
              className="btn btn-secondary"
              to={ClientRoutes.Assessment.Cycle.Country.PrintTables.getLink({
                countryIso,
                assessmentName,
                cycleName,
              })}
              target="_blank"
            >
              <Icon name="small-print" className="icon-margin-left icon-sub" />
              <Icon name="icon-table2" className="icon-no-margin icon-sub" />
            </Link>

            <Link
              className="btn btn-secondary"
              to={ClientRoutes.Assessment.Cycle.Country.Print.getLink({ countryIso, assessmentName, cycleName })}
              target="_blank"
            >
              <Icon name="small-print" className="icon-no-margin icon-sub" />
            </Link>
          </div>
        </MediaQuery>
      )}

      <MediaQuery maxWidth={Breakpoints.laptop - 1}>
        <LinkHome />
      </MediaQuery>
    </div>
  )
}

export default Toolbar
