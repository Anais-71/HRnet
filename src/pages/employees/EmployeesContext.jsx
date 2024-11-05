import React, { createContext, useContext, useState, useEffect } from 'react'

const EmployeeContext = createContext()

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([])

  const addEmployee = (newEmployee) => {
    const newState = [...employees, newEmployee]

    localStorage.setItem('employees', JSON.stringify(newState))

    setEmployees(newState)
  }

  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem('employees')) || []

    setEmployees(savedEmployees)
  }, [])

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees: addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  )
}

export const useEmployeeContext = () => useContext(EmployeeContext)
