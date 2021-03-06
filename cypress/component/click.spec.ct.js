import React from 'react'
import { mount } from '@cypress/react'

const Button = ({ onClick, disabled }) => (
  <button disabled={disabled} onClick={onClick}>
    Click me
  </button>
)

it('renders an active base button', () => {
  mount(<Button onClick={cy.stub().as('click')}>Click me</Button>)

  cy.get('button').click()
  cy.get('@click').should('have.been.calledOnce').invoke('resetHistory')
  cy.get('button').click().click()
  cy.get('@click').should('have.been.calledTwice')
})

it('does not call the handler on the disabled button', () => {
  mount(
    <Button disabled={true} onClick={cy.stub().as('click')}>
      Click me
    </Button>,
  )

  cy.get('button').click({ force: true })
  cy.get('@click').should('not.have.been.called')
})
