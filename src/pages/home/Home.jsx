import React, { useState } from 'react'
import { states } from './states'
import { department } from './department'
import { useNavigate } from 'react-router-dom'
import './home.css'

// Components
import Datepicker from '../../components/datepicker/Datepicker'
import Select from '../../components/select/Select'
import Modal from '../../components/modal/Modal'

// Context
import { useEmployeeContext } from '../employees/EmployeesContext'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPen,
  faUser,
  faLocationDot,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons'

/**
 * Home component for creating a new employee.
 *
 * This component includes a form to input employee details and displays a modal upon successful creation of an employee.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
const Home = () => {
  const { setEmployees } = useEmployeeContext()
  const navigate = useNavigate()

  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: '',
    dateOfBirth: '',
    startDate: '',
  })

  const [errors, setErrors] = useState({}) // Store errors
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Validate the form
  const validateForm = () => {
    const newErrors = {}
    Object.keys(employeeData).forEach((key) => {
      if (!employeeData[key]) {
        newErrors[key] = 'This field is required'
      }
    })
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const saveEmployee = () => {
    const validationErrors = validateForm()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      const newEmployee = { ...employeeData }
      setEmployees(newEmployee)

      setEmployeeData({
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        department: '',
        dateOfBirth: '',
        startDate: '',
      })

      setIsModalOpen(true)
    }
  }

  const modalActions = [
    {
      label: 'View all employees',
      onClick: () => {
        navigate('/employees')
        setIsModalOpen(false)
      },
    },
    {
      label: 'Create new employee',
      onClick: () => {
        setIsModalOpen(false)
      },
    },
  ]

  return (
    <div className="main">
      <div className="main__header">
        <div className="main__header--icon icon">
          <FontAwesomeIcon icon={faPen} className="icon__fa" />
        </div>
        <h2 className="main__header--title">Create employee</h2>
      </div>

      <form id="create-employee" className="main__form">
        <div className="form__section">
          <div className="form__section--header">
            <div className="form__section--icon icon">
              <FontAwesomeIcon icon={faUser} className="icon__fa" />
            </div>
            <div className="form__section--title">Details</div>
          </div>
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            value={employeeData.firstName}
            onChange={handleChange}
            autoComplete="given-name"
          />
          {errors.firstName && (
            <div className="main__form__error">{errors.firstName}</div>
          )}

          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            value={employeeData.lastName}
            onChange={handleChange}
            autoComplete="family-name"
          />
          {errors.lastName && (
            <div className="main__form__error">{errors.lastName}</div>
          )}

          <label htmlFor="date-of-birth">Date of Birth</label>
          <Datepicker
            idPrefix="date-of-birth"
            onChange={(date) => {
              setEmployeeData((prevData) => ({
                ...prevData,
                dateOfBirth: date,
              }))
            }}
          />
          {errors.dateOfBirth && (
            <div className="main__form__error">{errors.dateOfBirth}</div>
          )}
        </div>

        <div className="form__section">
          <div className="form__section--header">
            <div className="form__section--icon icon">
              <FontAwesomeIcon icon={faLocationDot} className="icon__fa" />
            </div>
            <div className="form__section--title">Address</div>
          </div>
          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            name="street"
            value={employeeData.street}
            onChange={handleChange}
            autoComplete="street-address"
          />
          {errors.street && (
            <div className="main__form__error">{errors.street}</div>
          )}

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            name="city"
            value={employeeData.city}
            onChange={handleChange}
            autoComplete="address-level2"
          />
          {errors.city && (
            <div className="main__form__error">{errors.city}</div>
          )}

          <Select
            options={states}
            label="State"
            value={employeeData.state}
            onChange={(e) =>
              setEmployeeData((prevData) => ({
                ...prevData,
                state: e.target.value,
              }))
            }
            name="state"
            valueField="abbreviation"
            labelField="name"
          />
          {errors.state && (
            <div className="main__form__error">{errors.state}</div>
          )}

          <label htmlFor="zip-code">Zip Code</label>
          <input
            id="zip-code"
            type="number"
            name="zipCode"
            value={employeeData.zipCode}
            onChange={handleChange}
            autoComplete="postal-code"
          />
          {errors.zipCode && (
            <div className="main__form__error">{errors.zipCode}</div>
          )}
        </div>

        <div className="form__section">
          <div className="form__section--header">
            <div className="form__section--icon icon">
              <FontAwesomeIcon icon={faBriefcase} className="icon__fa" />
            </div>
            <div className="form__section--title">Position</div>
          </div>
          <label htmlFor="start-date">Start Date</label>
          <Datepicker
            idPrefix="start-date"
            onChange={(date) => {
              setEmployeeData((prevData) => ({
                ...prevData,
                startDate: date,
              }))
            }}
          />
          {errors.startDate && (
            <div className="main__form__error">{errors.startDate}</div>
          )}

          <Select
            options={department}
            label="Department"
            value={employeeData.department}
            onChange={(e) =>
              setEmployeeData((prevData) => ({
                ...prevData,
                department: e.target.value,
              }))
            }
            name="department"
            valueField="name"
            labelField="name"
          />
          {errors.department && (
            <div className="main__form__error">{errors.department}</div>
          )}
        </div>
      </form>
      <button className="main__form__btn" onClick={saveEmployee}>
        Save
      </button>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          message="Employee successfully created!"
          actions={modalActions}
        />
      )}
    </div>
  )
}

export default Home
