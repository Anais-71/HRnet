import React from 'react'
import Table from '../../components/table/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
import { useEmployeeContext } from './EmployeesContext'

function Employees() {
  const { employees } = useEmployeeContext() // Utilise le contexte pour récupérer les employés

  // Définir les colonnes pour le tableau
  const columns = React.useMemo(
    () => [
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      { Header: 'Date of Birth', accessor: 'dateOfBirth' },
      { Header: 'Street', accessor: 'street' },
      { Header: 'City', accessor: 'city' },
      { Header: 'State', accessor: 'state' },
      { Header: 'Zip Code', accessor: 'zipCode' },
      { Header: 'Start Date', accessor: 'startDate' },
      { Header: 'Department', accessor: 'department' },
    ],
    [],
  )

  return (
    <div className="main">
      <div className="main__header">
        <div className="main__header--icon icon">
          <FontAwesomeIcon icon={faAddressBook} className="icon__fa" />
        </div>
        <h2 className="main__header--title">Current employees</h2>
      </div>
      <Table columns={columns} data={employees} />{' '}
      {/* Passe les données du contexte au tableau */}
    </div>
  )
}

export default Employees
