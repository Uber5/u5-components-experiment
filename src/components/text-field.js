// @flow
import React from 'react'

import { TextField as RmdTextField, TextFieldProps } from 'react-md'

export default ({
  input, meta: { touched, error }, ...others
}: TextFieldProps): React$Element<RmdTextField> => (
  <RmdTextField {...input} {...others} error={touched && !!error} errorText={error} />
)
