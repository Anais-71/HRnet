import { useContext } from 'react'
import EmployeeContext from './EmployeesContext'

// Custom hook to access the employee context
export const useEmployeeContext = () => useContext(EmployeeContext)
