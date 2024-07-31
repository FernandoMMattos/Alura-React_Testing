describe("Testa informações de um usuário específico", () => {
  it("Verifica informações de usuário, como transações, saldo, nome, etc", () => {
    cy.fixture("dadosUsuario").then((usuario) => {
      cy.login(usuario.email, usuario.senha);
      cy.visit("/home");
      cy.url().should("include", "/home");

      cy.contains(usuario.nome).should("be.visible");
      cy.getByData("lista-transacoes").find("li").last();
      cy.get('[data-testid="saldo"]').contains(usuario.saldo);
    });
  });
});
