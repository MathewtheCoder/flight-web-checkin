describe('Checkin Success page tests', () => {
    beforeEach(() => {
        cy.visit('/checkin-success')
    })
    it('Check if h1 tag text is there', () => {
        cy.get('.checkinsuccess h1').contains(`You've been checked in!`)
    })
    it('Check if button click will take user to root url', () => {
        cy.get('.actionBtn')
            .click()
        cy.location('pathname').should('eq', '/')
    })
})