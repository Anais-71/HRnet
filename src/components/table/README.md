# Table Component

The `Table component` provides a responsive, paginated, and sortable data table with a search feature. It is designed to display data in a customizable format, with a minimal, mobile-friendly design.

## Features

- **Sorting**: Click on column headers to sort by ascending or descending order.
- **Search**: Search across all table fields in real-time.
- **Pagination**: Choose the number of rows displayed per page, navigate through pages, and jump to the first or last page.
- **Responsive Design**: Adapts to different screen sizes, with simplified columns for smaller screens.
- **User Details**: Displays user-specific details in a modal when a row is clicked.

## Installation

Ensure @fortawesome/react-fontawesome is installed for icons.
Import the Table component and include table.css in your project.

## Usage

```jsx
import Table from './Table'

const columns = [
{ Header: 'First Name', accessor: 'firstName' },
{ Header: 'Last Name', accessor: 'lastName' },
{ Header: 'Email', accessor: 'email' },
// Add more columns as needed
]

const data = [
{ firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
{ firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
// Add more data as needed
]

<Table columns={columns} data={data} />
```

## Props

- `columns` (array): Array of objects defining table headers and data accessors.
- `Header` (string): Column title.
- `accessor` (string): Key for accessing data from each row.
- `data` (array): Array of objects, where each object represents a row of data with keys matching the accessor fields in columns.

## Component Structure

- **Search Bar**: Filters table rows based on input.
- **Entries Selector**: Sets the number of rows per page.
- **Column Sorting**: Sorts columns in ascending or descending order.
- **Pagination Controls**: Navigate between pages with buttons to move to the first, previous, next, and last pages.
- **Responsive Design**: Simplifies columns for mobile screens.
- **User Modal**: Opens a modal with additional details about a selected user.

## Customization

- **Entries per Page**: Configure options in the selector by modifying entriesPerPage.
- **Sorting Logic**: Customize the sort function in sortedData if additional data types are required.
- **Search Functionality**: Adjust filteredData to enable search for specific fields.

## Dependencies

- **FontAwesome**: For icons, install and import FontAwesome icons as shown in the code.
- **CSS**: Customize styles in table.css.

## Example

```jsx
const columns = [
  { Header: 'First Name', accessor: 'firstName' },
  { Header: 'Last Name', accessor: 'lastName' },
  { Header: 'Age', accessor: 'age' },
]

const data = [
{ firstName: 'Alice', lastName: 'Johnson', age: 30 },
{ firstName: 'Bob', lastName: 'Lee', age: 25 },
]

<Table columns={columns} data={data} />
```

### License

This component is open-source and can be used in any project.
