import React from 'react'
import { Avatar, Chip } from 'react-md'
import { MultiSelect } from '../src'
import states from './states-of-the-us'

export default () => <React.Fragment>
  <MultiSelect
    choices={states}
    id='my-autocomplete'
    label='States of the US'
    renderChosen={({ chosen, onRemove }) => {
      return <Chip
        key={chosen}
        removable
        onClick={onRemove}
        label={chosen}
        avatar={<Avatar random>{chosen.charAt(0)}</Avatar>}
      />
    }}/>
</React.Fragment>
