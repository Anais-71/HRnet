import React, { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Select from './Select' // Ensure the import path is correct

const mockOptions = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
]

/**
 * Test suite for the Select component.
 */
describe('Select Component', () => {
  /**
   * Test to check if the select field is rendered.
   */
  test('Then the select field is rendered', () => {
    render(
      <Select
        options={mockOptions}
        label="Test Select"
        value=""
        onChange={() => {}}
        name="test-select-1" // Unique ID for this test
        valueField="id"
        labelField="label"
      />,
    )

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
  })

  /**
   * Test to verify that the onChange function is called when an option is selected.
   */
  test('When an option is selected, Then the onChange function is called', () => {
    const mockOnChange = jest.fn() // Mock of the onChange function
    const TestComponent = () => {
      const [selectedValue, setSelectedValue] = useState('') // State for the selected value

      const handleChange = (event) => {
        setSelectedValue(event.target.value) // Update state with the new value
        mockOnChange(event) // Call the mocked onChange function
      }

      return (
        <Select
          options={mockOptions}
          label="Test Select"
          value={selectedValue} // Pass the state value
          onChange={handleChange} // Pass the event handler
          name="test-select-2" // Unique ID for this test
          valueField="id"
          labelField="label"
        />
      )
    }

    render(<TestComponent />) // Render the test component

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: '1' } }) // Select option 1

    expect(mockOnChange).toHaveBeenCalledTimes(1) // Check that the function was called once
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Object)) // Check that the function was called with an event object
    expect(select.value).toBe('1') // Check that the selected value has been updated
  })

  /**
   * Test to verify that the select displays the correct options.
   */
  test('Then the select displays the correct options', () => {
    render(
      <Select
        options={mockOptions}
        label="Test Select"
        value=""
        onChange={() => {}}
        name="test-select-3" // Unique ID for this test
        valueField="id"
        labelField="label"
      />,
    )

    const select = screen.getByRole('combobox')
    expect(select).toHaveTextContent(' ') // Check that the default option is present
    expect(select).toHaveTextContent('Option 1') // Check that option 1 is present
    expect(select).toHaveTextContent('Option 2') // Check that option 2 is present
  })

  /**
   * Snapshot test for the Select component.
   */
  test('Select component matches snapshot', () => {
    const { asFragment } = render(
      <Select
        options={mockOptions}
        label="Test Select"
        value=""
        onChange={() => {}}
        name="test-select-snapshot" // Unique ID for this test
        valueField="id"
        labelField="label"
      />,
    )
    expect(asFragment()).toMatchSnapshot() // Check that the component matches the snapshot
  })
})
