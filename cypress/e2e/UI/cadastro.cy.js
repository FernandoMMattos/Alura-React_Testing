import { faker } from "@faker-js/faker/locale/pt_BR";

describe("Teste de cadastro de usuario", () => {
  const usuario = {
    nome: faker.name.fullName(),
    email: faker.internet.email(),
    senha: faker.internet.password(),
  };

  it("Deve permitir cadastrar um usuário com sucesso", () => {
    cy.visit("/");
    cy.cadastro(usuario.nome, usuario.email, usuario.senha);

    cy.request("GET", "http://localhost:8000/users").then((res) => {
      expect(res.body).to.have.lengthOf.at.least(1);
      expect(res.body[res.body.length - 1]).to.deep.include(usuario);
    });
  });
});
