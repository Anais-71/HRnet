# Select Component

The `Select component` is a reusable dropdown menu used to select an option from a list. It is highly customizable and supports dynamic labels and values based on the provided fields.

## Features

- **Dynamic Options**: Map options to display dynamic labels and values.
- **Customizable Label**: Set a label for the select element.
- **Controlled Component**: The selected value is managed via props, allowing for seamless integration with forms.
- **Placeholder Support**: Includes an empty option to serve as a placeholder.

## Installation

Ensure that the select.css file is imported for styling.
Import the `Select component` into your project.

## Usage

```jsx
import Select from './Select'

const options = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' },
]

const handleChange = (e) => {
  console.log(e.target.value)
}

;<Select
  options={options}
  label="Choose an option"
  value={selectedValue}
  onChange={handleChange}
  name="optionSelect"
  valueField="id"
  labelField="name"
/>
```

## Props

- `options` (array): An array of objects representing the options. Each object must contain at least two fields:
- `valueField` (string): The field in the option object that will be used as the value for each option.
- `labelField` (string): The field in the option object that will be used as the label for each option.
- `label` (string): The label to be displayed next to the dropdown.
- `value` (string): The current value of the select element.
- `onChange` (function): The function that will be called when the value of the select changes.
- `name` (string): The name attribute for the select element.
- `valueField` (string): The name of the field in the options object that represents the value of the option.
- `labelField` (string): The name of the field in the options object that represents the label of the option.

## Component Structure

- **Label**: Displays the label associated with the select dropdown.
- **Dropdown**: The <select> element that contains the options.
- **Options**: Dynamically generated <option> elements based on the provided options array.
- **Placeholder**: An empty option at the top to act as a placeholder.

## Customization

Modify the `valueField` and `labelField` props to match the structure of your options array.
Customize the className of the <select> and <option> elements via the CSS classes select and select\_\_option.

## Example

```jsx
const countries = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'GB', name: 'United Kingdom' },
]

;<Select
  options={countries}
  label="Select Country"
  value={selectedCountry}
  onChange={(e) => setSelectedCountry(e.target.value)}
  name="country"
  valueField="code"
  labelField="name"
/>
```

## License

This component is open-source and free to use in any project.
