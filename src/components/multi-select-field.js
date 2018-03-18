// @flow
import * as React from 'react'

import type { FieldProps } from 'redux-form'
import { MultiSelect } from './multi-select'
import type { MultiSelectProps } from './multi-select'

export default ({
  input, meta: { touched, error }, ...others
}: MultiSelectProps & FieldProps): React.Element<*> => (
  <React.Fragment>
    <MultiSelect {...input} {...others} />
    { touched && !!error &&
      <div className="md-text-field-message-container md-full-width md-text--error">
        {error}
      </div>
    }
  </React.Fragment>
)
