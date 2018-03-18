import * as React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Chip, Avatar } from 'react-md'
import { ActionButton, ButtonGroup, MultiSelectField } from '../src'
import states from './states-of-the-us'

const Form = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field
      id="states"
      name="states"
      component={MultiSelectField}
      label="Pick some states"
      choices={states}
      renderChosen={({ chosen, onRemove }) => (
        <Chip
          removable
          key={chosen}
          onClick={onRemove}
          label={chosen}
          avatar={<Avatar random>{chosen.charAt(0)}</Avatar>}
        />
      )}
    />
    <ButtonGroup>
      <ActionButton type="submit">Save</ActionButton>
      <ActionButton primary={false}>Cancel</ActionButton>
    </ButtonGroup>
  </form>
)

export default reduxForm({
  form: "formWithMultiSelect",
  validate: values => {
    const errors = {}
    if (!values.states || values.states.length < 2) {
      errors.states = '2 or more states are required'
    }
    return errors
  },
  onSubmit: values => {
    console.log('values', values)
  }
})(Form)
