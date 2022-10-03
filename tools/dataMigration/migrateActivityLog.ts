import { Cycle } from '../../src/meta/assessment'
import { Assessment } from '../../src/meta/assessment/assessment'
import { BaseProtocol } from '../../src/server/db'

export const migrateActivityLog = async (props: { assessment: Assessment }, client: BaseProtocol): Promise<void> => {
  const { assessment } = props

  const cycle = assessment.cycles.find((cycle: Cycle) => cycle.name === '2020')

  const query = `
      insert into activity_log (
          time, message, country_iso, section, target, user_id, assessment_uuid, cycle_uuid
      )
      select time,
          case
          when message = 'acceptInvitation' then 'invitationAccept'
          when message = 'addInvitation' then 'invitationAdd'
          when message = 'createComment' then 'messageCreate'
          when message = 'createIssue' then 'messageCreate'
          when message = 'createOdp' then 'originalDataPointCreate'
          when message = 'deleteComment' then 'messageMarkDeleted'
          when message = 'deleteOdp' then 'originalDataPointRemove'
          when message = 'fileRepositoryDelete' then 'assessmentFileDelete'
          when message = 'fileRepositoryUpload' then 'assessmentFileCreate'
          when message = 'markAsResolved' then 'topicStatusChange'
          when message = 'saveDescriptions' then 'descriptionUpdate'
          when message = 'saveTraditionalTable' then 'nodeValueUpdate'
          when message = 'updateAssessmentStatus' then 'assessmentStatusUpdate'
          when message = 'generateFraValues' then 'nodeValueEstimate'
          when message = 'removeInvitation' then 'invitationRemove'
          when message = 'removeUser' then 'userRemove'
          when message = 'updateUser' then 'userUpdate'
          when message = 'saveFraValues' then 'originalDataPointUpdate'
          when message = 'persistGrowingStockValues' then 'nodeValueUpdate'
          else message
      end
      as "message",
       country_iso,
       section,
       target,
       u.id,
       '${assessment.uuid}' as assessment_uuid,
       '${cycle.uuid}' as cycle_uuid
        from _legacy.fra_audit a
                 join public.users u on (user_login_email = email)
        where a.message in ('acceptInvitation',
                'addInvitation',
                'createComment',
                'createIssue',
                'createOdp',
                'deleteComment',
                'deleteOdp',
                'fileRepositoryDelete',
                'fileRepositoryUpload',
                'markAsResolved',
                'saveDescriptions',
                'saveTraditionalTable',
                'updateAssessmentStatus',
                'generateFraValues',
                'removeInvitation',
                'removeUser',
                'updateUser',
                'saveFraValues',
                'persistGrowingStockValues'
          );`

  await client.query(query)
}
