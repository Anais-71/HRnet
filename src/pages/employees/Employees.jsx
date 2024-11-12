import React from 'react'
import Table from '../../components/table/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'

import { useEmployeeContext } from './EmployeesContext'

// Translation
import { useTranslation } from 'react-i18next'

function Employees() {
  const { t } = useTranslation() // Initialize translation hook
  const { employees } = useEmployeeContext() // Utilise le contexte pour récupérer les employés

  // Définir les colonnes pour le tableau
  const columns = React.useMemo(
    () => [
      { Header: t('main.firstName'), accessor: 'firstName' },
      { Header: t('main.lastName'), accessor: 'lastName' },
      { Header: t('main.dateOfBirth'), accessor: 'dateOfBirth' },
      { Header: t('main.street'), accessor: 'street' },
      { Header: t('main.city'), accessor: 'city' },
      { Header: t('main.state'), accessor: 'state' },
      { Header: t('main.zipCode'), accessor: 'zipCode' },
      { Header: t('main.startDate'), accessor: 'startDate' },
      { Header: t('main.department'), accessor: 'department' },
    ],
    [],
  )

  return (
    <div className="main">
      <div className="main__header">
        <div className="main__header--icon icon">
          <FontAwesomeIcon icon={faAddressBook} className="icon__fa" />
        </div>
        <h2 className="main__header--title">
          {t('main.currentEmployeeTitle')}
        </h2>
      </div>
      <Table columns={columns} data={employees} />{' '}
    </div>
  )
}

export default Employees
