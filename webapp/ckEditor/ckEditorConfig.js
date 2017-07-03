const ckEditorConfig = {
  plugins: 'a11yhelp,about,basicstyles,blockquote,clipboard,contextmenu,enterkey,entities,floatingspace,format,horizontalrule,htmlwriter,image,indentlist,link,list,pastefromword,pastetext,removeformat,resize,showborders,specialchar,stylescombo,tab,table,tabletools,toolbar,undo,wysiwygarea',
  toolbarGroups: [
    {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
    {name: 'paragraph', groups: ['list']},
    {name: 'clipboard', groups: ['clipboard', 'undo']},
    {name: 'links'},
    {name: 'insert'},
    {name: 'about'}
  ],
  removeButtons: 'Underline',
  contentsCss: '/css/ckeditor.css'
}

export default ckEditorConfig
