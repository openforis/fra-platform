import './Tutorials.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Icon from 'client/components/Icon'
import PageLayout from 'client/components/PageLayout'

export const videoResources: Array<{
  idx: number
  labelKey: string
  labelKeyShort?: string
  url: Record<string, string>
}> = [
  {
    idx: 1,
    labelKey: 'tutorial.passwordLogin',
    labelKeyShort: 'tutorial.passwordLoginShort',
    url: {
      en: 'https://www.youtube.com/watch?v=JJ5mqdWyKIY&list=PLzp5NgJ2-dK4ZmmQ2qHRVR--pu-kVp5DZ&index=6',
      fr: 'https://youtu.be/pbfy-y84M4M',
    },
  },
  {
    idx: 2,
    labelKey: 'tutorial.googleLogin',
    labelKeyShort: 'tutorial.googleLoginShort',
    url: {
      en: 'https://www.youtube.com/watch?v=BQVEIUX4x20&list=PLzp5NgJ2-dK4ZmmQ2qHRVR--pu-kVp5DZ&index=5',
      fr: 'https://youtu.be/7sM7EqXzc5o',
    },
  },
  {
    idx: 3,
    labelKey: 'tutorial.collaboratorAdd',
    url: {
      en: 'https://www.youtube.com/watch?v=SsGXSaNFmH4&list=PLzp5NgJ2-dK4ZmmQ2qHRVR--pu-kVp5DZ&index=4',
      fr: 'https://youtu.be/zCFxrrNHFLM',
    },
  },
  {
    idx: 4,
    labelKey: 'tutorial.platformNavigation',
    url: {
      en: 'https://www.youtube.com/watch?v=m0rOvOcU-0w&list=PLzp5NgJ2-dK4ZmmQ2qHRVR--pu-kVp5DZ&index=3',
      fr: 'https://youtu.be/jliaEKb9BGs',
    },
  },
  {
    idx: 5,
    labelKey: 'tutorial.documentUpload',
    url: {
      en: 'https://www.youtube.com/watch?v=DgSzHqk-GDg&list=PLzp5NgJ2-dK4ZmmQ2qHRVR--pu-kVp5DZ&index=2',
      fr: 'https://youtu.be/U5hLr4HiS98',
    },
  },
  {
    idx: 6,
    labelKey: 'tutorial.ndpAdd',
    url: {
      en: 'https://www.youtube.com/watch?v=CbepficbybI&list=PLzp5NgJ2-dK4ZmmQ2qHRVR--pu-kVp5DZ&index=1',
      fr: 'https://youtu.be/VDSKsmoaW1k',
    },
  },
]

const Tutorials: React.FC = () => {
  const { t, i18n } = useTranslation()

  return (
    <PageLayout withToolbar={false}>
      <div className="app-view__content">
        <div className="landing__page-header">
          <h1 className="landing__page-title title">{t('Tutorials')}</h1>
        </div>

        <div className="list-tutorial ">
          {videoResources.map((resource, index) => (
            <React.Fragment key={resource.idx}>
              {index !== 0 && <div className="list-tutorial-separator" />}

              <div>{t(resource.labelKey)}</div>

              <a
                className="btn-s btn-primary nav__bulk-download"
                href={resource.url[i18n.language] ?? resource.url.en}
                target="_blank"
                rel="noreferrer"
              >
                <Icon className="icon-sub icon-white" name="video" />
                {t('tutorial.watch')}
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}

export default Tutorials
