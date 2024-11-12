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
    <div
      className="user__popup"
      role="dialog"
      aria-labelledby="userDetailsTitle"
      aria-describedby="userDetailsDesc"
    >
      <div className="user__popup--header">
        <h2 id="userDetailsTitle">User Details</h2>
        <button
          className="user__popup--close"
          onClick={onClose}
          aria-label="Close details"
        >
          <FontAwesomeIcon
            icon={faXmark}
            className="user__popup--close--icon"
          />
        </button>
      </div>

      <div
        className="user__popup--section"
        aria-labelledby="detailsSectionTitle"
        aria-describedby="detailsSectionDesc"
      >
        <div className="user__popup--section--header">
          <div className="user__popup--section--header--icon icon">
            <FontAwesomeIcon icon={faUser} className="icon__fa" />
          </div>
          <h3
            id="detailsSectionTitle"
            className="user__popup--section--header--title"
          >
            Details
          </h3>
        </div>
        <p id="detailsSectionDesc" className="user__popup--section--content">
          <strong>First Name:</strong> {user.firstName}
        </p>
        <p className="user__popup--section--content">
          <strong>Last Name:</strong> {user.lastName}
        </p>
        <p className="user__popup--section--content">
          <strong>Date of Birth:</strong> {user.dateOfBirth}
        </p>
      </div>

      <div
        className="user__popup--section"
        aria-labelledby="addressSectionTitle"
        aria-describedby="addressSectionDesc"
      >
        <div className="user__popup--section--header">
          <div className="user__popup--section--header--icon icon">
            <FontAwesomeIcon icon={faLocationDot} className="icon__fa" />
          </div>
          <h3
            id="addressSectionTitle"
            className="user__popup--section--header--title"
          >
            Address
          </h3>
        </div>
        <p id="addressSectionDesc" className="user__popup--section--content">
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

      <div
        className="user__popup--section"
        aria-labelledby="positionSectionTitle"
        aria-describedby="positionSectionDesc"
      >
        <div className="user__popup--section--header">
          <div className="user__popup--section--header--icon icon">
            <FontAwesomeIcon icon={faBriefcase} className="icon__fa" />
          </div>
          <h3
            id="positionSectionTitle"
            className="user__popup--section--header--title"
          >
            Position
          </h3>
        </div>
        <p id="positionSectionDesc" className="user__popup--section--content">
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
