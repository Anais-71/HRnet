import React, { useState, useMemo } from 'react'
import './table.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons'

const Table = ({ columns, data }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [entriesPerPage, setEntriesPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const sortedData = useMemo(() => {
    let sorted = [...data]
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc'
            ? aValue - bValue
            : bValue - aValue
        }
        return 0
      })
    }
    return sorted
  }, [data, sortConfig])

  const filteredData = sortedData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  )

  const displayedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage,
  )

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.direction === 'asc' && prev.key === key ? 'desc' : 'asc',
    }))
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleEntriesPerPage = (e) => {
    setEntriesPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  const totalEntries = filteredData.length
  const startEntry = (currentPage - 1) * entriesPerPage + 1
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries)

  return (
    <div className="container">
      <div className="header__controls">
        <div className="header__controls--search">
          <FontAwesomeIcon
            icon={faSearch}
            className="header__controls--search--icon"
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="header__controls--search--input"
          />
        </div>
        <div className="header__controls--pages">
          Show
          <select
            value={entriesPerPage}
            onChange={handleEntriesPerPage}
            className="header__controls--pages--select"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          entries
        </div>
      </div>

      <table className="table">
        <thead className="table__header">
          <tr>
            {columns.map((column) => (
              <th
                className="table__header--row"
                key={column.accessor}
                onClick={() => handleSort(column.accessor)}
              >
                {column.Header}
                {sortConfig.key === column.accessor && (
                  <span className="sort-icon">
                    <FontAwesomeIcon
                      icon={
                        sortConfig.direction === 'asc' ? faSortUp : faSortDown
                      }
                    />
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table__content">
          {displayedData.map((item, index) => (
            <tr className="table__row" key={index}>
              {columns.map((column) => (
                <td className="table__col" key={column.accessor}>
                  {item[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table__footer">
        <p className="table__footer--entries">
          Showing {startEntry} to {endEntry} of {totalEntries} entries
        </p>

        <div className="table__footer--pagination">
          <button
            className="table__footer--pagination--btn"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            className="table__footer--pagination--btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {[...Array(Math.ceil(totalEntries / entriesPerPage)).keys()].map(
            (num) => (
              <button
                key={num + 1}
                onClick={() => setCurrentPage(num + 1)}
                className={`table__footer--pagination--btn ${
                  currentPage === num + 1 ? 'active' : ''
                }`}
              >
                {num + 1}
              </button>
            ),
          )}

          <button
            className="table__footer--pagination--btn"
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(totalEntries / entriesPerPage)),
              )
            }
            disabled={currentPage === Math.ceil(totalEntries / entriesPerPage)}
          >
            Next
          </button>
          <button
            className="table__footer--pagination--btn"
            onClick={() =>
              setCurrentPage(Math.ceil(totalEntries / entriesPerPage))
            }
            disabled={currentPage === Math.ceil(totalEntries / entriesPerPage)}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  )
}

export default Table
