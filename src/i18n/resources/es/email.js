module.exports = {
  invitationAccepted: {
    subject: 'El usuario {{invitedUserName}} {{invitedUserSurname}} ha aceptado su invitación',
    textMessage: `Estimado/a {{recipientName}} {{recipientSurname}},

El usuario {{invitedUserName}} {{invitedUserSurname}} ha aceptado su invitación a {{assessmentName}} {{cycleName}} como {{role}} para {{country}}:
{{- manageCollaboratorsUrl}}

El equipo de FRA`,
    htmlMessage: `Estimado/a {{recipientName}} {{recipientSurname}},
<br/><br/>
El usuario {{invitedUserName}} {{invitedUserSurname}} ha aceptado su invitación a {{assessmentName}} {{cycleName}} como {{role}} para <b><a href="{{- manageCollaboratorsUrl}}">{{country}}</a></b>.
<br/><br/>
El equipo de FRA`,
  },
}
