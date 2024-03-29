module.exports = {
  invitationAccepted: {
    subject: 'Пользователь {{invitedUserName}} {{invitedUserSurname}} принял(а) ваше приглашение',
    textMessage: `Уважаемый (ая) {{recipientName}} {{recipientSurname}},

Пользователь {{invitedUserName}} {{invitedUserSurname}} принял(а) ваше приглашение на {{assessmentName}} {{cycleName}} в качестве {{role}} для {{country}}
{{- manageCollaboratorsUrl}}

Команда по ОЛР`,
    htmlMessage: `Уважаемый (ая) {{recipientName}} {{recipientSurname}},
<br/><br/>
Пользователь {{invitedUserName}} {{invitedUserSurname}} принял(а) ваше приглашение на {{assessmentName}} {{cycleName}} в качестве {{role}} для <b><a href="{{- manageCollaboratorsUrl}}">{{country}}</a></b>.
<br/><br/>
Команда по ОЛР`,
  },
}
