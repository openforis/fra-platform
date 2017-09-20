import React from 'react'
import './definitionLink.less'

export default ({className, name, section, i18n}) => <div className={`definition-link ${className ? className : ''}`}
                                      onClick={() => window.open(`definitions/en/${name}#${section}`, name, 'height=640,width=360')}>
                                        {i18n.t('definition.linkLabel')}
                                  </div>
