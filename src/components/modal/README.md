# Modal Component

The `Modal component` is a reusable popup dialog that can be used to display messages, titles, and action buttons. It can be customized with a title, message, and a series of actions that can trigger specific behaviors when clicked.

## Features

- **Title and Message**: Optionally display a title and a message within the modal.
- **Close Button**: The modal includes a close button to dismiss the modal.
- **Custom Actions**: Define custom action buttons with labels and handlers.
- **Flexible Design**: Simple structure that can be customized with styles.

## Installation

Ensure that the modal.css file is imported for styling.
Import the Modal component into your project.

## Usage

```jsx
import Modal from './Modal'

const handleClose = () => {
console.log('Modal closed')
}

const handleAction1 = () => {
console.log('Action 1 clicked')
}

const handleAction2 = () => {
console.log('Action 2 clicked')
}

const actions = [
{ label: 'Action 1', onClick: handleAction1 },
{ label: 'Action 2', onClick: handleAction2 }
]

<Modal
  onClose={handleClose}
  title="Modal Title"
  message="This is the modal message"
  actions={actions}
/>
```

## Props

- `onClose` (function): The function to be called when the modal is closed (typically to update state).
- `title` (string, optional): The title of the modal. If not provided, no title is displayed.
- `message` (string, optional): The message displayed in the modal. If not provided, no message is displayed.
- `actions` (array): An array of action buttons, each containing:
- `label` (string): The label displayed on the button.
- `onClick` (function): The function triggered when the button is clicked.

##Component Structure

- **Close Button**: A button that calls onClose to dismiss the modal, represented by an "X" icon.
- **Title**: An optional title displayed at the top of the modal.
- **Message**: An optional message displayed below the title (or in place of it if no title is provided).
- **Actions**: Buttons rendered for each action defined in the actions prop, each with a label and an onClick handler.

## Example

```jsx
const ModalExample = () => {
  const [isModalOpen, setModalOpen] = useState(false)

  const handleOpen = () => setModalOpen(true)
  const handleClose = () => setModalOpen(false)

  const handleConfirm = () => {
    console.log('Confirmed!')
    handleClose()
  }

  const handleCancel = () => {
    console.log('Cancelled!')
    handleClose()
  }

  return (
    <div>
      <button onClick={handleOpen}>Open Modal</button>
      {isModalOpen && (
        <Modal
          onClose={handleClose}
          title="Confirm Action"
          message="Are you sure you want to proceed?"
          actions={[
            { label: 'Cancel', onClick: handleCancel },
            { label: 'Confirm', onClick: handleConfirm },
          ]}
        />
      )}
    </div>
  )
}
```

## Customization

Modify the modal\_\_popup and button classes in modal.css to customize the look of the modal and its buttons.
Adjust the structure or add additional elements to the modal to suit your needs.

## Dependencies

- **FontAwesome**: The modal uses FontAwesome icons for the close button. Make sure @fortawesome/react-fontawesome is installed in your project.

## License

This component is open-source and can be freely used in any project.
