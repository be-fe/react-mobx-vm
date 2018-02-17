
describe('binding', function () {
  beforeEach(function () {
    cy.visit('/binding.js')
  })

  it('should render successfully', function () {
    cy.get('#container').should('have.class', 'bar')

    cy.get('#container input')
      .should('have.value', 'name')
  })

  it('should input type receives correct feedback', function () {
    cy.get('#container input')
      .type('{selectall}{backspace}')
      .type('bibi')
      .should('have.value', 'bibi')

    cy.get('#value')
      .contains('bibi')

    cy.window().then(win => {
      expect(win.VM.name).to.eq('bibi')

      win.VM.name = 'lili'

      cy.get('#container input')
        .should('have.value', 'lili')

      cy.get('#value')
        .contains('lili')
    })
  })
})
