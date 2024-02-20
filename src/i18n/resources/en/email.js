module.exports = {
  invitationAccepted: {
    subject: 'User {{invitedUserName}} {{invitedUserSurname}} has accepted your invitation',
    textMessage: `Dear {{recipientName}} {{recipientSurname}},

User {{invitedUserName}} {{invitedUserSurname}} has accepted your invitation to {{assessmentName}} {{cycleName}} as {{role}} for {{country}}:
{{- manageCollaboratorsUrl}}

The FRA team`,
    htmlMessage: `Dear {{recipientName}} {{recipientSurname}},
<br/><br/>
User {{invitedUserName}} {{invitedUserSurname}} has accepted your invitation to {{assessmentName}} {{cycleName}} as {{role}} for <b><a href="{{- manageCollaboratorsUrl}}">{{country}}</a></b>.
<br/><br/>
The FRA team`,
  },
}
