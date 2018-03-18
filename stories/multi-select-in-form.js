import * as React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Chip, Avatar } from 'react-md'
import { ActionButton, ButtonGroup, MultiSelectField } from '../src'
import states from './states-of-the-us'

const MyMultiSelect = props => (
  <Field
    {...props}
    component={MultiSelectField}
    choices={states}
    renderChosen={({ chosen, onRemove }) => (
      <Chip
        removable
        key={chosen}
        onClick={onRemove}
        label={chosen}
        avatar={<Avatar>{chosen.charAt(0)}</Avatar>}
      />
    )}
  />
)

const Form = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <MyMultiSelect
      id="statesWithInitialSelection"
      name="statesWithInitialSelection"
      label="Pick some states (or remove some)"
    />
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
    <Field
      id="states-list"
      name="states"
      component={({ input: { value }}) => <div>
        { value && value.length > 0 ?
          (<ul>
            { value.map(state => (
              <li key={state}>{state}</li>
            ))}
          </ul>)
          : <div>No states selected</div>
        }
      </div>}
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
  initialValues: {
    statesWithInitialSelection: [ 'Alabama', 'California' ]
  },
  onSubmit: values => {
    console.log('values', values)
  }
})(Form)
