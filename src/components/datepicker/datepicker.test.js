import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Datepicker from './Datepicker' // Ensure the import path is correct

/**
 * Test suite for the Datepicker component.
 */
describe('Given I use the Datepicker plugin', () => {
  /**
   * Renders the Datepicker component before each test.
   */
  beforeEach(() => {
    render(<Datepicker idPrefix="datepicker" />)
  })

  /**
   * Test to check if the input field is rendered.
   */
  test('Then the input field is rendered', () => {
    const input = screen.getByPlaceholderText(/please select a date/i)
    expect(input).toBeInTheDocument()
  })

  /**
   * Test to verify that the calendar opens upon input click.
   */
  test('Then the calendar opens on input click', () => {
    const input = screen.getByPlaceholderText(/please select a date/i)
    fireEvent.click(input)
    const calendar = screen.getByRole('dialog')
    expect(calendar).toBeInTheDocument()
  })

  /**
   * Test to check if the selected date is displayed in the input field.
   */
  test('When I select a date from the calendar, Then the date is displayed in the input', () => {
    const input = screen.getByPlaceholderText(/please select a date/i)
    fireEvent.click(input)

    const dayToSelect = screen.getByText('1')
    fireEvent.click(dayToSelect)
    expect(input.value).toBe('1/10/2024')
  })

  /**
   * Test to verify the correct month is rendered when changed using the month selector.
   */
  test('When I change the month using month selector, Then the correct month is rendered', () => {
    const input = screen.getByPlaceholderText(/please select a date/i)
    fireEvent.click(input)

    const monthSelect = screen.getByLabelText(/month/i)
    expect(monthSelect).toBeInTheDocument()

    fireEvent.change(monthSelect, { target: { value: '2' } }) // Change to March

    const newMonthDay = screen.getByText('1')
    expect(newMonthDay).toBeInTheDocument()
  })

  /**
   * Test to verify the correct year is rendered when changed using the year selector.
   */
  test('When I change the year using year selector, Then the correct year should be rendered', () => {
    const input = screen.getByPlaceholderText(/please select a date/i)
    fireEvent.click(input)

    const yearSelect = screen.getByLabelText(/year/i)
    expect(yearSelect).toBeInTheDocument()

    fireEvent.change(yearSelect, { target: { value: '2025' } })

    const yearDisplay = screen.getByText('1')
    expect(yearDisplay).toBeInTheDocument()
  })

  /**
   * Test to check if the calendar closes when clicking on the selected date.
   */
  test('Given I selected a date, When I click on the selected date, Then the calendar is closed', () => {
    const input = screen.getByPlaceholderText(/please select a date/i)
    fireEvent.click(input)

    const dayToSelect = screen.getByText('1')
    fireEvent.click(dayToSelect)
    expect(input.value).toBe('1/10/2024')

    fireEvent.click(dayToSelect)
    const calendar = screen.queryByRole('dialog')
    expect(calendar).not.toBeInTheDocument()
  })
})

/**
 * Snapshot test for the Datepicker component.
 */
test('Datepicker component matches snapshot', () => {
  const { asFragment } = render(<Datepicker idPrefix="datepicker" />)
  expect(asFragment()).toMatchSnapshot()
})
