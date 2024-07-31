import { faker } from "@faker-js/faker/locale/pt_BR";

describe("Formulário Cadastro", () => {
  const usuario = {
    nome: faker.name.fullName(),
    email: faker.internet.email(),
    senha: faker.internet.password(),
  };

  it("Usuário deve conseguir se cadastrar com sucesso", () => {
    cy.cadastro(usuario.nome, usuario.email, usuario.senha);
  });

  it("Não deve permitir o cadastro de usuários com email e senha inválido", () => {
    cy.visit("/");
    cy.getByData("botao-cadastro").click();
    cy.getByData("email-input").type("moni@alura.com");
    cy.getByData("senha-input").type("987654");
    cy.getByData("botao-enviar").click({ force: true });
    cy.getByData("mensagem-erro")
      .should("exist")
      .and("have.text", "O campo de nome é obrigatório");
  });
});
