Cypress.Commands.add("getByData", (seletor) => {
  return cy.get(`[data-test=${seletor}]`);
});

Cypress.Commands.add("login", (email, senha) => {
  cy.session([email, senha], () => {
    cy.visit("/");
    cy.getByData("botao-login").click();
    cy.getByData("email-input").type(email);
    cy.getByData("senha-input").type(senha);
    cy.getByData("botao-enviar").click();

    cy.url().should("contain", "/home");
  });
});

Cypress.Commands.add("cadastro", (nome, email, senha) => {
  cy.visit("/");
  cy.getByData("botao-cadastro").click();
  cy.getByData("nome-input").type(nome);
  cy.getByData("email-input").type(email);
  cy.getByData("senha-input").type(senha);
  cy.getByData("checkbox-input").check();
  cy.getByData("botao-enviar").click({ force: true });

  cy.getByData("mensagem-sucesso")
    .should("exist")
    .contains("Usuário cadastrado com sucesso!");
});
