import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

import { MessageTopic, MessageTopicType } from 'meta/messageCenter/messageTopic'
import { Objects } from 'utils/objects'

import { useAppDispatch } from 'client/store/hooks'
import { MessageCenterActions } from 'client/store/messageCenter/actions'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryIso } from 'client/hooks/country'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'
import { DataCell, DataGrid } from 'client/components/DataGrid'
import TextArea from 'client/components/Inputs/TextArea'

import { useShowActions } from './hooks/useShowActions'

type Props = { topic: MessageTopic }
const Footer: React.FC<Props> = (props: Props) => {
  const { topic } = props
  const { t } = useTranslation()
  const [message, setMessage] = useState('')
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const { canPostMessage, canResolve } = useShowActions(topic)

  const { sectionName } = useParams<{ sectionName: string }>()

  const postMessage = useCallback(() => {
    dispatch(
      MessageCenterActions.postMessage({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        key: topic.key,
        message,
        type: topic.type,
        sectionName: topic.type !== MessageTopicType.review ? topic.type : sectionName,
      })
    ).then(() => setMessage(''))
  }, [assessment, countryIso, cycle, dispatch, message, sectionName, topic])

  const resolveTopic = useCallback(() => {
    dispatch(
      MessageCenterActions.resolveTopic({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        key: topic.key,
        sectionName: topic.type !== MessageTopicType.review ? topic.type : sectionName,
      })
    )
  }, [assessment.props.name, countryIso, cycle.name, dispatch, sectionName, topic.key, topic.type])

  return (
    <div className="topic__footer">
      {canPostMessage && (
        <DataGrid className="topic-form" gridTemplateColumns="1fr auto">
          <DataCell lastCol lastRow>
            <TextArea
              maxHeight={200}
              onChange={(e): void => setMessage(e.target.value)}
              placeholder={t('review.writeComment')}
              rows={2}
              value={message}
            />
          </DataCell>
          <DataCell noBorder>
            <Button
              disabled={Objects.isEmpty(message)}
              iconName="icon-paper-plane"
              label={t('common.add')}
              onClick={postMessage}
              size={ButtonSize.s}
            />
          </DataCell>
        </DataGrid>
      )}
      {canResolve && (
        <div className="topic-review">
          <Button
            iconName="compare_arrows"
            inverse
            label={t('review.resolve')}
            onClick={resolveTopic}
            size={ButtonSize.s}
            type={ButtonType.black}
          />
        </div>
      )}
    </div>
  )
}

export default Footer
