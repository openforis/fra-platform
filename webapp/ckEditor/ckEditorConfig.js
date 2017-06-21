const ckEditorConfig = {
  plugins: 'a11yhelp,about,basicstyles,blockquote,clipboard,contextmenu,enterkey,entities,floatingspace,format,horizontalrule,htmlwriter,image,indentlist,link,list,magicline,pastefromword,pastetext,removeformat,resize,showborders,specialchar,stylescombo,tab,table,tabletools,toolbar,undo,wysiwygarea',
  toolbarGroups: [
    {name: 'clipboard', groups: ['clipboard', 'undo']},
    {name: 'editing', groups: ['find', 'selection', 'spellchecker']},
    {name: 'links'},
    {name: 'insert'},
    {name: 'forms'},
    {name: 'tools'},
    {name: 'document', groups: ['mode', 'document', 'doctools']},
    {name: 'others'},
    '/',
    {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
    {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi']},
    {name: 'styles'},
    {name: 'colors'},
    {name: 'about'}
  ]
}

export default ckEditorConfig

export const isEditorReady = editor => editor.status === 'ready'
