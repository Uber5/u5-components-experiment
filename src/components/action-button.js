// @flow
import React from 'react'

import { Button, ButtonProps } from 'react-md'

export default (props: ButtonProps): React$Element<Button> => (
  <Button raised primary {...props} />
)
