import { Express } from 'express'
import { ReviewCreate } from '@server/api/review/create'
import { ReviewCreateIssueWithComment } from '@server/api/review/createIssueWithComment'
import { ReviewDelete } from '@server/api/review/delete'
import { ReviewGetComments } from '@server/api/review/getComments'
import { ReviewGetSummary } from '@server/api/review/getSummary'
import { ReviewMarkResolved } from '@server/api/review/markResolved'

export const ReviewApi = {
  init: (express: Express): void => {
    ReviewCreate.init(express)
    ReviewCreateIssueWithComment.init(express)
    ReviewDelete.init(express)
    ReviewGetComments.init(express)
    ReviewGetSummary.init(express)
    ReviewMarkResolved.init(express)
  },
}
