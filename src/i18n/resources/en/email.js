module.exports = {
  invitationAccepted: {
    subject: 'User {{invitedUserName}} {{invitedUserSurname}} has accepted your invitation',
    textMessage: `Dear {{recipientName}} {{recipientSurname}},

User {{invitedUserName}} {{invitedUserSurname}} has accepted your invitation to {{assessmentName}} {{cycleName}} as {{role}} for {{- country}}:
{{- manageCollaboratorsUrl}}

The FRA team`,
    htmlMessage: `Dear {{recipientName}} {{recipientSurname}},
<br/><br/>
User {{invitedUserName}} {{invitedUserSurname}} has accepted your invitation to {{assessmentName}} {{cycleName}} as {{role}} for <b><a href="{{- manageCollaboratorsUrl}}">{{country}}</a></b>.
<br/><br/>
The FRA team`,
  },

  remindReviewer: {
    subject: 'Reminder: Pending review for {{assessmentName}} {{cycleName}} {{- country}}',
    textMessage: `Dear {{recipientName}},
    The {{assessmentName}} country report of {{- country}} has been “In review” since {{lastInReview}}.
    Please provide your comments and send the report back to “Editing”, or proceed with approval if there are no further issues.

    {{- countryUrl}}

    Thank you.
    `,
    htmlMessage: `Dear {{recipientName}},
    <br/><br/>
    The {{assessmentName}} country report of <a href="{{- countryUrl}}">{{country}}</a> has been “In review” since {{lastInReview}}.<br/>
    Please provide your comments and send the report back to “Editing”, or proceed with approval if there are no further issues.
    <br/><br/>
    Thank you.
    `,
  },
}
