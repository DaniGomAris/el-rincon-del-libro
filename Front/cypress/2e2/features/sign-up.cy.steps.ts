import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('que el usuario visita la página de registro', () => {
  cy.visit('/sign-up');
});

When('completa el formulario con datos válidos', () => {
  cy.get('[data-testid="nombre"]').type('Juan');
  cy.get('[data-testid="apellido"]').type('Pérez');
  cy.get('[data-testid="email"]').type('juan@mail.com');
  cy.get('[data-testid="password"]').type('Pass1234');
});

When('hace clic en el botón de crear cuenta', () => {
  cy.get('[data-testid="btnRegister"]').click();
});

Then('debería redirigirse a la página de inicio de sesión', () => {
  cy.url().should('include', '/sign-in');
});

When('deja todos los campos vacíos y envía el formulario', () => {
  cy.get('[data-testid="btnRegister"]').click();
});

Then('debería ver mensajes de error en todos los campos', () => {
  cy.get('#nombre')
    .parent()
    .should('contain', 'Nombre es requerido.');

  cy.get('#apellido')
    .parent()
    .should('contain', 'Apellido es requerido.');

  cy.get('#email')
    .parent()
    .should('contain', 'Email es requerido');

  cy.get('#password')
    .parent()
    .should('contain', 'Contraseña es requerida');
});
