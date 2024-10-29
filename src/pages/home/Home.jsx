import React, { useState } from 'react'
import { states } from './states'
import { department } from './department'
import './home.css'

import Datepicker from '../../components/datepicker/Datepicker'
import Select from '../../components/select/Select'

const Home = ({ setEmployees }) => {
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const saveEmployee = (e) => {
    e.preventDefault()
    const employees = JSON.parse(localStorage.getItem('employees')) || []
    employees.push(employeeData)
    localStorage.setItem('employees', JSON.stringify(employees))

    setEmployeeData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      startDate: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      department: '',
    })

    setEmployees(employees)
  }

  return (
    <div className="main">
      <div className="main__header">
        <div className="main__header--icon">
          <i className="fa-solid fa-pen"></i>
        </div>
        <h2 className="main__header--title">Create employee</h2>
      </div>

      <form action="#" id="create-employee" className="main__form">
        <div className="form__section">
          <div className="form__section--header">
            <div className="form__section--icon">
              <i className="fa-solid fa-user"></i>
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
          <Datepicker className="datepicker" idPrefix="date-of-birth" />
        </div>
        <div className="form__section">
          <div className="form__section--header">
            <div className="form__section--icon">
              <i className="fa-solid fa-location-dot"></i>
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
            className="select"
            options={states}
            label="State"
            value={employeeData.state}
            onChange={handleChange}
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
            <div className="form__section--icon">
              <i className="fa-solid fa-briefcase"></i>
            </div>
            <div className="form__section--title">Position</div>
          </div>
          <label htmlFor="start-date">Start Date</label>
          <Datepicker idPrefix="start-date" />
          <Select
            options={department}
            label="Department"
            value={employeeData.department}
            onChange={handleChange}
            name="department"
            valueField="id"
            labelField="name"
          />
        </div>
      </form>
      <button onClick={saveEmployee}>Save</button>
    </div>
  )
}

export default Home
