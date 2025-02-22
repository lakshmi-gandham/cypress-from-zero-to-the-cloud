Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  // Fill in the form fields with explicit checks for value after typing

  // Ensure the input is focused, then type and assert
  cy.get('input[name="firstName"]')
    .focus()  // Optional: Ensure input field is focused
    .type('John Doe')  // Fill the first name
    .should('have.value', 'John Doe');  // Verify input value

  cy.get('input[name="lastName"]')
    .type('Davinia')  // Fill the last name
    .should('have.value', 'Davinia');  // Verify input value

  cy.get('input[type="email"]')
    .type('john.doe@example.com')  // Fill the email
    .should('have.value', 'john.doe@example.com');  // Verify email value

  // Type the long text into the text area
  const longText = 'wertyuiop';  // Define the text to be entered
  cy.get('#open-text-area')
    .type(longText)  // Type the text into the text area
    .should('have.value', longText);  // Verify the text was entered correctly

  // Click the submit button
  cy.get('button[type="submit"]')
    .click();  // Click the submit button

  // Validate the success message after form submission
  cy.get('.success')
    .should('be.visible');  // Ensure success message is visible
});

it('successfully submits the form using a custom command',()=>{
  const data={
  firstName:'tyu',
   lastName:'cghui',
   email:'xcghu@mail.com',
   text:'test'}
   cy.fillMandatoryFieldsAndSubmit(data)
   cy.get('.success')
       .should('be.visible');  // Ensure success message is visible
   });
it('selects a product (Mentorship) by its value.',()=>{
cy.get('#product')
.select('YouTube')
.should('have.value','youtube')
});
 it('selects a product (Mentorship) by its value',()=>{
  cy.get('#product')
  .select('mentorship')
  .should('have.value','mentorship')
   });

  it('selects a product (Blog) by its index',()=>{
  cy.get('#product')
    .select('1')
    .should('have.value','blog')
    });
    it('checks the type of service Feedback',()=>{
    cy.get('input[type="radio" ],value=["feedback"]')
    .check()
    .should('be.checked')
    });
//    it.only('checks each type of service', () => {
//    cy.get('#support-type')
//    .find('input[type="radio"]')
//    .each(typeofService => {
//    cy.wrap(typeofService)
//    .check()
//    .should('be.checked')
//    });

    it('checks both checkboxes, then unchecks the last one',()=>{
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
    });



