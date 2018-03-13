import React from 'react'
import { reduxForm, Field } from 'redux-form'

import { ActionButton, ButtonGroup } from '../src'
const SimpleForm = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field name="val1" component="input" type="text"/>
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