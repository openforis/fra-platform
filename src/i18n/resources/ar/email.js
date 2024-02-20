module.exports = {
  invitationAccepted: {
    subject: 'لقد تم قبول الدعوة المقدمة من جانبكم   {{invitedUserSurname}} {{invitedUserName}}  المستخدم',
    textMessage: `{{recipientSurname}} {{recipientName}}  عزيزتي عزيزي /

{{country}} في {{role}}  ك  {{cycleName}} {{assessmentName}} لقد تم قبول الدعوة المقدمة من جانبكم {{invitedUserSurname}}  {{invitedUserName}} المستخدم
{{- manageCollaboratorsUrl}}

فريق التقييم العالمي للموارد الحرجيه`,
    htmlMessage: `{{recipientSurname}} {{recipientName}}  عزيزتي عزيزي /
<br/><br/>
<b><a href="{{- manageCollaboratorsUrl}}">{{country}}</a></b> في {{role}}  ك  {{cycleName}} {{assessmentName}} لقد تم قبول الدعوة المقدمة من جانبكم {{invitedUserSurname}}  {{invitedUserName}} المستخدم
<br/><br/>
فريق التقييم العالمي للموارد الحرجيه`,
  },
}
