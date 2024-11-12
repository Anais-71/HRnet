import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Datepicker from './Datepicker' // Assurez-vous que le chemin d'importation est correct

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
    const calendar = screen.getByTestId('calendar')
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
    expect(input.value).toBe('1/11/2024')
  })

  /**
   * Test to verify the correct month is rendered when changed using the month selector.
   */
  test('When I change the month using month selector, Then the correct month is rendered', async () => {
    const input = screen.getByPlaceholderText(/please select a date/i)
    fireEvent.click(input)

    const monthSelect = screen.getByTestId('month-select')
    fireEvent.change(monthSelect, { target: { value: '2' } }) // Change to March

    await waitFor(() => {
      // Vérifiez que le mois est correctement changé
      expect(monthSelect.value).toBe('2')
      // Vérifiez si un jour du mois de mars est affiché
      const newMonthDay = screen.getByText('1')
      expect(newMonthDay).toBeInTheDocument()
    })
  })

  /**
   * Test to verify the correct year is rendered when changed using the year selector.
   */
  test('When I change the year using year selector, Then the correct year should be rendered', async () => {
    const input = screen.getByPlaceholderText(/please select a date/i)
    fireEvent.click(input)

    const yearSelect = screen.getByTestId('year-select')
    fireEvent.change(yearSelect, { target: { value: '2025' } })

    await waitFor(() => {
      expect(yearSelect.value).toBe('2025')
    })
  })

  /**
   * Test to check the input field's accessibility attributes.
   */
  test('Then the input has correct accessibility attributes', () => {
    const input = screen.getByPlaceholderText(/please select a date/i)
    expect(input).toHaveAttribute('aria-expanded', 'false')
    expect(input).toHaveAttribute('aria-haspopup', 'grid')

    fireEvent.click(input)
    expect(input).toHaveAttribute('aria-expanded', 'true')
  })

  /**
   * Test to verify if the calendar closes when clicking outside the calendar.
   */
  test('When I click outside the calendar, the calendar should close', async () => {
    const input = screen.getByPlaceholderText(/please select a date/i)
    fireEvent.click(input)

    const calendar = screen.getByTestId('calendar')
    expect(calendar).toBeInTheDocument()

    // Click outside the calendar (on the input field)
    fireEvent.click(screen.getByPlaceholderText(/please select a date/i))

    await waitFor(() => {
      expect(screen.queryByTestId('calendar')).not.toBeInTheDocument()
    })
  })
})

/**
 * Snapshot test for the Datepicker component.
 */
test('Datepicker component matches snapshot', () => {
  const { asFragment } = render(<Datepicker />)
  expect(asFragment()).toMatchSnapshot()
})
