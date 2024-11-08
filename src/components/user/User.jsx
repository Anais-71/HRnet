import React from 'react'
import './user.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark,
  faUser,
  faLocationDot,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons'

const User = ({ user, onClose }) => (
  <div className="user">
    <div className="user__popup">
      <div className="user__popup--header">
        <h2>User Details</h2>
        <button className="user__popup--close" onClick={onClose}>
          <FontAwesomeIcon
            icon={faXmark}
            className="user__popup--close--icon"
          />
        </button>
      </div>

      <div className="user__popup--section">
        <div className="user__popup--section--header">
          <div className="user__popup--section--header--icon icon">
            <FontAwesomeIcon icon={faUser} className="icon__fa" />
          </div>
          <h3 className="user__popup--section--header--title">Details</h3>
        </div>
        <p className="user__popup--section--content">
          <strong>First Name:</strong> {user.firstName}
        </p>
        <p className="user__popup--section--content">
          <strong>Last Name:</strong> {user.lastName}
        </p>
        <p className="user__popup--section--content">
          <strong>Date of Birth:</strong> {user.dateOfBirth}
        </p>
      </div>

      <div className="user__popup--section">
        <div className="user__popup--section--header">
          <div className="user__popup--section--header--icon icon">
            <FontAwesomeIcon icon={faLocationDot} className="icon__fa" />
          </div>
          <h3 className="user__popup--section--header--title">Address</h3>
        </div>
        <p className="user__popup--section--content">
          <strong>Street:</strong> {user.street}
        </p>
        <p className="user__popup--section--content">
          <strong>City:</strong> {user.city}
        </p>
        <p className="user__popup--section--content">
          <strong>State:</strong> {user.state}
        </p>
        <p className="user__popup--section--content">
          <strong>Zip Code:</strong> {user.zipCode}
        </p>
      </div>

      <div className="user__popup--section">
        <div className="user__popup--section--header">
          <div className="user__popup--section--header--icon icon">
            <FontAwesomeIcon icon={faBriefcase} className="icon__fa" />
          </div>
          <h3 className="user__popup--section--header--title">Position</h3>
        </div>
        <p className="user__popup--section--content">
          <strong>Department:</strong> {user.department}
        </p>
        <p className="user__popup--section--content">
          <strong>Start Date:</strong> {user.startDate}
        </p>
      </div>
    </div>
  </div>
)

export default User
