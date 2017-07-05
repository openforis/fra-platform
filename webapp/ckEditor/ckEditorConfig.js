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
  removeButtons: 'HorizontalRule,SpecialChar,Scayt,Cut,Copy,Paste,Anchor,Maximize,Source,Strike,Outdent,Indent,Blockquote,Styles,Format',
  contentsCss: '/ckeditor/ckeditor.css',
  height: 200,
  extraPlugins: 'autogrow',
  autoGrow_minHeight: 200,
  autoGrow_maxHeight: 600,
  autoGrow_bottomSpace: 0
}

export default ckEditorConfig
