module.exports = {
  invitationAccepted: {
    subject: 'L’utilisateur {{invitedUserName}} {{invitedUserSurname}} a accepté votre invitation',
    textMessage: `Cher/Chère {{recipientName}} {{recipientSurname}},

L’utilisateur {{invitedUserName}} {{invitedUserSurname}} a accepté votre invitation à participer à {{assessmentName}} {{cycleName}} en tant que {{role}} pour le/la {{country}}
{{- manageCollaboratorsUrl}}

L’équipe FRA`,
    htmlMessage: `Cher/Chère {{recipientName}} {{recipientSurname}},
<br/><br/>
L’utilisateur {{invitedUserName}} {{invitedUserSurname}} a accepté votre invitation à participer à {{assessmentName}} {{cycleName}} en tant que {{role}} pour le/la <b><a href="{{- manageCollaboratorsUrl}}">{{country}}</a></b>.
<br/><br/>
L’équipe FRA`,
  },
}
