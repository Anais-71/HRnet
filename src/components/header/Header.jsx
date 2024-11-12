import React from 'react'

import logo from '../../assets/img/logo.png'
import './header.css'

// Translation
import { useTranslation } from 'react-i18next'

function Header() {
  const { t } = useTranslation()
  return (
    <div className="header">
      <div className="header__main">
        <img className="header__logo" src={logo} alt="Logo Wealth Health" />
        <h1 className="header__title">HRnet</h1>
      </div>
      <div className="header__nav">
        <a className="header__nav--link" href="/">
          {t('header.create')}
        </a>
        <a className="header__nav--link" href="/employees">
          {t('header.view')}
        </a>
      </div>
    </div>
  )
}

export default Header
