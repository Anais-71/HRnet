import React from 'react'
import Table from '../../components/table/Table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'

import { useEmployeeContext } from './useEmployeeContext'

// Translation hook
import { useTranslation } from 'react-i18next'

/**
 * Component displaying the list of current employees in a table.
 * It retrieves employee data from the EmployeeContext and uses i18n for localization.
 *
 * @component
 * @returns {JSX.Element} The rendered employee list page with a table of employees.
 */
function Employees() {
  const { t } = useTranslation() // Initialize the translation hook
  const { employees } = useEmployeeContext() // Use context to get employee data

  /**
   * Defines the columns for the employee data table, utilizing i18n for localization.
   *
   * @type {Array} columns - Array of column definitions for the table.
   * Each column includes a 'Header' for display and an 'accessor' for the corresponding data field.
   */
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
    [t], // Recalculate columns when the translation function changes
  )

  return (
    <div className="main">
      <div className="main__header">
        <div className="main__header--icon icon">
          <FontAwesomeIcon icon={faAddressBook} className="icon__fa" />
        </div>
        <h2 className="main__header--title">
          {t('main.currentEmployeeTitle')} {/* Localized title */}
        </h2>
      </div>
      {/* Render Table component with columns and employee data */}
      <Table columns={columns} data={employees} />
    </div>
  )
}

export default Employees
