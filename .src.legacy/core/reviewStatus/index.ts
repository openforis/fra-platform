export enum ReviewIssueStatus {
  closed = 'closed',
  opened = 'opened',
}

export interface ReviewStatus {
  hasUnreadIssues?: boolean
  issueStatus?: ReviewIssueStatus
  issuesCount?: number
  lastCommentUserId: string
}
