import React from 'react'
import { compose, withState, withHandlers, defaultProps, setPropTypes, mapProps } from 'recompose'

import { Autocomplete, Avatar, Chip } from 'react-md'
import { PropTypes } from 'prop-types'
import Transition from 'react-transition-group/Transition';
import { append } from 'ramda'
const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};

const Fade = ({ in: inProp }) => (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        I'm A fade Transition!
      </div>
    )}
  </Transition>
);

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
    choices: PropTypes.arrayOf(PropTypes.oneOf([PropTypes.string, PropTypes.object])),
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
    {chosen.map(chosenEl => renderChosen({ chosen: chosenEl, onRemove: () => {
      unChoose(chosenEl)
    }}))}
    <Autocomplete
      data={nextChoices}
      onAutocomplete={choose}
      clearOnAutocomplete
      focusInputOnAutocomplete
      {...ownerProps}
    />
  </React.Fragment>
))

const FadeInOut = compose(
  withState('visible', 'setVisible', false),
  withHandlers({
    toggle: props => () => props.setVisible(!props.visible)
  })
)(({ visible, toggle }) => <React.Fragment>
  <button onClick={() => toggle()}>Toggle</button>
  <Fade in={visible} />
</React.Fragment>)

export default () => <React.Fragment>
  <h3>Fade in/out (testing)</h3>
  <FadeInOut />
  <h3>Actual multi select</h3>
  <p>Here the actual multi select</p>
  <MyAutocomplete
    choices={states}
    id='my-autocomplete'
    label='States of the US'
    renderChosen={({ chosen, onRemove }) => {
      return <Chip
        removable
        onClick={onRemove}
        label={chosen}
        avatar={<Avatar random>{chosen.charAt(0)}</Avatar>}
      />
    }}/>
</React.Fragment>
