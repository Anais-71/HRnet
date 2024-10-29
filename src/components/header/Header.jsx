import React from 'react'

import logo from '../../assets/img/logo.png'
import './header.css'

function Header() {
  return (
    <div className="header">
      <div className="header__main">
        <img className="header__logo" src={logo} alt="Logo Wealth Health" />
        <h1 className="header__title">HRnet</h1>
      </div>
      <div className="header__nav">
        <a className="header__nav--link" href="/">
          Create Employee
        </a>
        <a className="header__nav--link" href="/employees">
          View Current Employees
        </a>
      </div>
    </div>
  )
}

export default Header
