import React from 'react'

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'emoj... Remove this comment to see the full error message
import { Picker, Emoji } from 'emoji-mart-lite'
import 'emoji-mart-lite/css/emoji-mart.css'
import './emoji.less'

const emojiSet = 'emojione'

export const EmojiPicker = ({ onClick, style, i18n }: any) => (
  <Picker
    set={emojiSet}
    emoji="point_up"
    showPreview={false}
    onClick={(emoji: any, event: any) => onClick(emoji.native)}
    include={['people', 'nature', 'places', 'flags']}
    style={{
      width: 'auto',
      position: 'absolute',
      right: '3px',
      left: '3px',
      zIndex: '999',
      ...style,
    }}
    native
    emojiTooltip
    i18n={{
      search: i18n.t('emoji.picker.search'),
      categories: {
        search: i18n.t('emoji.picker.categories.search'),
        recent: i18n.t('emoji.picker.categories.recent'),
        people: i18n.t('emoji.picker.categories.people'),
        nature: i18n.t('emoji.picker.categories.nature'),
        foods: i18n.t('emoji.picker.categories.foods'),
        activity: i18n.t('emoji.picker.categories.activity'),
        places: i18n.t('emoji.picker.categories.places'),
        objects: i18n.t('emoji.picker.categories.objects'),
        symbols: i18n.t('emoji.picker.categories.symbols'),
        flags: i18n.t('emoji.picker.categories.flags'),
      },
    }}
  />
)

export const EmojiPickerController = ({ onClick }: any) => (
  <a className="emoji-button-toggle" onClick={() => onClick()}>
    <Emoji emoji=":grinning:" set={emojiSet} size={22} />
  </a>
)
