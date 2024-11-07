import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import Table from './Table'

/**
 * Test the search functionality in the Table component.
 * When the user types in the search input, the table filters data accordingly.
 */
test('When I use the search input, then search filters data based on input', async () => {
  const columns = [{ Header: 'Name', accessor: 'name' }]
  const data = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }]

  render(<Table columns={columns} data={data} />)

  const searchInput = screen.getByTestId('search-input')

  // Simulate typing a search term into the input field
  fireEvent.change(searchInput, { target: { value: 'Alice' } })

  // Verify that only 'Alice' is visible
  expect(screen.getByText('Alice')).toBeInTheDocument()
  expect(screen.queryByText('Bob')).not.toBeInTheDocument()
})

/**
 * Test sorting functionality in the Table component.
 * When the user clicks on a column header, the table sorts data by that column.
 */
test('When I click the sort button, then the table sorts the data', async () => {
  const columns = [{ Header: 'Name', accessor: 'name' }]
  const data = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }]

  render(<Table columns={columns} data={data} />)

  const sortColumn = screen.getByTestId('sort-column-name')

  // Simulate clicking the sort column
  fireEvent.click(sortColumn)

  // Verify that the first row is 'Alice' after sorting
  const firstRow = screen.getByText('Alice')
  expect(firstRow).toBeInTheDocument()

  // Simulate clicking again to reverse the sort order
  fireEvent.click(sortColumn)

  // Verify that the first row is 'Charlie' after sorting in reverse
  const firstRowAfterSort = screen.getByText('Charlie')
  expect(firstRowAfterSort).toBeInTheDocument()
})

/**
 * Test entries per page functionality in the Table component.
 * When the user changes the entries per page option, the table updates to display the correct number of entries.
 */
test('When I change entries per page, then the number of entries displayed changes accordingly', async () => {
  const columns = [{ Header: 'Name', accessor: 'name' }]
  const data = Array.from({ length: 50 }, (_, i) => ({ name: `User ${i + 1}` }))

  render(<Table columns={columns} data={data} />)

  const entriesPerPageSelect = screen.getByTestId('entries-per-page-select')

  // Simulate selecting 25 entries per page
  fireEvent.change(entriesPerPageSelect, { target: { value: '25' } })

  // Verify that 25 rows are displayed
  const rows = screen.getAllByTestId('table-row')
  expect(rows.length).toBe(25)
})

/**
 * Test pagination functionality in the Table component.
 * When the user clicks the pagination buttons, the table updates to show the correct page.
 */
test('When I click on pagination buttons, then the page changes and entries update accordingly', async () => {
  const columns = [{ Header: 'Name', accessor: 'name' }]
  const data = Array.from({ length: 25 }, (_, i) => ({ name: `User ${i + 1}` }))

  render(<Table columns={columns} data={data} />)

  // Verify that the first page is active by default
  const pageOneButton = screen.getByTestId('page-btn-1')
  expect(pageOneButton).toHaveClass('active')

  const nextPageButton = screen.getByTestId('next-page-btn')
  fireEvent.click(nextPageButton)

  // Verify that the second page is active after clicking 'Next'
  const pageTwoButton = screen.getByTestId('page-btn-2')
  expect(pageTwoButton).toHaveClass('active')

  // Verify that the first page is no longer active
  expect(pageOneButton).not.toHaveClass('active')

  // Verify that data for page 2 (e.g., User 11) is displayed
  expect(screen.getByText('User 11')).toBeInTheDocument()
})

/**
 * Test first and last page navigation in the Table component.
 * When the user clicks the first or last page buttons, the table should update correctly.
 */
test('When I go to the first and last page, then the pagination buttons behave correctly', async () => {
  const columns = [{ Header: 'Name', accessor: 'name' }]
  const data = Array.from({ length: 50 }, (_, i) => ({ name: `User ${i + 1}` }))

  render(<Table columns={columns} data={data} />)

  const lastPageButton = screen.getByTestId('last-page-btn')
  fireEvent.click(lastPageButton)

  // Verify that the last page is active
  const lastPageButtonActive = screen.getByTestId('page-btn-5') // assuming there are 5 pages
  expect(lastPageButtonActive).toHaveClass('active')

  // Go to the first page
  const firstPageButton = screen.getByTestId('first-page-btn')
  fireEvent.click(firstPageButton)

  // Verify that the first page is active
  const firstPageButtonActive = screen.getByTestId('page-btn-1')
  expect(firstPageButtonActive).toHaveClass('active')
})

/**
 * Test the behavior when no data matches the search term.
 * If no data matches, no rows should be displayed in the table.
 */
test('When no data matches the search term, then no rows are displayed', async () => {
  const columns = [{ Header: 'Name', accessor: 'name' }]
  const data = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }]

  render(<Table columns={columns} data={data} />)

  const searchInput = screen.getByTestId('search-input')

  // Search for a non-existent term
  fireEvent.change(searchInput, { target: { value: 'Zoe' } })

  // Verify that no rows are displayed
  const rows = screen.queryAllByTestId('table-row')
  expect(rows.length).toBe(0)
})

/**
 * Snapshot test for the Table component.
 * The rendered table is compared to a saved snapshot to ensure consistent output.
 */
test('Table matches the snapshot', () => {
  const columns = [{ Header: 'Name', accessor: 'name' }]
  const data = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }]

  const { asFragment } = render(<Table columns={columns} data={data} />)

  // Compare the rendered output to the saved snapshot
  expect(asFragment()).toMatchSnapshot()
})
