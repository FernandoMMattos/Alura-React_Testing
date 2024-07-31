describe("Pagina inicial", () => {
  describe("Deve renderizar corretamente o texto da seção ", () => {
    beforeEach(() => cy.visit("/"));
    it("principal", () => {
      cy.getByData("titulo-principal").contains(
        "Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!"
      );
    });

    it("vantagens", () => {
      cy.get("h2").contains("Vantagens do nosso banco:");
    });
  });
});
