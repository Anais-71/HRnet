import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './modal.css'

/**
 * Modal component for displaying a popup dialog.
 *
 * @param {Object} props - The properties for the Modal component.
 * @param {Function} props.onClose - Function to call when the modal is closed.
 * @param {string} [props.title] - The title of the modal. Optional.
 * @param {string} [props.message] - The message to display in the modal. Optional.
 * @param {Array<{ label: string, onClick: Function }>} props.actions - Array of action buttons, each with a label and an onClick handler.
 *
 * @returns {JSX.Element} The rendered modal component.
 */
function Modal({ onClose, title, message, actions }) {
  return (
    <div className="modal">
      <div className="modal__popup">
        <button className="modal__popup--close" onClick={onClose}>
          <FontAwesomeIcon
            icon={faXmark}
            className="modal__popup--close--icon"
          />
        </button>
        {title && <h3 className="modal__popup--title">{title}</h3>}
        {message && <p className="modal__popup--message">{message}</p>}
        <div className="modal__popup--buttons">
          {actions.map((action, index) => (
            <button
              key={index}
              className="modal__popup--buttons--btn"
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Modal
