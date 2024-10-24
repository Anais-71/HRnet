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
      <h1 className="main__title">HRnet</h1>
      <h2 className="main__subtitle">Create employee</h2>

      <div className="main__form">
        <form action="#" id="create-employee">
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
          <Datepicker idPrefix="date-of-birth" /> {/* Passer l'ID ici */}
          <label htmlFor="start-date">Start Date</label>
          <Datepicker idPrefix="start-date" /> {/* Passer l'ID ici */}
          <fieldset className="address">
            <legend>Address</legend>

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
          </fieldset>
          <Select
            options={department}
            label="Department"
            value={employeeData.department}
            onChange={handleChange}
            name="department"
            valueField="id"
            labelField="name"
          />
        </form>
        <button onClick={saveEmployee}>Save</button>
      </div>
    </div>
  )
}

export default Home
