import React from 'react'

import logo from '../../assets/img/logo.png'
import './header.css'

function Header() {
  return (
    <div className="header">
      <img className="logo" src={logo} alt="Logo Wealth Health" />
      <div className="header__nav">
        <a className="header__nav--link" href="/">
          Create Employee
        </a>
        <a className="header__nav--link" href="#">
          View Current Employees
        </a>
      </div>
    </div>
  )
}

export default Header
