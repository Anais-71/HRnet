import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import User from './User'

const user = {
  firstName: 'Alice',
  lastName: 'Johnson',
  dateOfBirth: '1990-05-01',
  street: '123 Main St',
  city: 'Wonderland',
  state: 'CA',
  zipCode: '90001',
  department: 'Engineering',
  startDate: '2020-01-15',
}

/**
 * Test the rendering of the User component.
 * It should display the user details correctly.
 */
test('When I render the User component, then it displays the user details correctly', () => {
  render(<User user={user} onClose={() => {}} />)

  expect(screen.getByText('First Name:')).toBeInTheDocument()
  expect(screen.getByText('Alice')).toBeInTheDocument()

  expect(screen.getByText('Last Name:')).toBeInTheDocument()
  expect(screen.getByText('Johnson')).toBeInTheDocument()

  expect(screen.getByText('Date of Birth:')).toBeInTheDocument()
  expect(screen.getByText('1990-05-01')).toBeInTheDocument()

  expect(screen.getByText('Street:')).toBeInTheDocument()
  expect(screen.getByText('123 Main St')).toBeInTheDocument()

  expect(screen.getByText('City:')).toBeInTheDocument()
  expect(screen.getByText('Wonderland')).toBeInTheDocument()

  expect(screen.getByText('State:')).toBeInTheDocument()
  expect(screen.getByText('CA')).toBeInTheDocument()

  expect(screen.getByText('Zip Code:')).toBeInTheDocument()
  expect(screen.getByText('90001')).toBeInTheDocument()

  expect(screen.getByText('Department:')).toBeInTheDocument()
  expect(screen.getByText('Engineering')).toBeInTheDocument()

  expect(screen.getByText('Start Date:')).toBeInTheDocument()
  expect(screen.getByText('2020-01-15')).toBeInTheDocument()
})

/**
 * Test the close button functionality in the User component.
 * The close button should trigger the `onClose` function when clicked.
 */
test('When I click the close button, then the onClose function is called', () => {
  const onCloseMock = jest.fn()
  render(<User user={user} onClose={onCloseMock} />)

  const closeButton = screen.getByLabelText('Close details')

  // Simulate clicking the close button
  fireEvent.click(closeButton)

  // Verify that the onClose function is called once
  expect(onCloseMock).toHaveBeenCalledTimes(1)
})

/**
 * Test that the component has the appropriate ARIA attributes for accessibility.
 * The dialog should be labeled and described correctly with ARIA attributes.
 */
test('The User component has the correct ARIA attributes', () => {
  render(<User user={user} onClose={() => {}} />)

  const dialog = screen.getByRole('dialog')
  expect(dialog).toHaveAttribute('aria-labelledby', 'userDetailsTitle')
  expect(dialog).toHaveAttribute('aria-describedby', 'userDetailsDesc')

  const closeButton = screen.getByLabelText('Close details')
  expect(closeButton).toBeInTheDocument()
})

/**
 * Snapshot test for the User component.
 * The rendered output should match the saved snapshot.
 */
test('User component matches the snapshot', () => {
  const { asFragment } = render(<User user={user} onClose={() => {}} />)

  // Compare the rendered output to the saved snapshot
  expect(asFragment()).toMatchSnapshot()
})
