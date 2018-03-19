# Multi-Select Component

... intro

## Use with `redux-form`

```javascript
import {
  MultiSelectField, ButtonGroup, ActionButton
} from '@u5/components-experiment'

const states = [ "Alabama", ... ] // TODO: all the US states

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
```