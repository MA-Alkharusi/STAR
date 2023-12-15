import React from 'react'
import LocationInfoBox from './LocationInfoBox'

describe('<LocationInfoBox />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LocationInfoBox />)
  })
})