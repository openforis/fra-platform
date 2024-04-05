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
    subject: 'Reminder: One or more countries are pending review',
    messageHeader: 'Dear {{recipientName}},',
    messageFooter: `
    Please provide your comments and send the report back to “Editing”, or proceed with approval if there are no further issues.
    <br />
    Thank you.`,
    messageBodyText: `
    The {{assessmentName}} {{cycleName}} country report for countries: {{- countries}} have been “In review” over a week.
   

{{- countryUrls}}

    `,
    messageBodyHTML: `
    <br/>
    The {{assessmentName}} {{cycleName}} country reports for<br />
    {{- countryLinks}}<br />
    have been “In review” more than a week.<br/>
    `,
  },
}
