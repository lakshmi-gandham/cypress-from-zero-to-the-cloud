describe('TAT Customer Service Center', () => {

  // Using beforeEach to visit the page before each test
  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  // Test 1: Check the application title
  it('checks the application title', () => {
    cy.title().should('equal', 'TAT Customer Service Center');
  });

  // Test 2: Fill in the required fields and submit the form
  it('fills in the required fields and submits the form', () => {
    const longText = Cypress._.repeat('qwsdfghjkioiuytrdsxcvb', 10); // Repeat text to create a long string

    // Fill in the form fields
    cy.get('input[name="firstName"]')
      .type('John Doe')  // Replace with actual field name
      .should('have.value', 'John Doe');  // Optionally verify input value

    cy.get('input[name="lastName"]')
      .type('Davinia')
      .should('have.value', 'Davinia');  // Optionally verify input value

    cy.get('input[type="email"]')
      .type('john.doe@example.com')
      .should('have.value', 'john.doe@example.com');  // Optionally verify email input value

    // Type the long text into the text area
    cy.get('#open-text-area')
      .type(longText, { delay: 0 })  // Replace with actual field name
      .should('have.value', longText);  // Verify text was entered correctly

    // Click the submit button
    cy.contains('button', 'send')
      .click();  // Replace with actual button type or class

    // Validation after form submission
    cy.get('.success')
      .should('be.visible'); // Ensure the success message is visible

    cy.get('.error')
      .should('be.visible'); // Ensure the error message is visible
  });

  // Test 3: Validate that the phone input only accepts numbers
  it('validates that the phone input only accepts numbers', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', ''); // Ensure that the input is empty (i.e., non-numeric input is rejected)
  });

  // Test 4: Fills and clears the first name, last name, email, and phone fields
  it('fills and clears the first name, last name, email, and phone fields', () => {
    cy.get('input[name="firstName"]')
      .type('John Doe')
      .should('have.value', 'John Doe')
      .clear()
      .should('have.value', ''); // Verify the field is cleared

    cy.get('input[name="lastName"]')
      .type('Davinia')
      .should('have.value', 'Davinia')
      .clear()
      .should('have.value', ''); // Verify the field is cleared

    cy.get('input[type="email"]')
      .type('john.doe@example.com')
      .should('have.value', 'john.doe@example.com')
      .clear()
      .should('have.value', ''); // Verify the field is cleared

    // Type the long text into the text area
    cy.get('#open-text-area')
      .type('wertyujhbvcx')
      .should('have.value', 'wertyujhbvcx')
      .clear()
      .should('have.value', ''); // Verify the field is cleared

    // Optionally, click the submit button to check form state
    cy.get('button[type="submit"]')
      .click();

    // Assume there's a phone field and checkbox logic involved
    cy.get('#phone-checkbox')
      .click();
  });

  // Test 5: Displays an error message when submitting the form without filling the required fields
  it('displays an error message when submitting the form without filling the required fields', () => {
    cy.visit('./src/index.html'); // Visit the page
    cy.get('button[type="submit"]')
      .click(); // Click the submit button
    cy.get('.error').should('be.visible'); // Ensure error message is visible
  });

  // Test 6: Successfully submits the form using a custom command
  it('successfully submits the form using a custom command', () => {
    // Assuming you have already defined this custom command in cypress/support/commands.js
    cy.fillMandatoryFieldsAndSubmit();

    // Validate that the success message is visible after form submission
    cy.get('.success').should('be.visible');
  });

  // Test 7: Selects a file from the fixtures folder
  it('selects a file from the fixtures folder', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')  // Select the file from the fixtures folder
      .should(input => {
        // Check that the correct file has been selected
        expect(input[0].files[0].name).to.equal('example.json');
      });
  });

  // Test 8: Selects a file simulating a drag-and-drop
//  it.only('selects a file simulating a drag-and-drop', () => {
//    cy.get('input[type="file"]')
//      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
//      .should(input => {
//        expect(input[0].files[0].name).to.equal('example.json');
//      });
//  });

  // Test 9: Verifies that the privacy policy page opens in another tab without the need for a click
  it('verifies that the privacy policy page opens in another tab without the need for a click', () => {
    cy.contains('a', 'Privacy Policy') // Verify the privacy policy link exists
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  });
  it('access the privacy policy page by removing the target, then clicking on the link.',()=>{
  cy.contains('a','Privacy Policy')
  .invoke('removeAttr','target')
  .click()
  cy.contains('h1','TAT CSC - Privacy Policy')
  });

});
