import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import reduxDecorator from './redux-decorator'

import { ActionButton } from '../src/';
import SimpleForm from './simple-form'
import MultiSelectWithAutocompleteDemo from './multi-select'
import MultiSelectInForm from './multi-select-in-form'

// storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

import '../styles/main.css'

// console.log('styles', styles)

const reactMdDecorator = story => (
  <div>
    <link rel="stylesheet" href="https://unpkg.com/react-md@1.2.11/dist/react-md.deep_purple-pink.min.css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons|Roboto:400,500,700"/>
    {story()}
  </div>
)

storiesOf('Action Button', module)
  .addDecorator(reactMdDecorator)
  .add(
    'with text and icon',
    () => <ActionButton iconChildren="cloud_upload" onClick={action('clicked')}>Do this!</ActionButton>
  )
  .add('with some emoji (silly)', () => <ActionButton onClick={action('clicked')}>😀 😎 👍 💯</ActionButton>);

storiesOf('Multi select', module)
  .addDecorator(reactMdDecorator)
  .add(
    'simple use',
    () => <MultiSelectWithAutocompleteDemo />
  )
  .addDecorator(reduxDecorator)
  .add(
    'in form',
    () => <MultiSelectInForm />
  )

storiesOf('Sample form', module)
  .addDecorator(reactMdDecorator)
  .addDecorator(reduxDecorator)
  .add(
    'simple form',
    () => <SimpleForm />
  )