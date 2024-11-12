import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types' // Import PropTypes for type validation

/**
 * EmployeeContext is the context for managing employee data.
 * It provides the employee state and a function to add employees.
 */
const EmployeeContext = createContext()

/**
 * EmployeeProvider component provides the EmployeeContext to its children.
 * It manages employee data and stores it in localStorage.
 *
 * @param {Object} props - The props of the component.
 * @param {React.ReactNode} props.children - The child components that will be wrapped by the provider.
 * @returns {React.Element} The provider component.
 */
export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([])

  /**
   * Adds a new employee to the state and stores it in localStorage.
   *
   * @param {Object} newEmployee - The new employee to add.
   * @param {string} newEmployee.firstName - The first name of the employee.
   * @param {string} newEmployee.lastName - The last name of the employee.
   * @param {string} newEmployee.dateOfBirth - The birthdate of the employee.
   * @param {string} newEmployee.street - The street address of the employee.
   * @param {string} newEmployee.city - The city where the employee lives.
   * @param {string} newEmployee.state - The state where the employee lives.
   * @param {string} newEmployee.zipCode - The zip code of the employee's address.
   * @param {string} newEmployee.department - The department of the employee.
   * @param {string} newEmployee.startDate - The start date of the employee.
   */
  const addEmployee = (newEmployee) => {
    const newState = [...employees, newEmployee]
    localStorage.setItem('employees', JSON.stringify(newState)) // Save the new state to localStorage
    setEmployees(newState) // Update the state with the new employee
  }

  /**
   * Loads employees from localStorage when the component is mounted.
   */
  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem('employees')) || []
    setEmployees(savedEmployees) // Set the state to saved employees
  }, [])

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees: addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  )
}

/**
 * PropTypes validation for the EmployeeProvider component.
 * Ensures that the 'children' prop is a valid React node.
 */
EmployeeProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensures 'children' is a valid React node
}

export default EmployeeContext
