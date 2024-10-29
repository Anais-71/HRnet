import React, { useState, useEffect } from 'react'
import { useTable, useSortBy, usePagination } from 'react-table'

import './table.css'

const Table = ({ columns, data }) => {
  const [searchInput, setSearchInput] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    setFilteredData(
      data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(searchInput.toLowerCase()),
        ),
      ),
    )
  }, [data, searchInput])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize: currentPageSize },
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize },
    },
    useSortBy,
    usePagination,
  )

  return (
    <div>
      <div className="table__controls">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search"
          className="table__controls--search"
        />

        <select
          className="table__controls--amount"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>

      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="table__head"
              key={headerGroup.id}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => {
                // Assurez-vous de définir la clé directement sur <th>
                const headerProps = column.getHeaderProps(
                  column.getSortByToggleProps(),
                )
                return (
                  <th
                    key={column.id} // Définir la clé directement ici
                    className="table__col"
                    {...headerProps}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' ▼'
                          : ' ▲'
                        : ''}
                    </span>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row)
            // Assurez-vous de définir la clé directement sur <tr>
            return (
              <tr
                key={row.id} // Définir la clé directement ici
                className="table__row"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td key={cell.column.id} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="table__page">
        Showing {pageIndex * currentPageSize + 1} to{' '}
        {Math.min((pageIndex + 1) * currentPageSize, filteredData.length)} out
        of {filteredData.length} entries
      </div>

      <div>
        <button
          className="table__btn--first"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>
        <button
          className="table__btn--prv"
          onClick={() => gotoPage(pageIndex - 1)}
          disabled={!canPreviousPage}
        >
          Previous
        </button>
        <button
          className="table__btn--next"
          onClick={() => gotoPage(pageIndex + 1)}
          disabled={!canNextPage}
        >
          Next
        </button>
        <button
          className="table__btn--last"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>
      </div>
    </div>
  )
}

export default Table
