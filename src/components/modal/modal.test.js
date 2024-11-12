import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Modal from './Modal'

describe('Given I use the Modal component', () => {
  const mockOnClose = jest.fn()
  const mockActions = [
    { label: 'Confirm', onClick: jest.fn() },
    { label: 'Cancel', onClick: jest.fn() },
  ]

  beforeEach(() => {
    mockOnClose.mockClear()
    render(
      <Modal
        onClose={mockOnClose}
        title="Test Modal"
        message="This is a test modal message."
        actions={mockActions}
      />,
    )
  })

  /**
   * Test to check if the modal is rendered with a title and message.
   */
  test('Then the modal should render with title and message', () => {
    const title = screen.getByRole('heading', { name: /Test Modal/i })
    const message = screen.getByText(/This is a test modal message./i)
    expect(title).toBeInTheDocument()
    expect(message).toBeInTheDocument()
  })

  /**
   * Test to verify that the close button calls the onClose handler when clicked.
   */
  test('When I click the close button, Then the onClose handler is called', () => {
    const closeButton = screen.getByRole('button', { name: /close modal/i })
    fireEvent.click(closeButton)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  /**
   * Test to check that action buttons render correctly and trigger the respective handler.
   */
  test('Then the action buttons should render and trigger their onClick handlers', () => {
    const confirmButton = screen.getByText(/Confirm/i)
    const cancelButton = screen.getByText(/Cancel/i)

    expect(confirmButton).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()

    fireEvent.click(confirmButton)
    expect(mockActions[0].onClick).toHaveBeenCalledTimes(1)

    fireEvent.click(cancelButton)
    expect(mockActions[1].onClick).toHaveBeenCalledTimes(1)
  })

  /**
   * Test to verify that pressing the Escape key closes the modal.
   */
  test('When I press the Escape key, Then the onClose handler is called once', () => {
    const modal = screen.getByRole('dialog')
    fireEvent.keyDown(modal, { key: 'Escape', code: 'Escape' })
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  /**
   * Test to verify accessibility attributes are correctly set.
   */
  test('Then the modal has correct accessibility attributes', () => {
    const modal = screen.getByRole('dialog')
    expect(modal).toHaveAttribute('aria-modal', 'true')
  })
})

/**
 * Snapshot test for the Modal component.
 */
test('Modal component matches snapshot', () => {
  const { asFragment } = render(
    <Modal
      onClose={() => {}}
      title="Snapshot Test Modal"
      message="Testing snapshot for the modal."
      actions={[{ label: 'OK', onClick: () => {} }]}
    />,
  )
  expect(asFragment()).toMatchSnapshot()
})
