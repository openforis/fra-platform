import React, { ReactElement, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { Routes } from 'meta/routes'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import ButtonDelete from 'client/components/Buttons/ButtonDelete'
import DataCell from 'client/components/DataGrid/DataCell'
import Icon from 'client/components/Icon'
import ReviewIndicator from 'client/components/ReviewIndicator'

export type DataRowActions = {
  userLink?: any
  delete?: {
    onDelete?: () => void
    placeholder?: ReactNode
  }
  review?: {
    placeholder?: ReactNode
    subTitle?: string
    title: string
    topicKey: string
  }
}

export type DataRowProps = {
  actions?: DataRowActions
  children: ReactElement | Array<ReactElement>
}

const DataRow: React.FC<DataRowProps> = (props) => {
  const { actions, children } = props
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  const { delete: deleteRow, review, userLink } = actions
  const hasAction = userLink || deleteRow || review

  // TODO: Add review opened cells style
  // const openTopics = useTopicKeys()
  // const reviewOpened = useMemo<boolean>(() => openTopics.includes(topicKey), [openTopics, topicKey])

  return (
    <>
      {React.Children.map(children, (child) => (child ? React.cloneElement(child) : null))}

      {hasAction && (
        <DataCell review actions>
          {userLink &&
            (userLink.placeholder ?? (
              <Link
                target="_blank"
                to={Routes.CountryUser.generatePath({
                  countryIso,
                  assessmentName,
                  cycleName,
                  id: userLink.userId,
                })}
                type="button"
                className="btn-s btn-link"
              >
                <Icon name="pencil" />
              </Link>
            ))}
          {deleteRow && (deleteRow.placeholder ?? <ButtonDelete onClick={deleteRow.onDelete} />)}

          {review &&
            (review.placeholder ?? (
              <ReviewIndicator title={review.title} subtitle={review.subTitle} topicKey={review.topicKey} />
            ))}
        </DataCell>
      )}
    </>
  )
}

DataRow.defaultProps = {
  actions: {},
}

export default DataRow
