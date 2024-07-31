describe("Formulario de Login", () => {
  beforeEach(() => cy.visit("/"));

  it("Deve acessar a página home", () => {
    cy.fixture("usuarios").then((usuario) => {
      cy.login(usuario[0].email, usuario[0].senha);
      cy.visit("/home");
      cy.url().should("include", "/home");
      cy.getByData("titulo-boas-vindas").should(
        "contain",
        "Bem vindo de volta!"
      );
      cy.contains(usuario[0].nome).should("be.visible");
    });
  });

  it("Não deve permitir um email inválido", () => {
    cy.getByData("botao-login").click({ force: true });
    cy.getByData("email-input").type("neilton@alura");
    cy.getByData("senha-input").type("123456");
    cy.getByData("botao-enviar").click({ force: true });

    cy.getByData("mensagem-erro")
      .should("exist")
      .and("have.text", "O email digitado é inválido");
  });

  it("Não deve permitir um campo em branco", () => {
    cy.getByData("botao-login").click({ force: true });
    cy.getByData("senha-input").type("123456");
    cy.getByData("botao-enviar").click({ force: true });
    cy.getByData("mensagem-erro")
      .should("exist")
      .and("have.text", "O campo email é obrigatório");
  });
});
