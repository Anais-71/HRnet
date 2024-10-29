import React from 'react'
import Table from '../../components/table/Table'
import employeeList from './employee-list'

function Employees() {
  const columns = React.useMemo(
    () => [
      { Header: 'First Name', accessor: 'firstName' },
      { Header: 'Last Name', accessor: 'lastName' },
      { Header: 'Start Date', accessor: 'startDate' },
      { Header: 'Department', accessor: 'department' },
      { Header: 'Date of Birth', accessor: 'dateOfBirth' },
      { Header: 'Street', accessor: 'street' },
      { Header: 'City', accessor: 'city' },
      { Header: 'State', accessor: 'state' },
      { Header: 'Zip Code', accessor: 'zipCode' },
    ],
    [],
  )

  const data = React.useMemo(() => employeeList, [])

  return (
    <div className="main">
      <h1 className="main__title">HRnet</h1>
      <h2 className="main__subtitle">Current employees</h2>
      <div className="main__table">
        <Table columns={columns} data={data} />
      </div>
    </div>
  )
}

export default Employees
