import React from 'react'
import './modal.css'

function Modal() {
  return (
    <div className="modal">
      <div className="modal__popup">
        <div className="modal__close">
          <FontAwesomeIcon icon="fa-solid fa-xmark" />
        </div>
        <p className="modal__message">Employee successfully created!</p>
        <button className="modal__btn">View all employees</button>
        <button className="modal__btn">Create new employee</button>
      </div>
    </div>
  )
}

export default Modal
