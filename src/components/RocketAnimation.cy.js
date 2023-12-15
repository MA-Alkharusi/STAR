import React from 'react'
import RocketAnimation from './RocketAnimation'

describe('<RocketAnimation />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RocketAnimation />)
  })
})