// @ts-ignore
// TODO: Fix CKEDITOR
CKEDITOR.plugins.addExternal('autogrow', '/ckeditor/autogrow/', 'plugin.js')

const ckEditorConfig = {
  plugins:
    'a11yhelp,about,basicstyles,blockquote,clipboard,contextmenu,enterkey,entities,floatingspace,format,horizontalrule,htmlwriter,image,indentlist,link,list,pastefromword,pastetext,removeformat,resize,showborders,specialchar,stylescombo,tab,table,tabletools,toolbar,undo,wysiwygarea',
  toolbarGroups: [
    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    { name: 'paragraph', groups: ['list'] },
    { name: 'clipboard', groups: ['clipboard', 'undo'] },
    { name: 'links' },
    { name: 'insert' },
    { name: 'about' },
  ],
  removePlugins: 'horizontalrule,specialchar,blockquote,stylescombo,format',
  removeButtons: 'Scayt,Cut,Copy,Paste,Anchor,Maximize,Source,Strike,Outdent,Indent',
  allowedContent:
    'p em strong u sub sup ul ol li table thead tbody tr; th[colspan,rowspan]; td[colspan,rowspan]; a[!href]; img[!src,alt,width,height]',
  contentsCss: '/ckeditor/ckeditor.css',
  height: 72,
  extraPlugins: 'autogrow',
  autoGrow_minHeight: 72,
  autoGrow_maxHeight: 600,
  autoGrow_bottomSpace: 0,
}

export default ckEditorConfig
