
function runTests () {
  it('global vm works', () => {
    cy.get('#gValue-input').should('have.value', 'global')
    cy.get('[name=gValue]').contains('global')

    cy.get('#gValue-input')
      .type(' append')
      .should('have.value', 'global append')
    cy.get('[name=gValue]').contains('global append')
  })

  it('pageA vm works', () => {
    cy.get('#aValue-input').should('have.value', 'pageA')
    cy.get('[name=aValue]').contains('pageA')

    cy.get('#aValue-input')
      .type(' append')
      .should('have.value', 'pageA append')
    cy.get('[name=aValue]').contains('pageA append')
  })

  it('pageA vm passed to pageB', () => {
    cy.get('#aValue-input')
      .type(' to B')
      .should('have.value', 'pageA to B')
    cy.get('[name=aValue]').contains('pageA to B')

    cy.get('#to-B').click()
    cy.get('#aValue-input').should('have.value', 'pageA to B')
    cy.get('[name=aValue]').contains('pageA to B')
  })
}

describe('ViewModel Main Spec', function () {
  context('iife environment', () => {
    beforeEach(function () {
      cy.visit('/iife.html')
    })

    it('simple test', () => {
      cy.get('#val')
        .contains('default')

      cy.get('input')
        .type('{selectall}{del}')
        .type('var')
      cy.get('#val')
        .contains('var')
    })

  })

  context('binding', function () {
    beforeEach(function () {
      cy.visit('/binding.js')
    })

    it('should render successfully', function () {
      // cy.get('#container').should('have.class', 'bar')

      cy.get('input')
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

  context('Without Code Splitting', () => {
    beforeEach(function () {
      cy.visit('/routerV3/sync.js')
    })

    runTests()
  })

  context('With Code Splitting', () => {
    beforeEach(function () {
      cy.visit('/routerV3/index.js')
    })

    runTests()
  })

  context('urlSync', () => {

    function getTests(type) {
      function eq(search) {
        switch (type) {
        case 'hash':
          cy.hash().should('eq', '#/' + search)
          break
        case 'browser':
          cy.location('search').should('eq', search)
          break
        }
      }

      it('should initialWrite works', () => {
        eq('?g=global')

        cy.get('[name=gValue]')
          .contains('global')

        cy.get('#gValue-input')
          .type('suffix')

        cy.get('[name=gValue]')
          .contains('globalsuffix')

        eq('?g=globalsuffix')
      })

      it('should urlSync in View works', () => {
        eq('?g=global')

        cy.get('#gView-input')
          .type('{selectall}{del}')
        eq('?g=global&gV=')

        cy.get('#gView-input')
          .type('hhh')
        eq('?g=global&gV=hhh')
      })

      it('should data stored after reload ', () => {
        cy.get('#gValue-input')
          .type('{selectall}{del}')
          .type('new')

        cy.get('#gView-input')
          .type('{selectall}{del}')
          .type('hhh')

        eq('?g=new&gV=hhh')

        cy.reload()
        eq('?g=new&gV=hhh')
        cy.get('#gValue-input').should('have.value', 'new')
        cy.get('#gView-input').should('have.value', 'hhh')
      })
    }

    context('hashHistory', () => {
      beforeEach(function () {
        cy.visit('/routerV3/index.js')
      })

      getTests('hash')
    })

    context('browserHistory', () => {
      beforeEach(function () {
        cy.visit('/routerV3/browserHistory.js')
      })

      getTests('browser')
    })


    context('storageSync', () => {
      beforeEach(function () {
        cy.visit('/routerV3/index.js#/b')
      })

      it('bValue-input', () => {
        cy.get('#bValue-input')
          .type('{selectall}{del}')
          .type('b-val')

        cy.wait(1000)

        cy.window()
          .then(({ localStorage }) => {
            expect(
              localStorage.getItem('--[storage-sync]--')
            ).to.eq(JSON.stringify({ bVal: 'b-val' }))
          })
      })

    })

  })

})
