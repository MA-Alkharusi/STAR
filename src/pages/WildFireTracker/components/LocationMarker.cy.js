import React from 'react'
import LocationMarker from './LocationMarker'

describe('<LocationMarker />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LocationMarker />)
  })
})