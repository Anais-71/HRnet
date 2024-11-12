import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import './modal.css'

/**
 * Modal component for displaying a popup dialog with accessibility enhancements.
 *
 * @param {Object} props - The properties for the Modal component.
 * @param {Function} props.onClose - Function to call when the modal is closed.
 * @param {string} [props.title] - Optional title of the modal dialog.
 * @param {string} [props.message] - Optional message to display in the modal dialog.
 * @param {Array<{ label: string, onClick: Function }>} props.actions - Array of action buttons, each with a label and an onClick handler.
 *
 * @returns {JSX.Element} The rendered modal component.
 */
function Modal({ onClose, title, message, actions }) {
  // Reference to the modal container for managing focus
  const modalRef = useRef(null)

  /**
   * Sets focus on the modal container element when the component mounts.
   */
  useEffect(() => {
    modalRef.current.focus()
  }, [])

  /**
   * Handles keyboard interactions for accessibility.
   * Closes the modal when the "Escape" key is pressed.
   *
   * @param {KeyboardEvent} e - The keyboard event.
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
      ref={modalRef}
      tabIndex="-1"
    >
      <div
        className="modal__popup"
        aria-labelledby="modal-title"
        aria-describedby="modal-message"
      >
        {/* Close button with accessible label */}
        <button
          className="modal__popup--close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="modal__popup--close--icon"
          />
        </button>

        {/* Conditional rendering of title */}
        {title && (
          <h3 id="modal-title" className="modal__popup--title">
            {title}
          </h3>
        )}

        {/* Conditional rendering of message */}
        {message && (
          <p id="modal-message" className="modal__popup--message">
            {message}
          </p>
        )}

        {/* Rendering action buttons provided in the actions prop */}
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

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    }),
  ).isRequired,
}

export default Modal
