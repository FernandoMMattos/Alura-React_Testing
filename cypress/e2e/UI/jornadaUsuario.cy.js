import { faker } from "@faker-js/faker/locale/pt_BR";

describe("Jornadas de usuário", () => {
  const novoUsuario = {
    nome: faker.name.fullName(),
    email: faker.internet.email(),
    senha: faker.internet.password(),
  };

  const novaTransacao = {
    tipoTransacao: "Depósito",
    valor: "100",
  };

  beforeEach(() => cy.visit("/"));

  it("Deve permitir que usuário acesse a aplicação, realize transações e faça um logout", () => {
    cy.fixture("dadosUsuario").as("usuario");
    cy.get("@usuario").then((usuario) => {
      cy.login(usuario.email, usuario.senha);
      cy.visit("/home");
      cy.url().should("include", "/home");
      cy.contains(usuario.nome).should("be.visible");
      cy.getByData("titulo-boas-vindas").should(
        "contain",
        "Bem vindo de volta!"
      );

      cy.getByData("select-opcoes").select(novaTransacao.tipoTransacao);
      cy.getByData("select-opcoes").should(
        "have.value",
        novaTransacao.tipoTransacao
      );
      cy.getByData("form-input").type(novaTransacao.valor);
      cy.getByData("form-input").should("have.value", novaTransacao.valor);
      cy.getByData("realiza-transacao").click();
      cy.getByData("lista-transacoes")
        .find("li")
        .last()
        .contains(novaTransacao.valor);

      cy.window().then((win) => {
        const userId = win.localStorage.getItem("userId");
        cy.request({
          method: "GET",
          url: `http://localhost:8000/users/${userId}/transations`,
          failOnStatusCode: false,
        }).then((resposta) => {
          expect(resposta.status).to.eq(200);
          expect(resposta.body).is.not.empty;
          expect(resposta.body).to.have.lengthOf.at.least(1);
          expect(resposta.body[resposta.body.length - 1]).to.deep.include(
            novaTransacao
          );
        });
      });

      cy.getByData("botao-sair").click();
      cy.url().should("include", "/");
      cy.getByData("titulo-principal").contains(
        "Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!"
      );
    });
  });

  it("Deve realizar um cadastro e fazer um login utilizando esse novo cadastro", () => {
    cy.cadastro(novoUsuario.nome, novoUsuario.email, novoUsuario.senha);
    cy.login(novoUsuario.email, novoUsuario.senha);
  });

  it("Deve permitir o usuario atualizar seus dados", () => {
    cy.fixture("usuarios").as("usuarios");
    cy.get("@usuarios").then((usuario) => {
      cy.login(usuario[0].email, usuario[0].senha);
      cy.visit("/home");
      cy.url().should("include", "/home");
      cy.contains(usuario[0].nome).should("be.visible");

      cy.getByData("app-home").find("a").eq(1).click();
      cy.url().should("include", "/minha-conta");
      cy.getByData("botao-salvar-alteracoes").should("be.disabled");

      cy.get("[name = 'nome']").type(novoUsuario.nome);
      cy.get("[name = 'senha']").type(novoUsuario.senha);
      cy.getByData("botao-salvar-alteracoes").should("not.be.disabled");
      cy.getByData("botao-salvar-alteracoes").click();

      cy.on("window:alert", (textAlert) => {
        expect(textAlert).to.eq("Alterações salvas com sucesso!");
      });
      cy.url().should("include", "/home");

      cy.window().then((win) => {
        expect(win.localStorage.getItem("nomeUsuario")).to.eq(novoUsuario.nome);
        const userId = win.localStorage.getItem("userId");
        cy.request("GET", `http://localhost:8000/users/${userId}`).then(
          (res) => {
            expect(res.status).to.eq(200);
            expect(res.body.nome).to.be.eq(novoUsuario.nome);
            expect(res.body.senha).to.be.eq(novoUsuario.senha);
          }
        );
      });
    });
  });
});
