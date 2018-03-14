import React from 'react'
import { reduxForm, Field } from 'redux-form'

import { ActionButton, ButtonGroup, TextField } from '../src'

const SimpleForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field id="val1" name="val1" component={TextField} type="text" label="Example text field"/>
    <ButtonGroup>
      <ActionButton type="submit">Save</ActionButton>
      <ActionButton primary={false}>Cancel</ActionButton>
    </ButtonGroup>
  </form>
)

export default reduxForm({
  form: "simpleForm",
  onSubmit: values => {
    console.log('values', values)
  }
})(SimpleForm)