describe('Happy paths', () => {
    it('should render the home page', function () {
      cy.visit('/')
    })
  })
  describe('Fill out all fields', () => {
    it('should complete form', function () {
      cy.server()
      cy.route('GET','**/api/forms/english').as('getQuestions')
      
      // login()
      
      // Home
      cy.get('#patient').click()
      cy.get('#form1').click()
      cy.get('.name2 > div > input').type('Test Name', {force:true})
      cy.get('#form2').click()
      cy.get('.email3 > div > input').type('steve@gmail.com', {force:true})
      cy.get('#form3').click()
      // cy.get('.phone4 > div > input').type('555-555-5555', {force:true})
      // cy.get('#form4').click()
      // cy.get('.name2 > div > input').type('Test Name', {force:true})
      // cy.get('#form5').click()
      // cy.wait('@getQuestions')
  
      // cy.contains('What service are you selling?')
      // cy.get('#title').type('Test service listing')
      // cy.get('#category').select('Keys')
  
    })
  })