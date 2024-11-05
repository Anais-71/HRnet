import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './modal.css'

function Modal({ onClose, onViewEmployees, onCreateNewEmployee }) {
  return (
    <div className="modal">
      <div className="modal__popup">
        <button className="modal__popup--close" onClick={onClose}>
          <FontAwesomeIcon
            icon={faXmark}
            className="modal__popup--close--icon"
          />{' '}
        </button>
        <p className="modal__popup--message">Employee successfully created!</p>
        <div className="modal__popup--buttons">
          <button
            className="modal__popup--buttons--btn"
            onClick={onViewEmployees}
          >
            View all employees
          </button>
          <button
            className="modal__popup--buttons--btn"
            onClick={onCreateNewEmployee}
          >
            Create new employee
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
