import React, { useState } from 'react'
import { states } from './states'
import { department } from './department'
import './home.css'

// Components
import Datepicker from '../../components/datepicker/Datepicker'
import Select from '../../components/select/Select'
import Modal from '../../components/modal/Modal'
import { useEmployeeContext } from '../employees/EmployeesContext'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPen,
  faUser,
  faLocationDot,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const { employees, setEmployees } = useEmployeeContext()

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const saveEmployee = () => {
    const newEmployee = { ...employeeData }

    // Mettre à jour la liste des employés
    setEmployees(newEmployee) < // Enregistre le nouvel employé dans le contexte
      //ouvrir le modal
      Modal >
      // Réinitialiser le formulaire après l'enregistrement
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
  }

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
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            value={employeeData.lastName}
            onChange={handleChange}
            autoComplete="family-name"
          />
          <label htmlFor="date-of-birth">Date of Birth</label>
          <Datepicker
            idPrefix="date-of-birth"
            onChange={(date) =>
              setEmployeeData((prevData) => ({
                ...prevData,
                dateOfBirth: date,
              }))
            }
          />
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

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            name="city"
            value={employeeData.city}
            onChange={handleChange}
            autoComplete="address-level2"
          />

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

          <label htmlFor="zip-code">Zip Code</label>
          <input
            id="zip-code"
            type="number"
            name="zipCode"
            value={employeeData.zipCode}
            onChange={handleChange}
            autoComplete="postal-code"
          />
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
            onChange={(date) =>
              setEmployeeData((prevData) => ({ ...prevData, startDate: date }))
            }
          />
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
        </div>
      </form>
      <button onClick={saveEmployee}>Save</button>
    </div>
  )
}

export default Home
