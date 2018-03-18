// @flow
import * as React from 'react'
import { compose, withState, withHandlers, setPropTypes, mapProps } from 'recompose'

import { Autocomplete } from 'react-md'
import PropTypes from 'prop-types'
import { CSSTransitionGroup } from 'react-transition-group'
import { append } from 'ramda'

import type { HOC } from 'recompose'

/* eslint "flowtype/no-weak-types": "off" */
type Choice = string | any
type Choices = Array<Choice>
/* eslint "flowtype/no-weak-types": "off" */
type AnyProps = any

/* eslint "flowtype/no-weak-types": "off" */
type RenderChosenFn = ({
  chosen: Choice,
  onRemove: (choice: Choice) => void
}) => React.Element<any>

export type MultiSelectProps = {
  choices: Choices,
  renderChosen: RenderChosenFn
}

type WithChooseAndUnChoose = {
  choose: * => void,
  unChoose: * => void
}

type MultiSelectHOCProps = MultiSelectProps & WithChooseAndUnChoose & {
  nextChoices: Choices,
  chosen: Choices,
  ownerProps: AnyProps
}

/* eslint-disable */
const withChooseAndUnChoose: HOC<React.Component<any>, WithChooseAndUnChoose> = withHandlers({
  choose: props => (abbreviation, index, matches) => {
    const choice = matches[index]
    const chosen = append(choice, props.chosen)
    props.setChosen(chosen)
    props.onChange && props.onChange(chosen)
    props.setNextChoices(props.nextChoices.filter(e => e !== choice))
  },
  unChoose: ({ chosen, choices, ...props }) => (unChosen) => {
    const nextChosen = chosen.filter(e => e !== unChosen)
    props.setChosen(nextChosen)
    props.onChange && props.onChange(nextChosen)
    props.setNextChoices(
      choices.filter(e => e === unChosen || !chosen.includes(e))
    )
  }
})
/* eslint-enable */

export const MultiSelect:HOC<React.Component<MultiSelectHOCProps>, MultiSelectHOCProps> = compose(
  setPropTypes({
    choices: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.object)
    ]),
    renderChosen: PropTypes.func
  }),
  mapProps(({
    choices, renderChosen, value, onChange, ...ownerProps
  }: {
    choices: Choices,
    renderChosen: RenderChosenFn,
    value?: Choices,
    onChange: (value: Choices) => void
  }): {
    choices: Choices,
    value?: Choices,
    onChange?: (value: Choices) => void,
    renderChosen: RenderChosenFn,
    ownerProps: any
  } =>
      (
        {
          choices,
          renderChosen,
          value,
          onChange,
          ownerProps
        }
      )),
  withState(
    'chosen',
    'setChosen',
    ({ value }: { value?: Choices }): Choices => value || []
  ),
  withState(
    'nextChoices',
    'setNextChoices',
    // initially, the choices are the next state
    ({
      choices, chosen
    }: {
      choices: Choices, chosen: Choices
    }): Choices => choices.filter((choice: Choice): boolean => !chosen.includes(choice))
  ),
  withChooseAndUnChoose
)(({
  nextChoices, chosen, choose, renderChosen, unChoose, ownerProps
}: MultiSelectHOCProps): React.Element<*> => (
  <React.Fragment>
    <CSSTransitionGroup
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}
      component="div"
      transitionName="multiselect"
    >
      {
        chosen.map((chosenEl: Choice): React.Element<*> => renderChosen({
          chosen: chosenEl,
          onRemove: (): void => unChoose(chosenEl)
        }))
      }
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
export default MultiSelect
