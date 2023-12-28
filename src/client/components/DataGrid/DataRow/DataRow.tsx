import React, { ReactElement, ReactNode } from 'react'

import ButtonDelete from 'client/components/Buttons/ButtonDelete'
import DataCell from 'client/components/DataGrid/DataCell'
import ReviewIndicator from 'client/components/ReviewIndicator'

export type DataRowActions = {
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

  const { delete: deleteRow, review } = actions

  // TODO: Add review opened cells style
  // const openTopics = useTopicKeys()
  // const reviewOpened = useMemo<boolean>(() => openTopics.includes(topicKey), [openTopics, topicKey])

  return (
    <>
      {React.Children.map(children, (child) => (child ? React.cloneElement(child) : null))}

      {deleteRow && (
        <DataCell lastCol review>
          {deleteRow.placeholder ?? <ButtonDelete onClick={deleteRow.onDelete} />}
        </DataCell>
      )}

      {review && (
        <DataCell review>
          {review.placeholder ?? (
            <ReviewIndicator title={review.title} subtitle={review.subTitle} topicKey={review.topicKey} />
          )}
        </DataCell>
      )}
    </>
  )
}

DataRow.defaultProps = {
  actions: {},
}

export default DataRow
