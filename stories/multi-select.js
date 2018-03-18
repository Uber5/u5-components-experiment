import React from 'react'
import { compose, withState, withHandlers, defaultProps, setPropTypes, mapProps } from 'recompose'

import { Autocomplete, Avatar, Chip } from 'react-md'
import PropTypes from 'prop-types'
import { CSSTransition, CSSTransitionGroup, Transition } from 'react-transition-group';
import { append } from 'ramda'

const states = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Federated States of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Northern Mariana Islands",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Island",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];

const MyAutocomplete = compose(
  setPropTypes({
    choices: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object)
    ]),
    renderChosen: PropTypes.func
  }),
  mapProps(
    ({ choices, renderChosen, ...ownerProps }) => ({
      choices,
      renderChosen,
      ownerProps
    }) 
  ),
  withState('chosen', 'setChosen', []),
  withState(
    'nextChoices',
    'setNextChoices',
    ({ choices }) => choices // initially, the choices are the next state
  ),
  withHandlers({
    choose: props => (abbreviation, index, matches) => {
      const choice = matches[index]
      props.setChosen(append(choice, props.chosen))
      props.setNextChoices(props.nextChoices.filter(e => e !== choice))
    },
    unChoose: ({ chosen, choices, ...props }) => (unChosen) => {
      props.setChosen(chosen.filter(e => e !== unChosen))
      props.setNextChoices(
        choices.filter(e => e === unChosen || !chosen.includes(e))
      )
    }
  })
)(({ nextChoices, chosen, choose, renderChosen, unChoose, ownerProps }) => (
  <React.Fragment>
    <CSSTransitionGroup
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
      component="div"
      transitionName="multiselect"
    >
      {chosen.map(chosenEl => renderChosen({ chosen: chosenEl, onRemove: () => {
        unChoose(chosenEl)
      }}))}
    </CSSTransitionGroup>
    <Autocomplete
      data={nextChoices}
      onAutocomplete={choose}
      clearOnAutocomplete
      focusInputOnAutocomplete
      {...ownerProps}
    />
  </React.Fragment>
))

export default () => <React.Fragment>
  <MyAutocomplete
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
