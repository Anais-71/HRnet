import React from 'react'
import './footer.css'

// Translation
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()

  return (
    <div className="footer">
      <p>{t('footer.copyright')}</p>
    </div>
  )
}

export default Footer
