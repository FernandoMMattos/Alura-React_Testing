describe("Testando dispositivos móveis", () => {
  it("Deve existir um botão menu burguer", () => {
    cy.viewport("iphone-x")
    cy.login("neilton@alura.com", "123456");
    cy.visit("/home");

    cy.getByData("menu-burguer").click({ force: true });
    cy.getByData("menu-lateral").find("a").eq(4).click({ force: true });

    cy.location("pathname").should("eq", "/home/investimentos");
  });
});

describe("Menu de navegação burguer icon", () => {
  context("Resolução do iphone xr", () => {
    beforeEach(() => {
      cy.viewport("iphone-xr");
    });

    it("Deve existir um botão menu burguer", () => {
      cy.login("neilton@alura.com", "123456");
      cy.visit("/home");
      cy.getByData("menu-burguer").should("be.visible");
    });
  });

  context("Resolução do mackbook 13 ", () => {
    beforeEach(() => {
      cy.viewport("macbook-13");
    });

    it("Não deve existir um botão menu burguer", () => {
      cy.visit("/");
      cy.login("neilton@alura.com", "123456");
      cy.visit("/home");
      cy.getByData("menu-burguer").should("not.be.visible");
    });
  });
});
