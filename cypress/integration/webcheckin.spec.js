describe('Initial Web Checkin page tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it(`validation error should be shown for both flight no and last name field on submission without empty`, () => {
        cy.get('.submitBtn').click()
        cy.get('.ant-form-item-explain-error').should('have.length', 2)
    })
    it(`validation error should be shown for last name when its not inputed`, () => {
        const input = "ABC123"
        cy.get('#web_checkin_flight_no')
          .type(input)
        cy.get('.submitBtn').click()
        cy.get('.ant-form-item-explain-error').should('have.length', 1)
    })
    it(`validation error should be shown for flight no when its not inputed`, () => {
        const input = "Luke"
        cy.get('#web_checkin_last_name')
          .type(input)
        cy.get('.submitBtn').click()
        cy.get('.ant-form-item-explain-error').should('have.length', 1)
    })
})