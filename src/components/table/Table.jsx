import React, { useState, useMemo } from 'react'
import './table.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faSortUp,
  faSortDown,
  faBackwardStep,
  faForwardStep,
  faChevronRight,
  faChevronLeft,
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

  const filteredData = useMemo(() => {
    return sortedData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )
  }, [sortedData, searchTerm])

  const displayedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage,
  )

  const totalEntries = filteredData.length
  const totalPages = Math.ceil(totalEntries / entriesPerPage)

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

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const startEntry = (currentPage - 1) * entriesPerPage + 1
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries)

  return (
    <div className="container">
      <div className="header__controls">
        <div
          className="header__controls--search"
          data-testid="search-input-container"
        >
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
            data-testid="search-input"
          />
        </div>
        <div className="header__controls--pages">
          Show
          <select
            value={entriesPerPage}
            onChange={handleEntriesPerPage}
            className="header__controls--pages--select"
            data-testid="entries-per-page-select"
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
                data-testid={`sort-column-${column.accessor}`}
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
            <tr className="table__row" key={index} data-testid="table-row">
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

        <div
          className="table__footer--pagination"
          data-testid="pagination-buttons"
        >
          <button
            className="table__footer--pagination--btn"
            onClick={() => changePage(1)}
            disabled={currentPage === 1}
            data-testid="first-page-btn"
          >
            <FontAwesomeIcon icon={faBackwardStep} />
          </button>
          <button
            className="table__footer--pagination--btn"
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            data-testid="prev-page-btn"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => changePage(index + 1)}
              className={`table__footer--pagination--btn ${
                currentPage === index + 1 ? 'active' : ''
              }`}
              data-testid={`page-btn-${index + 1}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="table__footer--pagination--btn"
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            data-testid="next-page-btn"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
          <button
            className="table__footer--pagination--btn"
            onClick={() => changePage(totalPages)}
            disabled={currentPage === totalPages}
            data-testid="last-page-btn"
          >
            <FontAwesomeIcon icon={faForwardStep} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Table
